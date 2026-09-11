import { NextRequest, NextResponse } from 'next/server';
import { validatePassword } from '@/lib/auth/validation';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Password reset token is missing.' },
        { status: 400 }
      );
    }

    const passCheck = validatePassword(newPassword);
    if (!passCheck.valid) {
      return NextResponse.json(
        { success: false, error: passCheck.errors.join('. ') },
        { status: 400 }
      );
    }

    const supabaseAdmin = createAdminClient();
    if (supabaseAdmin) {
      const { data: tokenData, error: tokenError } = await supabaseAdmin
        .from('password_reset_tokens')
        .select('*')
        .eq('token', token)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (tokenError || !tokenData) {
        return NextResponse.json(
          { success: false, error: 'Invalid or expired password reset token.' },
          { status: 400 }
        );
      }

      // Update token as used
      await supabaseAdmin
        .from('password_reset_tokens')
        .update({ used: true })
        .eq('id', tokenData.id);
    }

    return NextResponse.json({
      success: true,
      message: 'Password successfully updated. You can now log in with your new password.',
    });
  } catch (err) {
    console.error('Reset password API error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to reset password.' },
      { status: 500 }
    );
  }
}
