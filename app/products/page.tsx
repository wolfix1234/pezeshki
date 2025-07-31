'use client'

import { useState } from 'react';
import { Search, Filter, ShoppingCart, Star, Heart } from 'lucide-react';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'همه محصولات' },
    { id: 'medical-equipment', name: 'تجهیزات پزشکی' },
    { id: 'laboratory', name: 'لوازم آزمایشگاهی' },
    { id: 'dental', name: 'تجهیزات دندانپزشکی' },
    { id: 'consumables', name: 'لوازم مصرفی' }
  ];

  const products = [
    {
      id: 1,
      name: 'فشارسنج دیجیتال',
      category: 'medical-equipment',
      price: '2,500,000',
      originalPrice: '3,000,000',
      image: '/api/placeholder/300/200',
      rating: 4.8,
      reviews: 124,
      discount: 17,
      inStock: true,
      description: 'فشارسنج دیجیتال با دقت بالا و نمایشگر LCD'
    },
    {
      id: 2,
      name: 'گلوکومتر خانگی',
      category: 'medical-equipment',
      price: '1,200,000',
      originalPrice: '1,400,000',
      image: '/api/placeholder/300/200',
      rating: 4.6,
      reviews: 89,
      discount: 14,
      inStock: true,
      description: 'دستگاه اندازه‌گیری قند خون با نوار تست'
    },
    {
      id: 3,
      name: 'میکروسکوپ آزمایشگاهی',
      category: 'laboratory',
      price: '15,000,000',
      originalPrice: '18,000,000',
      image: '/api/placeholder/300/200',
      rating: 4.9,
      reviews: 45,
      discount: 17,
      inStock: true,
      description: 'میکروسکوپ نوری با بزرگنمایی 1000 برابر'
    },
    {
      id: 4,
      name: 'یونیت دندانپزشکی',
      category: 'dental',
      price: '85,000,000',
      originalPrice: '95,000,000',
      image: '/api/placeholder/300/200',
      rating: 4.7,
      reviews: 23,
      discount: 11,
      inStock: false,
      description: 'یونیت کامل دندانپزشکی با تمام امکانات'
    },
    {
      id: 5,
      name: 'دستکش یکبار مصرف',
      category: 'consumables',
      price: '450,000',
      originalPrice: '500,000',
      image: '/api/placeholder/300/200',
      rating: 4.5,
      reviews: 234,
      discount: 10,
      inStock: true,
      description: 'بسته 100 عددی دستکش لاتکس'
    },
    {
      id: 6,
      name: 'پالس اکسیمتر',
      category: 'medical-equipment',
      price: '800,000',
      originalPrice: '950,000',
      image: '/api/placeholder/300/200',
      rating: 4.4,
      reviews: 156,
      discount: 16,
      inStock: true,
      description: 'دستگاه اندازه‌گیری اکسیژن خون'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, ''));
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100" dir="rtl">
      <div className="absolute inset-0 overflow-hidden">
        {[60, 80, 100, 120, 90, 70, 110, 85].map((size, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-300/15 to-rose-300/15"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 12) % 100}%`,
              top: `${(i * 18) % 100}%`,
              animation: `float ${12 + (i % 4) * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(25px, -25px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(-25px, -15px) rotate(270deg); }
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
            محصولات پزشکی
          </h1>
          <p className="text-pink-700 text-lg">
            بهترین تجهیزات پزشکی با کیفیت بالا
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
              <input
                type="text"
                placeholder="جستجو در محصولات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/70"
              />
            </div>

            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/70 appearance-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/70"
            >
              <option value="name">مرتب‌سازی بر اساس نام</option>
              <option value="price-low">قیمت: کم به زیاد</option>
              <option value="price-high">قیمت: زیاد به کم</option>
              <option value="rating">بالاترین امتیاز</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map(product => (
            <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="relative">
                <div className="w-full h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                  <div className="text-pink-400 text-6xl">📦</div>
                </div>
                
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {product.discount}% تخفیف
                  </div>
                )}
                
                <button className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-pink-500" />
                </button>
                
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                      ناموجود
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-pink-800 mb-2 group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-pink-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-pink-600">
                    {product.rating} ({product.reviews} نظر)
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-pink-800">
                      {product.price} تومان
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through mr-2">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  disabled={!product.inStock}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.inStock ? 'افزودن به سبد خرید' : 'ناموجود'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-pink-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-pink-800 mb-2">
              محصولی یافت نشد
            </h3>
            <p className="text-pink-600">
              لطفاً کلمات کلیدی دیگری را امتحان کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;