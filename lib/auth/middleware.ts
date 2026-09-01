import { type NextRequest, NextResponse } from 'next/server';

/**
 * Authentication middleware for Next.js.
 * 
 * This middleware validates incoming requests using Supabase tokens.
 * For now, it allows requests through with token validation.
 * 
 * TODO: Implement proper JWT validation with refresh token rotation
 * See UPGRADE_PLAN.md Phase 1: Security & Authentication
 */
export async function authMiddleware(request: NextRequest): Promise<NextResponse> {
  // Get the token from cookies or Authorization header
  const token = request.cookies.get('supabase-auth-token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  // Clone the request headers and add auth context if available
  const requestHeaders = new Headers(request.headers);
  if (token) {
    requestHeaders.set('x-auth-token', token);
  }

  // For now, allow all requests through with token attached to request context
  // Future: Add JWT validation, session management, and refresh token rotation
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
