import { NextRequest, NextResponse } from 'next/server';
import { generateOtp } from '@/lib/adminAuth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body || {};

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();

    // Generate OTP for administrator account
    const result = generateOtp(cleanEmail);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Too many OTP requests.' },
        { status: 429 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Verification code generated for ${cleanEmail}.`,
      otpCode: result.otpCode,
      email: cleanEmail
    });
  } catch (err: any) {
    console.error('send-otp internal error:', err?.stack || err);
    return NextResponse.json(
      { success: false, error: `Error: ${err?.message || 'Failed to process request.'}` },
      { status: 500 }
    );
  }
}
