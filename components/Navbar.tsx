'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  username: string;
  email: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const navItems = [
    { text: 'خانه', href: '/' },
    { text: 'محصولات', href: '/products' },
    { text: 'مجله', href: '/blog' },
    { text: 'درباره ما', href: '/about' },
    { text: 'تماس', href: '/contact' },
  ];

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
          setUser(JSON.parse(userData));
        } else {
          setUser(null);
        }
      }
    };

    checkAuth();
    
    // Listen for storage changes to update navbar when user logs in/out
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('authChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('authChange'));
    }
    setUser(null);
    router.push('/');
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-pink-100 sticky top-0 z-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              wolfix
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-6 space-x-reverse">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-pink-50"
                >
                  {item.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center gap-2 text-pink-700">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <Link
                  href="/dashboard"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 text-sm font-medium shadow-md"
                >
                  داشبورد
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-pink-600 hover:text-pink-700 px-3 py-2 rounded-lg hover:bg-pink-50 transition-all duration-200 flex items-center gap-2 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 space-x-reverse">
                <Link
                  href="/login"
                  className="text-pink-600 hover:text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-50 text-sm font-medium transition-all duration-200"
                >
                  ورود
                </Link>
                <Link
                  href="/signin"
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 text-sm font-medium shadow-md"
                >
                  عضویت
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-pink-600 hover:text-pink-700 focus:outline-none transition-colors p-2 rounded-lg hover:bg-pink-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-pink-100">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="block text-gray-700 hover:text-pink-600 py-2 px-3 rounded-lg hover:bg-pink-50 transition-all duration-200"
                onClick={handleMobileLinkClick}
              >
                {item.text}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-pink-100 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-pink-700 px-3">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <Link
                    href="/dashboard"
                    className="block bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg text-center font-medium"
                    onClick={handleMobileLinkClick}
                  >
                    داشبورد
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      handleMobileLinkClick();
                    }}
                    className="w-full text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-pink-600 py-2 px-4 rounded-lg hover:bg-pink-50 text-center"
                    onClick={handleMobileLinkClick}
                  >
                    ورود
                  </Link>
                  <Link
                    href="/signin"
                    className="block bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg text-center font-medium"
                    onClick={handleMobileLinkClick}
                  >
                    عضویت
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;