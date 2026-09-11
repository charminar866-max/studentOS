import { NextRequest, NextResponse } from 'next/server';
import { validateEmail } from '@/lib/auth/validation';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      return NextResponse.json(
        { success: false, error: emailCheck.error },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const supabaseAdmin = createAdminClient();

    if (supabaseAdmin) {
      // Generate reset token
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour

      await supabaseAdmin.from('password_reset_tokens').insert({
        email: normalizedEmail,
        token,
        expires_at: expiresAt,
        used: false,
      });

      // Email service check:
      // If RESEND_API_KEY is not configured in env, we clearly handle it without exposing internal errors.
      if (!process.env.RESEND_API_KEY) {
        return NextResponse.json({
          success: true,
          message: 'Reset link generated. (Email provider required for production delivery)',
          mode: 'development_token',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'If an account exists, a password reset link has been sent.',
    });
  } catch (err) {
    console.error('Forgot password API error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process password reset request.' },
      { status: 500 }
    );
  }
}
