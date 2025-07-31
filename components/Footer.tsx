'use client'

import Image from "next/image";
import { Phone, Mail, Instagram, Twitter } from 'lucide-react';
import Link from "next/link";
import {motion} from "framer-motion";

export default function Footer() {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto" dir="rtl">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">
          {/* First column - About */}
          <div className="flex flex-col max-w-full md:max-w-md">
            <div className="flex flex-row items-center mb-3 sm:mb-4">
              <Image
                src="/image1.jpg"
                width={500}
                height={500}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-700 rounded-full"
                alt="Logo"
              />
              <h3 className="mr-3 sm:mr-4 text-lg sm:text-xl font-bold text-gray-800">ممد سایت</h3>
            </div>
            <p className="text-right text-gray-500 text-sm sm:text-base">
              مجیک سالن با بهره‌گیری از جدیدترین تکنیک‌های زیبایی و آرایشی، بهترین
              خدمات آرایشی، مراقبتی و پوست را در فضایی حرفه‌ای، دل‌نشین و مدرن
              ارائه می‌دهد. ما با تمرکز بر کیفیت بالا، رضایت مشتری و به‌کارگیری
              محصولات اصل و معتبر، تلاش می‌کنیم تجربه‌ای متفاوت، خاص و
              به‌یادماندنی برای شما رقم بزنیم.
            </p>
          </div>

          {/* Second column - Gallery and Social */}
          <div className="flex flex-col gap-4 sm:gap-6 mt-6 md:mt-0">
            {/* Gallery */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <Image
                src="/namad-1.png"
                width={200}
                height={200}
                className="rounded-lg overflow-hidden object-cover w-full h-auto"
                alt="Gallery image 1"
              />
              <Image
                src="/namad-2.png"
                width={200}
                height={200}
                className="rounded-lg overflow-hidden object-cover w-full h-auto"
                alt="Gallery image 2"
              />
              <Image
                src="/namad-3.png"
                width={200}
                height={200}
                className="rounded-lg overflow-hidden object-cover w-full h-auto"
                alt="Gallery image 3"
              />
            </div>
            
            <div className="flex flex-row items-end justify-end gap-3 sm:gap-4 md:gap-6">
              <div className="p-1.5 sm:p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Link href="#" className="text-pink-500">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </div>
              <div className="p-1.5 sm:p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Link href="#" className="text-pink-500">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </div>
              <div className="p-1.5 sm:p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Link href="#" className="text-pink-500">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </div>
              <div className="p-1.5 sm:p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
                <Link href="#" className="text-pink-500">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pink block with scroll-to-top circle */}
      <div className="relative mt-8 sm:mt-10">
        {/* Circle button */}
        <motion.button
          onClick={scrollToTop}
          className="absolute top-[-20px] sm:top-[-25px] md:top-[-30px] left-1/2 transform -translate-x-1/2 w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-pink-700 rounded-full shadow-lg flex items-center justify-center z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-pink-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>

        {/* Pink footer content */}
        <div className="relative bg-gradient-to-r from-pink-600 to-pink-700 p-6 sm:p-8 md:p-10 rounded-t-lg sm:rounded-t-xl shadow-lg z-0 overflow-hidden" dir="rtl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-center md:text-right">
              <motion.p 
                className="text-white text-sm sm:text-base md:text-lg font-medium mb-1 sm:mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                تمام حقوق برای شرکت مجیک بیوتی محفوظ است
              </motion.p>
              <motion.p 
                className="text-pink-100 text-xs sm:text-sm md:text-base"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                طراح گرافیک متیس دیزاین
              </motion.p>
            </div>
            
            <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
              <motion.p 
                className="text-white text-sm sm:text-base md:text-lg font-medium mb-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                © 2022 | Designed by
              </motion.p>
              <motion.a
                href="https://metisdesign.ir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-200 text-xs sm:text-sm md:text-base font-bold hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                METISDESIGN.IR
              </motion.a>
            </div>
          </div>
          
          {/* Decorative elements - contained within parent boundaries */}
          <div className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white opacity-5 rounded-full transform translate-x-0 -translate-y-1/3"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white opacity-5 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>
    </footer>
  );
}
