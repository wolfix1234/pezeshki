"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface DropdownItem {
  id: number;
  title: string;
  slug: string;
}

interface DropdownProps {
  isOpen: boolean;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, items }) => {
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.05,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute top-full right-0 min-w-[200px] bg-white shadow-lg rounded-lg overflow-hidden z-40"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          dir="rtl"
        >
          <div className="py-2">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={`/blog/${item.slug}`}
                  className="block py-2 px-4 hover:bg-pink-50 text-right transition-colors"
                >
                  <div className="flex flex-row-reverse items-center justify-between">
                    <ChevronLeft className="w-4 h-4 text-pink-400" />
                    <span>{item.title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
