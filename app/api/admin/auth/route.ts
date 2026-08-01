import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, ADMIN_EMAIL } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 400 }
      );
    }

    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

    const authResult = authenticateAdmin(String(email), String(password), clientIp);

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.message },
        { status: authResult.lockoutRemainingSeconds ? 429 : 401 }
      );
    }

    // Create session token
    const tokenPayload = {
      user: ADMIN_EMAIL,
      exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60) // 8 hours
    };
    const sessionToken = Buffer.from(JSON.stringify(tokenPayload)).toString('base64');

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful.'
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: 'rizwan_admin_session',
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60,
      path: '/'
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: 'An unexpected authentication error occurred.' },
      { status: 500 }
    );
  }
}
