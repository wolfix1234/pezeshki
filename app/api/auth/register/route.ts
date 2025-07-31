import { NextRequest, NextResponse } from 'next/server';
import { JWTUtils } from '../../../../lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Simple validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'تمام فیلدها الزامی است' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' },
        { status: 400 }
      );
    }

    // Mock registration - replace with real database logic
    const user = {
      id: Date.now().toString(),
      email,
      username,
      role: 'user'
    };

    const token = JWTUtils.generateToken(user);

    return NextResponse.json({
      success: true,
      token,
      user: { id: user.id, email: user.email, username: user.username },
      message: 'ثبت نام موفقیت‌آمیز بود'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'خطای سرور' },
      { status: 500 }
    );
  }
}