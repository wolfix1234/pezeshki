'use client'

import { Users, Award, Target, Heart, CheckCircle, Star } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '15+', label: 'سال تجربه' },
    { number: '10000+', label: 'مشتری راضی' },
    { number: '500+', label: 'محصول متنوع' },
    { number: '24/7', label: 'پشتیبانی' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'مراقبت از سلامت',
      description: 'ارائه بهترین محصولات برای حفظ و ارتقای سلامت جامعه'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'کیفیت برتر',
      description: 'تمام محصولات ما دارای استانداردهای بین‌المللی کیفیت هستند'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'نوآوری',
      description: 'همیشه در جستجوی جدیدترین و بهترین فناوری‌های پزشکی'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'خدمات مشتری',
      description: 'رضایت مشتری اولویت اول ما در ارائه خدمات است'
    }
  ];

  const team = [
    {
      name: 'دکتر احمد محمدی',
      role: 'مدیر عامل',
      experience: '20 سال تجربه در صنعت پزشکی',
      image: '👨‍⚕️'
    },
    {
      name: 'مهندس سارا احمدی',
      role: 'مدیر فنی',
      experience: '15 سال تجربه در تجهیزات پزشکی',
      image: '👩‍💼'
    },
    {
      name: 'دکتر علی رضایی',
      role: 'مشاور پزشکی',
      experience: '18 سال تجربه بالینی',
      image: '👨‍⚕️'
    }
  ];

  const achievements = [
    'دریافت گواهینامه ISO 9001',
    'عضویت در انجمن تجهیزات پزشکی ایران',
    'دریافت نشان برتری از وزارت بهداشت',
    'همکاری با بیش از 200 بیمارستان',
    'ارائه خدمات به سراسر کشور'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" dir="rtl">
      <div className="absolute inset-0 overflow-hidden">
        {[70, 90, 110, 130, 100, 80, 120, 95, 105, 85].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-300/15 to-rose-300/15"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 11) % 100}%`,
              top: `${(i * 17) % 100}%`,
              animation: `float ${14 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-25px, 25px) rotate(180deg); }
          75% { transform: translate(-30px, -20px) rotate(270deg); }
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
            درباره ما
          </h1>
          <p className="text-xl text-pink-700 max-w-3xl mx-auto leading-relaxed">
            ما با بیش از 15 سال تجربه در زمینه تجهیزات پزشکی، متعهد به ارائه بهترین محصولات و خدمات برای حفظ سلامت جامعه هستیم
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-pink-100">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-pink-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
            <h2 className="text-2xl font-bold text-pink-800 mb-4 flex items-center gap-3">
              <Target className="w-8 h-8 text-pink-600" />
              ماموریت ما
            </h2>
            <p className="text-pink-700 leading-relaxed">
              ارائه تجهیزات پزشکی با کیفیت بالا و خدمات تخصصی به مراکز درمانی، بیمارستان‌ها و پزشکان سراسر کشور. 
              ما متعهد هستیم تا با فراهم کردن بهترین ابزارها، به بهبود کیفیت مراقبت‌های بهداشتی کمک کنیم.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
            <h2 className="text-2xl font-bold text-pink-800 mb-4 flex items-center gap-3">
              <Star className="w-8 h-8 text-pink-600" />
              چشم‌انداز ما
            </h2>
            <p className="text-pink-700 leading-relaxed">
              تبدیل شدن به پیشرو در زمینه تجهیزات پزشکی در منطقه و ایجاد تحولی مثبت در صنعت سلامت کشور. 
              ما در تلاش هستیم تا با نوآوری و کیفیت، الگویی برای سایر شرکت‌ها باشیم.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-pink-800 mb-8">ارزش‌های ما</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100 text-center hover:shadow-2xl transition-all duration-300">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-pink-800 mb-3">{value.title}</h3>
                <p className="text-pink-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-pink-800 mb-8">تیم مدیریت</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-pink-800 mb-2">{member.name}</h3>
                <p className="text-pink-600 font-medium mb-2">{member.role}</p>
                <p className="text-pink-500 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100">
          <h2 className="text-3xl font-bold text-center text-pink-800 mb-8">دستاوردها و افتخارات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-pink-50 transition-colors">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="text-pink-700">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;