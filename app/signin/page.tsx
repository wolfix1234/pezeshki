'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


interface SigninFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SigninResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    username: string;
  };
  message?: string;
}

const SigninPage = () => {
  const [formData, setFormData] = useState<SigninFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError('رمزهای عبور یکسان نیستند');
      return false;
    }
    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data: SigninResponse = await response.json();


      if (!response.ok) {
        throw new Error(data.message || 'ثبت نام ناموفق بود');
      }

      if (data.success && data.token) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Notify navbar of auth change
        window.dispatchEvent(new Event('authChange'));
        
        // Redirect to dashboard or home page
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطایی در هنگام ثبت نام رخ داد');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      {/* 3D Moving Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200">
        <div className="absolute inset-0 overflow-hidden">
          {[60, 80, 100, 120, 90, 70, 110, 85, 95, 75, 105, 65, 115, 125, 55].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-pink-300/30 to-rose-300/30"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${(i * 7) % 100}%`,
                top: `${(i * 13) % 100}%`,
                animation: `float ${10 + (i % 5) * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(-30px, -10px) rotate(270deg); }
        }
      `}</style>
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-pink-100">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-pink-800">
            ایجاد حساب کاربری
          </h2>
          <p className="mt-2 text-center text-sm text-pink-600">
            یا{' '}
            <Link href="/login" className="font-medium text-pink-600 hover:text-pink-500">
              وارد حساب موجود خود شوید
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-pink-100" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-pink-700">
                نام کاربری
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-pink-300 placeholder-pink-400 text-pink-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm bg-white/70"
                placeholder="نام کاربری خود را وارد کنید"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-pink-700">
                آدرس ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-pink-300 placeholder-pink-400 text-pink-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm bg-white/70"
                placeholder="ایمیل خود را وارد کنید"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-pink-700">
                رمز عبور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-pink-300 placeholder-pink-400 text-pink-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm bg-white/70"
                placeholder="رمز عبور خود را وارد کنید"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-pink-700">
                تکرار رمز عبور
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-pink-300 placeholder-pink-400 text-pink-900 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm bg-white/70"
                placeholder="رمز عبور خود را تکرار کنید"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-pink-50 p-4 border border-pink-200">
              <div className="text-sm text-pink-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isLoading ? 'در حال ایجاد حساب...' : 'ایجاد حساب'}
            </button>
          </div>

          <div className="text-xs text-pink-500 text-center">
            با ایجاد حساب، شما با{' '}
            <a href="#" className="text-pink-600 hover:text-pink-500">شرایط خدمات</a>
            {' '}و{' '}
            <a href="#" className="text-pink-600 hover:text-pink-500">سیاست حفظ حریم خصوصی</a>
            {' '}ما موافقت می‌کنید
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninPage;