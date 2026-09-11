import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/dashboard';

  if (code) {
    const supabase = createServerClient();
    if (supabase) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data.user) {
        // Automatically check/create profile without overwriting existing data
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single();

        if (!existingProfile) {
          const meta = data.user.user_metadata || {};
          await supabase.from('profiles').insert({
            id: data.user.id,
            full_name: meta.full_name || meta.name || data.user.email?.split('@')[0] || 'User',
            email: data.user.email,
            avatar_url: meta.avatar_url || meta.picture || null,
            role: 'student',
            country: 'India',
          });
        }
      }
    }
  }

  // Redirect to dashboard or specified next URL
  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
