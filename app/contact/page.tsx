'use client'

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setSubmitMessage('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" dir="rtl">
      <div className="absolute inset-0 overflow-hidden">
        {[60, 80, 100, 120, 90, 70, 110, 85, 95, 75].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-300/20 to-rose-300/20"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 10) % 100}%`,
              top: `${(i * 15) % 100}%`,
              animation: `float ${10 + (i % 3) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(90deg); }
          50% { transform: translate(-15px, 15px) rotate(180deg); }
          75% { transform: translate(-20px, -10px) rotate(270deg); }
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            تماس با ما
          </h1>
          <p className="text-pink-700 text-lg">
            ما همیشه آماده پاسخگویی به سوالات شما هستیم
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
              <h2 className="text-2xl font-bold text-pink-800 mb-6">اطلاعات تماس</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-800">تلفن تماس</h3>
                    <p className="text-pink-600">021-12345678</p>
                    <p className="text-pink-600">0912-3456789</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-800">ایمیل</h3>
                    <p className="text-pink-600">info@pezeshki.com</p>
                    <p className="text-pink-600">support@pezeshki.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-800">آدرس</h3>
                    <p className="text-pink-600">تهران، خیابان ولیعصر، پلاک 123</p>
                    <p className="text-pink-600">طبقه دوم، واحد 5</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-pink-800">ساعات کاری</h3>
                    <p className="text-pink-600">شنبه تا چهارشنبه: 8:00 - 17:00</p>
                    <p className="text-pink-600">پنج‌شنبه: 8:00 - 13:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
            <h2 className="text-2xl font-bold text-pink-800 mb-6">فرم تماس</h2>
            
            {submitMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm">{submitMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/70"
                  placeholder="نام خود را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  ایمیل
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/70"
                  placeholder="ایمیل خود را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  شماره تلفن
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/70"
                  placeholder="شماره تلفن خود را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  موضوع
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/70"
                >
                  <option value="">موضوع را انتخاب کنید</option>
                  <option value="product-inquiry">استعلام محصول</option>
                  <option value="support">پشتیبانی فنی</option>
                  <option value="complaint">شکایت</option>
                  <option value="suggestion">پیشنهاد</option>
                  <option value="other">سایر</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">
                  پیام
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/70 resize-none"
                  placeholder="پیام خود را بنویسید..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    ارسال پیام
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;