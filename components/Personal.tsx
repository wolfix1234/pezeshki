"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, useDragControls } from "framer-motion";
import {
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

// Define types for team members
interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

interface TeamMember {
  name: string;
  title: string;
  description: string;
  image: string;
  socialLinks: SocialLink[];
}

// Sample team members data
const teamMembers: TeamMember[] = [
  {
    name: "دکتر سارا محمدی",
    title: "متخصص پوست و مو",
    description:
      "دکتر سارا محمدی با بیش از 10 سال تجربه در زمینه پوست و مو، خدمات تخصصی در زمینه زیبایی و سلامت پوست ارائه می‌دهد.",
    image: "/image1.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "Telegram",
        url: "https://telegram.org",
        icon: <FaTelegram size={20} />,
      },
      {
        platform: "Twitter",
        url: "https://twitter.com",
        icon: <FaTwitter size={20} />,
      },
    ],
  },
  {
    name: "مریم احمدی",
    title: "متخصص آرایش و زیبایی",
    description:
      "مریم احمدی کارشناس ارشد آرایش و زیبایی با تخصص در میکاپ حرفه‌ای و طراحی ناخن است.",
    image: "/image2.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com",
        icon: <FaLinkedin size={20} />,
      },
    ],
  },
  {
    name: "زهرا کریمی",
    title: "متخصص مو و رنگ",
    description:
      "زهرا کریمی متخصص در زمینه کراتینه، رنگ مو و ترمیم موهای آسیب دیده با بیش از 8 سال سابقه کار.",
    image: "/image3.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "Telegram",
        url: "https://telegram.org",
        icon: <FaTelegram size={20} />,
      },
    ],
  },
  {
    name: "نیلوفر رضایی",
    title: "متخصص ناخن",
    description:
      "نیلوفر رضایی با 6 سال تجربه در زمینه طراحی و ترمیم ناخن، خدمات مانیکور و پدیکور حرفه‌ای ارائه می‌دهد.",
    image: "/image1.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "WhatsApp",
        url: "https://whatsapp.com",
        icon: <FaWhatsapp size={20} />,
      },
    ],
  },
  {
    name: "فاطمه حسینی",
    title: "متخصص اپیلاسیون",
    description:
      "فاطمه حسینی متخصص در زمینه اپیلاسیون و خدمات مراقبت از پوست با استفاده از جدیدترین تکنیک‌های روز دنیا.",
    image: "/image2.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "YouTube",
        url: "https://youtube.com",
        icon: <FaYoutube size={20} />,
      },
    ],
  },
  {
    name: "سمیرا نجفی",
    title: "متخصص میکروبلیدینگ",
    description:
      "سمیرا نجفی متخصص در زمینه میکروبلیدینگ ابرو و تاتو با بیش از 5 سال سابقه کار و گواهینامه‌های بین‌المللی.",
    image: "/image3.jpg",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
        icon: <FaInstagram size={20} />,
      },
      {
        platform: "Telegram",
        url: "https://telegram.org",
        icon: <FaTelegram size={20} />,
      },
    ],
  },
];

const TeamMembers: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const controls = useAnimation();
  const dragControls = useDragControls();
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate max index based on visible items
  const maxIndex = Math.max(0, teamMembers.length - visibleItems);

  // Update visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isAutoplayPaused && !isDragging) {
      interval = setInterval(() => {
        if (currentIndex < maxIndex) {
          handleNext();
        } else {
          // Reset to first slide
          setCurrentIndex(0);
          controls.start({ x: 0 });
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, isAutoplayPaused, isDragging, controls]);

  // Update animation when currentIndex changes
  useEffect(() => {
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth / visibleItems;
      controls.start({
        x: -currentIndex * slideWidth,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  }, [currentIndex, visibleItems, controls]);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoplayPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);

    // Calculate swipe distance
    const distance = touchStart - e.targetTouches[0].clientX;

    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth / visibleItems;

      // Apply resistance at edges
      let newX = -currentIndex * slideWidth - distance;

      if (currentIndex === 0 && distance < 0) {
        // Left edge - add resistance
        newX = -distance * 0.3;
      } else if (currentIndex === maxIndex && distance > 0) {
        // Right edge - add resistance
        newX = -currentIndex * slideWidth - distance * 0.3;
      }

      // Update position during drag
      controls.set({ x: newX });
    }
  };

  const handleTouchEnd = () => {
    setIsAutoplayPaused(false);

    // Reset to proper position
    if (containerRef.current) {
      const slideWidth = containerRef.current.offsetWidth / visibleItems;

      // Minimum distance required for a swipe
      const minSwipeDistance = 50;
      const distance = touchStart - touchEnd;

      if (distance > minSwipeDistance && currentIndex < maxIndex) {
        // Swipe left - go to next slide
        handleNext();
      } else if (distance < -minSwipeDistance && currentIndex > 0) {
        // Swipe right - go to previous slide
        handlePrev();
      } else {
        // Return to current slide
        controls.start({
          x: -currentIndex * slideWidth,
          transition: { type: "spring", stiffness: 300, damping: 30 },
        });
      }
    }
  };

  // Handle mouse drag for desktop
  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoplayPaused(true);
    setDragStartX(e.clientX);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const distance = dragStartX - e.clientX;
    const slideWidth = containerRef.current.offsetWidth / visibleItems;
    
    // Apply resistance at edges
    let newX = -currentIndex * slideWidth - distance;

    if (currentIndex === 0 && distance < 0) {
      // Left edge - add resistance
      newX = -distance * 0.3;
    } else if (currentIndex === maxIndex && distance > 0) {
      // Right edge - add resistance
      newX = -currentIndex * slideWidth - distance * 0.3;
    }

    // Update position during drag
    controls.set({ x: newX });
  };

  const handleDragEnd = (e: MouseEvent) => {
    setIsDragging(false);
    setIsAutoplayPaused(false);
    
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);

    if (!containerRef.current) return;
    
    const slideWidth = containerRef.current.offsetWidth / visibleItems;
    const distance = dragStartX - e.clientX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance && currentIndex < maxIndex) {
      // Drag left - go to next slide
      handleNext();
    } else if (distance < -minSwipeDistance && currentIndex > 0) {
      // Drag right - go to previous slide
      handlePrev();
    } else {
      // Return to current slide
      controls.start({
        x: -currentIndex * slideWidth,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  };

  // Handle dot navigation
  // const handleDotClick = (index: number) => {
  //   setCurrentIndex(index);
  // };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-pink-50 to-white relative">
  {/* Decorative elements */}
  <div className="absolute top-20 left-10 w-32 h-32 bg-pink-100 rounded-full opacity-30 blur-xl"></div>
  <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-200 rounded-full opacity-30 blur-xl"></div>

  {/* SVG background - positioned outside the animated container */}
  <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1440 300" 
      className="absolute left-0 w-full"
      style={{ top: "200px", zIndex: 0 }} // Adjust top value as needed
    >
      <path 
        fill="pink" 
        fillOpacity="1" 
        d="M0,96L120,106.7C240,117,480,139,720,138.7C960,139,1200,117,1320,106.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
      ></path>
    </svg>
  </div>

  <div className="max-w-6xl mx-auto relative">
    <motion.div
      className="text-center mb-12 relative z-10" // Add z-10 to ensure content is above SVG
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
    >
      <motion.span
        className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-3"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
        تیم ما
      </motion.span>
      <div className="relative">
        <h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          dir="rtl"
        >
          تیم متخصصین ما
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto" dir="rtl">
          با تیم متخصص و حرفه‌ای ما آشنا شوید. ما با افتخار خدمات زیبایی با
          کیفیت را به شما ارائه می‌دهیم.
        </p>
      </div>

      {/* Remove the SVG from here */}

      {/* Decorative element */}
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-pink-300 to-pink-500 mx-auto mt-6 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      />
    </motion.div>


                       {/* Slider container with touch and drag support */}
        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="overflow-hidden cursor-grab"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleDragStart}
            onMouseEnter={() => setIsAutoplayPaused(true)}
            onMouseLeave={() => {
              if (!isDragging) setIsAutoplayPaused(false);
            }}
            style={{ touchAction: "pan-y" }}
          >
            <motion.div
              className="flex gap-8"
              animate={controls}
              initial={{ x: 0 }}
              drag="x"
              dragConstraints={{ left: -maxIndex * (containerRef.current?.offsetWidth || 0) / visibleItems, right: 0 }}
              dragElastic={0.1}
              dragControls={dragControls}
              onDragStart={() => {
                setIsDragging(true);
                setIsAutoplayPaused(true);
              }}
              onDragEnd={(e, info) => {
                setIsDragging(false);
                setIsAutoplayPaused(false);
                
                if (containerRef.current) {
                  const slideWidth = containerRef.current.offsetWidth / visibleItems;
                  const dragDistance = info.offset.x;
                  const draggedSlides = Math.round(dragDistance / slideWidth);
                  
                  let newIndex = currentIndex - draggedSlides;
                  newIndex = Math.max(0, Math.min(newIndex, maxIndex));
                  
                  setCurrentIndex(newIndex);
                }
              }}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className={`flex-none ${
                    visibleItems === 1
                      ? "w-full"
                      : visibleItems === 2
                      ? "w-[calc(50%-1rem)]"
                      : "w-[calc(33.333%-1.33rem)]"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.1, 0.3),
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  onHoverStart={() => setActiveCard(index)}
                  onHoverEnd={() => setActiveCard(null)}
                >
                  <motion.div
                    className="relative bg-white rounded-2xl shadow-md overflow-visible p-6 pt-20 mt-16 border border-gray-100 h-full"
                    whileHover={{
                      y: -8,
                      boxShadow:
                        "0 20px 40px -5px rgba(236, 72, 153, 0.2), 0 10px 15px -5px rgba(236, 72, 153, 0.1)",
                      backgroundColor: "#fdf2f8",
                      borderColor: "#F9A8D4",
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* Decorative gradient line at top */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 to-pink-600 rounded-t-2xl"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      viewport={{ once: true }}
                    />

                    {/* Image positioned at top-center, extending outside the card */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.2,
                        }}
                        whileHover={{
                          scale: 1.05,
                          borderColor: "#F9A8D4",
                          transition: { duration: 0.2 },
                        }}
                        viewport={{ once: true }}
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="128px"
                        />

                        {/* Decorative ring */}
                        <motion.div
                          className="absolute inset-0 border-4 border-pink-200 rounded-full"
                          initial={{ opacity: 0 }}
                          whileHover={{
                            opacity: 1,
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </div>

                    {/* Name and title */}
                    <div className="text-center mb-6" dir="rtl">
                      <motion.h3
                        className="text-xl font-bold text-gray-800 mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {member.name}
                      </motion.h3>
                      <motion.p
                        className="text-pink-600 font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        {member.title}
                      </motion.p>
                    </div>

                    {/* Description */}
                    <motion.div
                      className="mb-6 text-gray-600 text-sm text-center"
                      dir="rtl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p>{member.description}</p>
                    </motion.div>

                    {/* Separator line with animation */}
                    <motion.div
                      className="border-t border-gray-200 my-4"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                    />

                    {/* Social media section */}
                    <div
                      className="flex items-center justify-between"
                      dir="rtl"
                    >
                      <span className="text-gray-700 font-medium text-sm">
                        شبکه‌های اجتماعی:
                      </span>
                      <div className="flex gap-3">
                        {member.socialLinks.map((link, idx) => (
                          <motion.a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-pink-600 transition-colors p-2 rounded-full hover:bg-pink-50"
                            whileHover={{
                              scale: 1.2,
                              backgroundColor: "#FCE7F3",
                              color: "#DB2777",
                            }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            viewport={{ once: true }}
                          >
                            {link.icon}
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* "View Profile" button that appears on hover */}
                    <motion.div
                      className="absolute -bottom-3 left-0 right-0 flex justify-center opacity-0 transform translate-y-4 transition-all duration-300"
                      style={{
                        opacity: activeCard === index ? 1 : 0,
                        transform:
                          activeCard === index
                            ? "translateY(0)"
                            : "translateY(1rem)",
                      }}
                    >
                      <motion.button
                        className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        مشاهده پروفایل
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
