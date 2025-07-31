import Gallery from "@/components/Gallery"
import Link from "next/link"

export default function Page() {
  // Sidebar data
  const sidebarCategories = [
    {
      title: "دسته‌بندی مقالات",
      links: [
        { text: "سلامت و زیبایی", href: "/blog" },
        { text: "تغذیه", href: "/blog" },
        { text: "مراقبت پوست", href: "/blog" },
        { text: "مراقبت مو", href: "/blog" },
        { text: "آرایش", href: "/blog" }
      ]
    },
    {
      title: "مقالات پربازدید",
      links: [
        { text: "راهنمای انتخاب محصولات مراقبت پوست", href: "/blog" },
        { text: "بهترین روش‌های آرایش صورت", href: "/blog" },
        { text: "تغذیه مناسب برای پوست سالم", href: "/blog" },
        { text: "روش‌های طبیعی تقویت مو", href: "/blog" },
        { text: "اصول پایه آرایش چشم", href: "/blog" }
      ]
    },
    {
      title: "آخرین مطالب",
      links: [
        { text: "ترندهای آرایشی سال ۱۴۰۲", href: "/blog" },
        { text: "محصولات جدید مراقبت پوست", href: "/blog" },
        { text: "راهنمای خرید لوازم آرایش", href: "/blog" },
        { text: "روش‌های درمان خانگی مشکلات پوستی", href: "/blog" },
        { text: "مراقبت از پوست در فصل تابستان", href: "/blog/" }
      ]
    }
  ];

  return(
    <>
      {/* parent container */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1 md:-mt-8">
            <Gallery />
          </div>
          
          {/* Sidebar - using map function */}
          <div className="w-full lg:w-1/4 order-1 lg:order-2">
            <div className="flex flex-col gap-6 sticky top-4">
              {sidebarCategories.map((category, index) => (
                <div key={index} className="flex flex-col gap-5 p-5 border-2 border-pink-200 rounded-lg shadow-md bg-white">
                  <div className="py-3 px-8 bg-pink-200 rounded-full shadow-md">
                    <h3 className="text-pink-500 text-center font-bold">{category.title}</h3>
                  </div>
                  <div className="flex flex-col gap-3" dir="rtl">
                    {category.links.map((link, linkIndex) => (
                      <Link 
                        key={linkIndex} 
                        href={link.href}
                        className="hover:text-pink-500 transition-colors py-1 border-b border-gray-100 last:border-0"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Newsletter subscription box */}
              <div className="flex flex-col gap-5 p-5 border-2 border-pink-200 rounded-lg shadow-md bg-white">
                <div className="py-3 px-8 bg-pink-200 rounded-full shadow-md">
                  <h3 className="text-pink-500 text-center font-bold">عضویت در خبرنامه</h3>
                </div>
                <p className="text-gray-600 text-sm text-center">
                  برای دریافت آخرین مقالات و اخبار، در خبرنامه ما عضو شوید
                </p>
                <form className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder="ایمیل خود را وارد کنید" 
                    className="border border-gray-300 rounded-md p-2 text-right"
                    dir="rtl"
                  />
                  <button 
                    type="submit" 
                    className="bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
                  >
                    عضویت
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
