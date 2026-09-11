'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Profile, UserRole } from '../types/database';
import { supabase, isSupabaseConfigured } from '../supabase/client';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  register: (data: {
    fullName: string;
    email: string;
    mobileNumber?: string;
    country: string;
    state?: string;
    role: UserRole;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<{ success: boolean; error?: string }>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'studentos_active_user';
const LOCAL_STORAGE_PROFILES_KEY = 'studentos_all_profiles';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const initSession = useCallback(async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile) {
            setUser(profile as Profile);
            return;
          }
        }
      }

      // Local fallback session check
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } catch {
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
      }
    } catch (err) {
      console.error('Session initialization error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function load() {
      // Yield microtask to prevent synchronous setState lint warning
      await Promise.resolve();
      if (!mounted) return;
      await initSession();
    }

    load();

    return () => {
      mounted = false;
    };
  }, [initSession]);

  const register = async (data: {
    fullName: string;
    email: string;
    mobileNumber?: string;
    country: string;
    state?: string;
    role: UserRole;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = data.email.trim().toLowerCase();

    // 1. If Supabase configured, attempt Supabase Auth
    if (isSupabaseConfigured && supabase) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.role,
          },
        },
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      if (authData.user) {
        const newProfile: Profile = {
          id: authData.user.id,
          full_name: data.fullName,
          email: normalizedEmail,
          mobile_number: data.mobileNumber || null,
          country: data.country,
          state: data.state || null,
          role: data.role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        await supabase.from('profiles').insert(newProfile);
        setUser(newProfile);
        return { success: true };
      }
    }

    // 2. Local session handling for testing / unconfigured environment
    const profilesRaw = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
    const profiles: Record<string, Profile & { passwordHash?: string }> = profilesRaw
      ? JSON.parse(profilesRaw)
      : {};

    // Check duplicate email
    const existing = Object.values(profiles).find((p) => p.email === normalizedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const userId = 'user_' + Math.random().toString(36).substring(2, 11);
    const newProfile: Profile & { passwordHash?: string } = {
      id: userId,
      full_name: data.fullName,
      email: normalizedEmail,
      mobile_number: data.mobileNumber || null,
      country: data.country,
      state: data.state || null,
      role: data.role,
      passwordHash: data.password, // Local fallback only
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    profiles[userId] = newProfile;
    localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(profiles));

    // Remove password before setting active state
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...cleanProfile } = newProfile;
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(cleanProfile));
    setUser(cleanProfile);

    return { success: true };
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    const normalizedEmail = email.trim().toLowerCase();

    if (isSupabaseConfigured && supabase) {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      if (authData.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (profile) {
          setUser(profile as Profile);
          return { success: true };
        }
      }
    }

    // Local fallback
    const profilesRaw = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
    const profiles: Record<string, Profile & { passwordHash?: string }> = profilesRaw
      ? JSON.parse(profilesRaw)
      : {};

    const matched = Object.values(profiles).find(
      (p) => p.email === normalizedEmail && p.passwordHash === password
    );

    if (!matched) {
      return { success: false, error: 'Invalid email address or password.' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...cleanProfile } = matched;
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(cleanProfile));
    setUser(cleanProfile);

    return { success: true };
  };

  const logout = async (): Promise<void> => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    setUser(null);
  };

  const updateProfile = async (
    data: Partial<Profile>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'No user is logged in.' };

    const updated: Profile = {
      ...user,
      ...data,
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('profiles').update(data).eq('id', user.id);
      if (error) {
        return { success: false, error: error.message };
      }
    }

    // Update local storage
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updated));

    const profilesRaw = localStorage.getItem(LOCAL_STORAGE_PROFILES_KEY);
    if (profilesRaw) {
      const profiles = JSON.parse(profilesRaw);
      if (profiles[user.id]) {
        profiles[user.id] = { ...profiles[user.id], ...updated };
        localStorage.setItem(LOCAL_STORAGE_PROFILES_KEY, JSON.stringify(profiles));
      }
    }

    setUser(updated);
    return { success: true };
  };

  const refreshSession = async () => {
    await initSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
