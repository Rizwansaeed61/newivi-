import { NextRequest, NextResponse } from 'next/server';
import { verifyOtpAndResetPassword } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, otp, newPassword } = body || {};

    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { success: false, error: 'Email, OTP verification code, and new password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanOtp = String(otp).trim();
    const cleanPass = String(newPassword).trim();

    // Password strength check: Min 8 chars
    if (cleanPass.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    const result = verifyOtpAndResetPassword(cleanEmail, cleanOtp, cleanPass);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message
    });
  } catch (err: any) {
    console.error('reset-password error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to reset password.' },
      { status: 500 }
    );
  }
}
