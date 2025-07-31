'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new signin page
    router.replace('/signin');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">در حال هدایت به صفحه ثبت نام...</p>
      </div>
    </div>
  );
};

export default SignupPage;