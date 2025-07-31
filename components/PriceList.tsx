"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PriceList() {
  const categories = [
    {
      id: 1,
      title: "کراتین",
      skill: "دارای مدرک تخصصی آرایشگری از کانادا",
      price: 1500000,
    },
    {
      id: 2,
      title: "کوتاهی مو",
      skill: "دارای مدرک تخصصی آرایشگری از کانادا",
      price: 800000,
    },
    {
      id: 3,
      title: "میکاپ",
      skill: "دارای مدرک تخصصی آرایشگری از کانادا",
      price: 2000000,
    },
    {
      id: 4,
      title: "شنیون",
      skill: "دارای مدرک تخصصی آرایشگری از کانادا",
      price: 1200000,
    },
    {
      id: 5,
      title: "پاکسازی صورت",
      skill: "دارای مدرک تخصصی آرایشگری از کانادا",
      price: 900000,
    },
    {
      id: 6,
      title: "اپیلاسیون",
      skill: "دارای مدرک تخصصی آرایشگری از کانادا",
      price: 700000,
    },
    {
      id: 7,
      title: "مانیکور",
      skill: "دارای مدرک تخصصی آرایشگری از کانادا",
      price: 500000,
    },
    {
      id: 8,
      title: "پدیکور",
      skill: "دارای مدرک تخصصی آرایشگری از کانادا",
      price: 600000,
    },
  ];

  // Format price to Persian currency format
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-pink-600 mb-2">
          لیست قیمت خدمات
        </h2>
        <p className="text-gray-600">قیمت‌های به‌روز شده برای تمامی خدمات ما</p>
      </div>

      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="bg-pink-600 text-white py-4 px-6 grid grid-cols-4 items-center">
          <div className="text-center">
            <h3 className="font-bold text-lg">رزرو</h3>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">قیمت</h3>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">توضیحات</h3>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">خدمات</h3>
          </div>
        </div>

        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="grid grid-cols-4 items-center py-4 px-6 border-b border-gray-200 hover:bg-pink-50 transition-colors duration-150"
            variants={itemVariants}
          >
            <div className="text-center font-bold text-gray-800">
              {category.title}
            </div>
            <div className="text-center text-gray-600">{category.skill}</div>
            <div className="text-center text-pink-600 font-bold">
              {formatPrice(category.price)}
            </div>
            <div className="text-center">
              <button className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-full text-sm transition-colors duration-150">
                رزرو نوبت
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
