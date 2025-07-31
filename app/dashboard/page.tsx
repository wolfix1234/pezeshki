'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  isActive: boolean;
  role: string;
  emailVerified: boolean;
}

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" dir="rtl">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-100">
          <div className="text-pink-600 text-xl mb-4 font-bold">خطا: {error}</div>
          <Link href="/login" className="text-pink-600 hover:text-pink-500 font-medium">
            رفتن به صفحه ورود
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" dir="rtl">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-pink-100">
          <div className="text-pink-600 text-xl mb-4 font-bold">اطلاعات کاربر یافت نشد</div>
          <Link href="/login" className="text-pink-600 hover:text-pink-500 font-medium">
            رفتن به صفحه ورود
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" dir="rtl">
      <nav className="bg-white/80 backdrop-blur-md border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">داشبورد</h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-pink-700 font-medium">خوش آمدید، {user.username}!</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Profile Card */}
            <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-pink-100">
              <div className="px-6 py-6">
                <h3 className="text-lg leading-6 font-bold text-pink-800 mb-4">
                  اطلاعات پروفایل
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-pink-600">نام کاربری</dt>
                    <dd className="text-sm text-pink-900 font-medium">{user.username}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-pink-600">ایمیل</dt>
                    <dd className="text-sm text-pink-900 font-medium">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-pink-600">نقش</dt>
                    <dd className="text-sm text-pink-900 font-medium">{user.role === 'user' ? 'کاربر' : user.role}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-pink-600">وضعیت</dt>
                    <dd className="text-sm">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        user.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'فعال' : 'غیرفعال'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-pink-600">تایید ایمیل</dt>
                    <dd className="text-sm">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        user.emailVerified 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.emailVerified ? 'تایید شده' : 'در انتظار'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-pink-600">عضو از</dt>
                    <dd className="text-sm text-pink-900 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-pink-100">
              <div className="px-6 py-6">
                <h3 className="text-lg leading-6 font-bold text-pink-800 mb-4">
                  عملیات سریع
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200">
                    ویرایش پروفایل
                  </button>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200">
                    تغییر رمز عبور
                  </button>
                  <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all duration-200">
                    تنظیمات
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Card */}
            <div className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-pink-100">
              <div className="px-6 py-6">
                <h3 className="text-lg leading-6 font-bold text-pink-800 mb-4">
                  آمار حساب کاربری
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-pink-600 font-medium">شناسه حساب</span>
                    <span className="text-sm text-pink-900 font-mono bg-pink-50 px-2 py-1 rounded">
                      {user.id.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-pink-600 font-medium">جلسات ورود</span>
                    <span className="text-sm text-pink-900 font-bold">۱</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-pink-600 font-medium">آخرین ورود</span>
                    <span className="text-sm text-pink-900 font-bold">امروز</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-pink-100">
            <div className="px-6 py-6">
              <h3 className="text-lg leading-6 font-bold text-pink-800 mb-3">
                به داشبورد خود خوش آمدید!
              </h3>
              <p className="text-sm text-pink-700 leading-relaxed">
                شما با موفقیت وارد حساب کاربری خود شده‌اید. این صفحه محافظت شده و نیاز به احراز هویت دارد.
                اکنون می‌توانید به تمام امکانات موجود در حساب خود دسترسی داشته باشید.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;