"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from 'next/image'


const cardsData = [
  {
    id: 1,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image1.jpg",
    description: "چرا ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 2,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image2.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 3,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image3.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 4,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image2.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 5,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image1.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 6,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image2.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
  {
    id: 7,
    title: "چرا در اینجا",
    work: "مو",
    image: "/image3.jpg",
    description: "را ریزش ممو خطرناک تر از سایر موارد است؟",
  },
];

const CardSlider: React.FC = () => {
  const [[page], setPage] = useState([0, 0]);
  // direction
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isDragging, setIsDragging] = useState(false);
  // const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values
  const controls = useAnimation();

  // Calculate the index bounds
  const maxVisibleIndex = Math.max(0, cardsData.length - cardsPerView);

  // Update responsive values
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1); // mobile
      } else if (width < 1024) {
        setCardsPerView(2); // tablet
      } else {
        setCardsPerView(3); // desktop
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isAutoplayPaused && !isDragging) {
      interval = setInterval(() => {
        if (page < maxVisibleIndex) {
          paginate(1);
        } else {
          // Reset to first slide
          setPage([0, 0]);
          controls.start({
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 },
          });
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [page, maxVisibleIndex, isAutoplayPaused, isDragging, controls]);

  // Handle navigation
  const paginate = (newDirection: number) => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Calculate the new page
    const newPage = page + newDirection;

    // Check bounds
    if (newPage < 0 || newPage > maxVisibleIndex) {
      setIsAnimating(false);
      return;
    }

    setPage([newPage, newDirection]);

    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Calculate the card width based on container width and cards per view
  const getCardWidth = () => {
    if (!containerRef.current) return 0;
    return containerRef.current.offsetWidth / cardsPerView;
  };

  // Animation variants
  const sliderVariants = {
    animate: (custom: number) => ({
      x: -custom * getCardWidth(),
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
      },
    }),
  };

  // Update animation when page changes
  useEffect(() => {
    controls.start({
      x: -page * getCardWidth(),
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [page, controls]);

  // Handle drag gestures
  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoplayPaused(true);
  };

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    setIsAutoplayPaused(false);

    const threshold = getCardWidth() / 3;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    // Fast swipe detection
    const isFastSwipe = Math.abs(velocity) > 500;

    if (offset > threshold || (isFastSwipe && velocity > 0)) {
      // Swiped right - go to previous slide
      paginate(-1);
    } else if (offset < -threshold || (isFastSwipe && velocity < 0)) {
      // Swiped left - go to next slide
      paginate(1);
    } else {
      // Snap back to current position
      controls.start({
        x: -page * getCardWidth(),
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, backgroundColor: "#9f1239" },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.5, scale: 1 },
  };

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { y: -10, transition: { duration: 0.3 } },
  };

  // Front box animation variants
  const frontBoxVariants = {
    initial: { y: 20, opacity: 0, scale: 0.9 },
    animate: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full max-w-7xl mx-auto text-center px-4 py-12">
      <div className="flex justify-between mb-6">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover={page > 0 ? "hover" : "disabled"}
          whileTap={page > 0 ? "tap" : "disabled"}
          onClick={() => paginate(-1)}
          disabled={page === 0}
          className={`bg-pink-600 text-white p-3 rounded-full overflow-hidden shadow-md ${
            page === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover={page < maxVisibleIndex ? "hover" : "disabled"}
          whileTap={page < maxVisibleIndex ? "tap" : "disabled"}
          onClick={() => paginate(1)}
          disabled={page >= maxVisibleIndex}
          className={`bg-pink-600 text-white p-3 rounded-full overflow-hidden shadow-md ${
            page >= maxVisibleIndex
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        {/* Decorative elements */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-pink-100 opacity-50 z-0"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-purple-100 opacity-40 z-0"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
        />

        {/* Main slider */}
        <motion.div
          className="relative cursor-grab active:cursor-grabbing"
          ref={sliderRef}
          drag="x"
          dragConstraints={{
            left: -maxVisibleIndex * getCardWidth(),
            right: 0,
          }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          custom={page}
          variants={sliderVariants}
          initial="animate"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setIsAutoplayPaused(false);
          }}
        >
          <div className="flex">
            {cardsData.map((card, index) => (
              <motion.div
                key={card.id}
                className="w-full max-w-sm px-4 pt-4 pb-20"
                style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
                drag={false} // Disable individual card dragging
              >
                <div className="relative">
                  {/* Image container */}
                  <motion.div
                    className="rounded-2xl overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-80 object-cover transition duration-300"
                      style={{
                        filter:
                          activeCard === index
                            ? "grayscale(0)"
                            : "grayscale(100%)",
                      }}
                      draggable="false" // Prevent default image dragging
                    /> */}

                    <Image
                       src={card.image}
                       alt={card.title}
                       className="w-full h-80 object-cover transition duration-300"
                       style={{
                         filter:
                           activeCard === index
                             ? "grayscale(0)"
                             : "grayscale(100%)",
                       }}
                       draggable="false" // Prevent default image dragging
                      width={1000}
                      height={1000}
                    />
                  </motion.div>

                  {/* Card title that overlaps the bottom of the image */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 pointer-events-none"
                    variants={frontBoxVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                  >
                    <motion.div
                      className="bg-white p-5 rounded-2xl shadow-lg mx-auto w-4/5"
                      initial={{ backgroundColor: "#ffffff" }}
                      whileHover={{
                        backgroundColor: "#fdf2f8",
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div
                        className="flex justify-between items-center"
                        dir="rtl"
                      >
                        <motion.h3
                          className="text-xl pr-2 font-bold border-r-2 border-pink-600 border-solid"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                        >
                          {card.title}
                        </motion.h3>
                        <motion.span
                          className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#f9a8d4",
                          }}
                        >
                          {card.work}
                        </motion.span>
                      </div>
                      <motion.p
                        className="mt-3 text-gray-600 text-right pr-2"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        {card.description}
                      </motion.p>

                      <motion.div
                        className="mt-4 text-right"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <motion.button
                          className="text-pink-600 font-medium inline-flex items-center"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          مطالعه بیشتر
                          <ArrowRight
                            size={16}
                            className="mr-1 rtl:rotate-180"
                          />
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-16 space-x-2">
        {Array.from({ length: maxVisibleIndex + 1 }).map((_, index) => (
          <motion.button
            key={index}
            className="w-3 h-3 rounded-full bg-gray-300 focus:outline-none"
            initial={false}
            animate={{
              scale: page === index ? 1.2 : 1,
              backgroundColor: page === index ? "#db2777" : "#d1d5db",
            }}
            onClick={() => setPage([index, page < index ? 1 : -1])}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
