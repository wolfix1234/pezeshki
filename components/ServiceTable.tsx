"use client";

import { useState } from "react";
import { ServiceContent } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

const services: ServiceContent[] = [
  {
    id: 1,
    title: "اپیلاسیون با موم",
    content:
      "در خدمات اپیلاسیون با موم، ابتدا ناحیه مورد نظر با محلول‌های پاک‌کننده و ضدعفونی آماده می‌شود تا پوست تمیز و بدون چربی باشد. سپس با توجه به نوع پوست و ناحیه بدن، از موم سرد یا گرم استفاده می‌گردد. موم روی پوست مالیده شده و با پارچه مخصوص یا خود موم جدا می‌شود تا موها از ریشه کنده شوند. پس از اتمام کار، از ژل یا روغن ضدالتهاب برای تسکین پوست استفاده می‌شود.",
  },
  {
    id: 2,
    title: "اپیلاسیون دست‌ها",
    content:
      "اپیلاسیون دست‌ها با استفاده از تکنیک‌های پیشرفته و مواد مرغوب انجام می‌شود. این فرآیند شامل پاکسازی، اپیلاسیون و مراقبت‌های پس از آن است که پوستی صاف و لطیف را به ارمغان می‌آورد.",
  },
  {
    id: 3,
    title: "اپیلاسیون صورت",
    content:
      "اپیلاسیون صورت با حساسیت و دقت ویژه‌ای انجام می‌شود. از موم‌های مخصوص صورت استفاده می‌کنیم که برای پوست حساس صورت مناسب است و کمترین التهاب را ایجاد می‌کند.",
  },
  {
    id: 4,
    title: "اپیلاسیون کامل",
    content:
      "اپیلاسیون کامل بدن شامل رسیدگی به تمام نواحی مورد نظر در یک جلسه است. این خدمت با برنامه‌ریزی دقیق و استفاده از بهترین محصولات انجام می‌شود تا نتیجه‌ای رضایت‌بخش حاصل شود.",
  },
];

export default function ServiceTable() {
  const [selectedService, setSelectedService] = useState<ServiceContent>(
    services[0]
  );
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleServiceChange = (service: ServiceContent) => {
    if (service.id === selectedService.id) return;

    setIsContentVisible(false);
    setTimeout(() => {
      setSelectedService(service);
      setIsContentVisible(true);
    }, 300);
  };

  // Animation variants
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div
      className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md max-w-7xl mx-auto my-10 mt-20 overflow-hidden"
      dir="rtl"
    >
      <aside className="w-full md:w-1/3 p-4 border-l-2 border-gray-300 border-dashed bg-gray-50">
        <nav className="flex flex-col space-y-2">
          {services.map((service) => (
            <motion.button
              key={service.id}
              onClick={() => handleServiceChange(service)}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative text-right text-lg py-3 px-4 rounded-lg cursor-pointer overflow-hidden"
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              {/* Background animation on hover */}
              <motion.div
                className="absolute inset-0 bg-pink-100 rounded-lg z-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity:
                    hoveredId === service.id ||
                    selectedService.id === service.id
                      ? 1
                      : 0,
                  scale:
                    hoveredId === service.id ||
                    selectedService.id === service.id
                      ? 1
                      : 0.9,
                  backgroundColor:
                    selectedService.id === service.id ? "#fbcfe8" : "#fce7f3", // Darker pink for selected
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Service title with conditional styling */}
              <span
                className={`relative z-10 ${
                  selectedService.id === service.id
                    ? "font-semibold text-pink-600"
                    : "text-gray-700 hover:text-pink-500"
                }`}
              >
                {service.title}
              </span>

              {/* Pink indicator for selected service */}
              {selectedService.id === service.id && (
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-1 bg-pink-500 rounded-r"
                  layoutId="activeIndicator"
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </aside>

      <div className="w-full md:w-2/3 p-6 bg-white">
        <AnimatePresence mode="wait">
          {isContentVisible && (
            <motion.div
              key={selectedService.id}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="h-full flex flex-col"
            >
              <motion.h2
                className="text-2xl font-semibold mb-4 text-pink-600"
                variants={childVariants}
              >
                {selectedService.title} چگونه انجام میشود؟
              </motion.h2>

              <motion.p
                className="leading-relaxed text-gray-700 mb-6"
                variants={childVariants}
              >
                {selectedService.content}
              </motion.p>

              <motion.div className="mt-auto" variants={childVariants}>
                <motion.button
                  className="bg-pink-500 text-white py-2 px-6 rounded-full hover:bg-pink-600 cursor-pointer flex items-center justify-center group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 15px -3px rgba(236, 72, 153, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>رزرو نوبت</span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    whileHover={{ x: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
