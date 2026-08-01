import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_EMAIL } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('rizwan_admin_session');
  if (!cookie || !cookie.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const payloadJson = Buffer.from(cookie.value, 'base64').toString('utf-8');
    const payload = JSON.parse(payloadJson);

    if (payload.user === ADMIN_EMAIL && payload.exp > Math.floor(Date.now() / 1000)) {
      return NextResponse.json({ authenticated: true, user: ADMIN_EMAIL });
    }
  } catch (e) {
    // Invalid session
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });
  response.cookies.delete('rizwan_admin_session');
  return response;
}
