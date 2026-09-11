import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rating, category, message, pageUrl, email, userId } = body;

    // Server-side validation
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be a number between 1 and 5.' },
        { status: 400 }
      );
    }

    if (!category || typeof category !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Feedback category is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Feedback message cannot be empty.' },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Feedback message exceeds maximum limit of 2000 characters.' },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const supabaseAdmin = createAdminClient();

    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.from('feedback').insert({
        user_id: userId || null,
        email: email ? email.trim() : null,
        rating,
        category: category.trim(),
        message: message.trim(),
        page_url: pageUrl || '/',
        user_agent: userAgent,
        status: 'new',
      });

      if (error) {
        console.error('Supabase feedback insert error:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to record feedback in database.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback!',
    });
  } catch (err) {
    console.error('Feedback API error:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing feedback.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabaseAdmin = createAdminClient();
    if (!supabaseAdmin) {
      return NextResponse.json({ success: true, feedback: [] });
    }

    const { data, error } = await supabaseAdmin
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, feedback: data || [] });
  } catch (err) {
    console.error('Fetch feedback API error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve feedback.' },
      { status: 500 }
    );
  }
}
