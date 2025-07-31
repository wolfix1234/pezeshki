"use client";

import Image from 'next/image'
import React, { useEffect, useState, useRef } from "react";
import { motion, PanInfo, useMotionValue } from "framer-motion";

type Comment = {
  id: number;
  text: string;
  author?: string;
  role?: string;
  avatar?: string;
};

const comments: Comment[] = [
  {
    id: 1,
    text: "سلام خیلی ممنونیم که زوتر روشو به ما یاد دادین. من با کمک شما تونستم یه روزه مساله ام رو حل کنم و به نتیجه برسم.",
    author: "سارا محمدی",
    role: "مشتری دائمی",
    avatar: "/image3.jpg",
  },
  {
    id: 2,
    text: "بسیار عالی بود، پشتیبانی فوق العاده ای دارید. من واقعا راضی ام و حتما باز هم از خدمات شما استفاده می کنم.",
    author: "علی رضایی",
    role: "مشتری جدید",
    avatar: "/image1.jpg",
  },
  {
    id: 3,
    text: "کیفیت کارتون بی نظیره، خیلی سریع و حرفه ای عمل کردید. ممنون از تیم خوبتون.",
    author: "مریم احمدی",
    role: "مشتری وفادار",
    avatar: "/image2.jpg",
  },
  {
    id: 4,
    text: "من از نتیجه کار بسیار راضی هستم. همه چیز دقیقا همانطور که می‌خواستم انجام شد.",
    author: "رضا کریمی",
    role: "مشتری جدید",
    avatar: "/image1.jpg",
  },
  {
    id: 5,
    text: "خدمات شما فراتر از انتظارات من بود. قطعا شما را به دوستانم معرفی خواهم کرد.",
    author: "زهرا حسینی",
    role: "مشتری دائمی",
    avatar: "/image3.jpg",
  },
  {
    id: 6,
    text: "سرعت عمل و دقت شما در انجام کار بسیار عالی بود. از همکاری با شما خوشحالم.",
    author: "امیر محمدی",
    role: "مشتری جدید",
    avatar: "/image1.jpg",
  },
  {
    id: 7,
    text: "من تجربه بسیار خوبی با خدمات شما داشتم و قطعا در آینده هم از شما خدمات خواهم گرفت.",
    author: "نیلوفر صادقی",
    role: "مشتری وفادار",
    avatar: "/image2.jpg",
  },
];

const CommentSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [isDragging ,setIsDragging] = useState(false);
  console.log(isDragging);

  const [isHovering, setIsHovering] = useState(false);
  const [direction , setDirection] = useState(0); // -1 for up, 1 for down
  console.log(direction)

  // Motion values
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the maximum index
  const maxIndex = comments.length - 1;

  // Get previous and next indices with wrapping
  const getPrevIndex = () => (currentIndex > 0 ? currentIndex - 1 : maxIndex);
  const getNextIndex = () => (currentIndex < maxIndex ? currentIndex + 1 : 0);

  // Handle navigation
  const handlePrev = () => {
    setDirection(-1); // Going up
    setCurrentIndex(getPrevIndex());
    setAutoSlide(false);
  };

  const handleNext = () => {
    setDirection(1); // Going down
    setCurrentIndex(getNextIndex());
    setAutoSlide(false);
  };

  // Handle drag start
  const handleDragStart = () => {
    setIsDragging(true);
    setAutoSlide(false);
  };
  // Handle drag end
  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    // Determine if we should change slides based on drag velocity and distance
    if (info.velocity.y < -500 || info.offset.y < -50) {
      // Fast swipe up or dragged up - go to next slide
      setDirection(1);
      handleNext();
    } else if (info.velocity.y > 500 || info.offset.y > 50) {
      // Fast swipe down or dragged down - go to previous slide
      setDirection(-1);
      handlePrev();
    }

    // Re-enable autoplay after 5 seconds
    const timer = setTimeout(() => setAutoSlide(true), 5000);
    return () => clearTimeout(timer);
  };

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoSlide && !isHovering) {
      interval = setInterval(() => {
        setDirection(1);
        handleNext();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoSlide, currentIndex, isHovering]);

  // Render a comment card
  const renderCommentCard = (
    index: number,
    zIndex: number,
    scale: number,
    yOffset: number,
    opacity: number,
    isActive: boolean = false
  ) => {
    const comment = comments[index];
    return (
      <motion.div
        key={`card-${index}`}
        className="absolute inset-0"
        initial={false}
        animate={{
          scale,
          y: yOffset,
          zIndex,
          opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className={`bg-white rounded-2xl shadow-xl p-8 text-right mx-auto h-full flex flex-col ${
            !isActive ? "filter blur-[1px]" : ""
          }`}
        >
          {/* Quote icon */}
          <svg
            className="w-10 h-10 text-pink-100 mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <p className="text-lg text-gray-700 mb-6 flex-grow">{comment.text}</p>

          {/* Author information */}
          <div className="flex items-center justify-start mt-auto">
            {comment.avatar && (
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-200 mr-4">
                {/* <img
                  src={comment.avatar}
                  alt={comment.author || "مشتری"}
                  className="w-full h-full object-cover"
                /> */}
                <Image
                  src={comment.avatar}
                  alt={comment.author || "مشتری"}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="text-right">
              <p className="font-bold text-gray-800">
                {comment.author || "مشتری"}
              </p>
              <p className="text-sm text-pink-600">{comment.role || ""}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="bg-gradient-to-t from-pink-50 to-white py-16" dir="rtl">
      <div className="max-w-4xl mx-auto text-center px-4" dir="rtl">
        <div className="flex items-center justify-between mb-12">
          <motion.h2
            className="text-3xl font-bold text-pink-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            نظرات مشتریان
          </motion.h2>

          <div className="flex space-x-2">
            <motion.button
              onClick={handleNext}
              className="bg-white text-xl rounded-full w-10 h-10 flex items-center justify-center shadow-md text-pink-600 hover:bg-pink-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </motion.button>
            <motion.button
              onClick={handlePrev}
              className="bg-white text-xl rounded-full w-10 h-10 flex items-center justify-center shadow-md text-pink-600 hover:bg-pink-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Comment cards stack */}
        <div
          className="relative h-[300px] mx-auto max-w-2xl overflow-visible perspective-1000"
          ref={containerRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Previous card (behind and slightly up) */}
          {renderCommentCard(getPrevIndex(), 10, 0.92, -20, 0.6)}

          {/* Next card (behind and slightly down) */}
          {renderCommentCard(getNextIndex(), 10, 0.92, 20, 0.6)}

          {/* Main draggable card */}
          <motion.div
            className="absolute inset-0 cursor-grab active:cursor-grabbing z-30"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ y }}
          >
            {renderCommentCard(currentIndex, 30, 1, 0, 1, true)}
          </motion.div>

          {/* Drag indicators */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-pink-300 opacity-50 z-40">
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
              animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path d="m18 15-6-6-6 6" />
            </motion.svg>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-pink-300 opacity-50 z-40">
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
              animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path d="m6 9 6 6 6-6" />
            </motion.svg>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-pink-100 rounded-full mt-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / comments.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {comments.map((_, index) => (
            <motion.button
              key={index}
              className="w-3 h-3 rounded-full bg-gray-300 focus:outline-none"
              initial={false}
              animate={{
                scale: currentIndex === index ? 1.2 : 1,
                backgroundColor: currentIndex === index ? "#db2777" : "#d1d5db",
              }}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommentSlider;
