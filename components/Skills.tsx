"use client";
import { Phone, Heart, Scissors, Sparkles, Star, Zap } from "lucide-react";
import { useState } from "react";
import { ServiceContent } from "@/types";
import { motion } from "framer-motion";

interface SkillItem extends ServiceContent {
  level: number;
  icon: React.ReactNode;
}

const skillsData: SkillItem[] = [
  {
    id: 1,
    title: "اپیلاسیون با موم",
    content:
      "در خدمات اپیلاسیون با موم، ابتدا ناحیه مورد نظر با محلول‌های پاک‌کننده آماده می‌شود.",
    level: 90,
    icon: <Phone className="text-pink-500" />,
  },
  {
    id: 2,
    title: "اپیلاسیون دست‌ها",
    content:
      "اپیلاسیون دست‌ها با استفاده از تکنیک‌های پیشرفته و مواد مرغوب انجام می‌شود.",
    level: 75,
    icon: <Heart className="text-pink-500" />,
  },
  {
    id: 3,
    title: "اپیلاسیون صورت",
    content: "اپیلاسیون صورت با حساسیت و دقت ویژه‌ای انجام می‌شود.",
    level: 85,
    icon: <Scissors className="text-pink-500" />,
  },
  {
    id: 4,
    title: "اپیلاسیون کامل",
    content:
      "اپیلاسیون کامل بدن شامل رسیدگی به تمام نواحی مورد نظر در یک جلسه است.",
    level: 60,
    icon: <Sparkles className="text-pink-500" />,
  },
  {
    id: 5,
    title: "کوتاهی مو",
    content:
      "کوتاهی مو با جدیدترین متدهای روز و توسط متخصصین حرفه‌ای انجام می‌شود.",
    level: 95,
    icon: <Star className="text-pink-500" />,
  },
  {
    id: 6,
    title: "رنگ مو",
    content:
      "رنگ مو با استفاده از محصولات با کیفیت و تکنیک‌های مدرن انجام می‌شود.",
    level: 80,
    icon: <Zap className="text-pink-500" />,
  },
];

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
      damping: 10,
    },
  },
};

export default function Skills() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    
    <section className="relative py-16 bg-gradient-to-b from-white to-pink-50">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 170"><path fill="pink" fillOpacity="1" d="M0,96L120,106.7C240,117,480,139,720,138.7C960,139,1200,117,1320,106.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-32 h-32 bg-pink-100 rounded-full opacity-30"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-100 rounded-full opacity-30"></div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#BC0060] mb-4 mt-4">
            تخصص های ما
          </h2>
          <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full"></div>
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          dir="rtl"
        >
          {skillsData.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(skill.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative"
            >
              <motion.div
                className="bg-white rounded-3xl shadow-md p-6 h-full border border-transparent transition-all duration-300"
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "#F8BBD0",
                  backgroundColor: hoveredId === skill.id ? "#FFF9FB" : "white",
                }}
              >
                {/* Icon with animated background */}
                <div className="relative mb-6">
                  <motion.div
                    className="absolute -top-3 -right-3 w-16 h-16 bg-pink-100 rounded-full"
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: hoveredId === skill.id ? 1.1 : 1,
                      backgroundColor:
                        hoveredId === skill.id ? "#F8BBD0" : "#FCE4EC",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  <div className="relative z-10 w-10 h-10 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: hoveredId === skill.id ? 360 : 0,
                        scale: hoveredId === skill.id ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {skill.icon}
                    </motion.div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {skill.title}
                </h3>

                {/* Content */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {skill.content}
                </p>

                {/* Progress Bar */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <motion.span
                      className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-100"
                      whileHover={{ scale: 1.05 }}
                    >
                      مهارت
                    </motion.span>
                    <span className="text-sm font-semibold text-pink-600">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-pink-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-400 to-[#BC0060] rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
