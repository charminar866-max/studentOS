'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { AdSlot } from '@/components/ads/AdSlot';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
          <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          Loading your StudentOS workspace...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-400/30 mb-2">
            Role: <span className="capitalize">{user.role}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user.full_name}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Logged in as <span className="text-indigo-200 font-medium">{user.email}</span> ({user.country}
            {user.state ? `, ${user.state}` : ''})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/resume"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            + Create Resume
          </Link>
          <Link
            href="/profile"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors border border-white/20"
          >
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Resumes Created
          </span>
          <div className="text-2xl font-black text-slate-900">1</div>
          <p className="text-[11px] text-emerald-600 font-medium">ATS Score Ready</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Jobs Saved
          </span>
          <div className="text-2xl font-black text-slate-900">3</div>
          <p className="text-[11px] text-indigo-600 font-medium">Active Bookmarks</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Applications
          </span>
          <div className="text-2xl font-black text-slate-900">0</div>
          <p className="text-[11px] text-slate-400 font-medium">Ready to apply</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Profile Strength
          </span>
          <div className="text-2xl font-black text-emerald-600">100%</div>
          <p className="text-[11px] text-emerald-600 font-medium">Verified Profile</p>
        </div>
      </div>

      {/* Main Grid: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center justify-between">
              <span>Quick Actions</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <Link
                href="/resume"
                className="p-4 bg-slate-50 hover:bg-indigo-50/60 rounded-xl border border-slate-200 transition-colors flex items-start gap-3"
              >
                <span className="text-xl">📄</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Resume Builder</h3>
                  <p className="text-slate-500 mt-0.5">Edit and export your ATS resume</p>
                </div>
              </Link>

              <Link
                href="/jobs"
                className="p-4 bg-slate-50 hover:bg-indigo-50/60 rounded-xl border border-slate-200 transition-colors flex items-start gap-3"
              >
                <span className="text-xl">💼</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Explore Opportunities</h3>
                  <p className="text-slate-500 mt-0.5">Search full-time and internships</p>
                </div>
              </Link>

              <Link
                href="/profile"
                className="p-4 bg-slate-50 hover:bg-indigo-50/60 rounded-xl border border-slate-200 transition-colors flex items-start gap-3"
              >
                <span className="text-xl">👤</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Account Settings</h3>
                  <p className="text-slate-500 mt-0.5">Manage personal info and preferences</p>
                </div>
              </Link>

              <Link
                href="/settings"
                className="p-4 bg-slate-50 hover:bg-indigo-50/60 rounded-xl border border-slate-200 transition-colors flex items-start gap-3"
              >
                <span className="text-xl">🔒</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Security & Privacy</h3>
                  <p className="text-slate-500 mt-0.5">Change password and auth preferences</p>
                </div>
              </Link>
            </div>
          </div>

          <AdSlot placement="in-content" />
        </div>

        {/* Right 1 Col: User Details & Privacy */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Your Account Details</h2>
            <div className="space-y-2 text-xs divide-y divide-slate-100">
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Full Name</span>
                <span className="font-semibold text-slate-900">{user.full_name}</span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="font-semibold text-slate-900 truncate max-w-[160px]">
                  {user.email}
                </span>
              </div>
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Country</span>
                <span className="font-semibold text-slate-900">{user.country}</span>
              </div>
              {user.state && (
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">State</span>
                  <span className="font-semibold text-slate-900">{user.state}</span>
                </div>
              )}
              {user.mobile_number && (
                <div className="pt-2 flex justify-between">
                  <span className="text-slate-500">Mobile</span>
                  <span className="font-semibold text-slate-900">{user.mobile_number}</span>
                </div>
              )}
              <div className="pt-2 flex justify-between">
                <span className="text-slate-500">Account ID</span>
                <span className="font-mono text-[10px] text-slate-600 truncate max-w-[140px]">
                  {user.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
