import { NextRequest, NextResponse } from 'next/server';
import { JWTUtils } from '../../../../lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Simple validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'ایمیل و رمز عبور الزامی است' },
        { status: 400 }
      );
    }

    // Mock authentication - replace with real database logic
    if (email === 'test@example.com' && password === '123456') {
      const user = {
        id: '1',
        email: 'test@example.com',
        username: 'کاربر تست',
        role: 'user' as const,
        createdAt: new Date(),
        isActive: true,
        emailVerified: true
      };

      const token = JWTUtils.generateToken(user);

      return NextResponse.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, username: user.username },
        message: 'ورود موفقیت‌آمیز بود'
      });
    }

    return NextResponse.json(
      { success: false, message: 'ایمیل یا رمز عبور اشتباه است' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}