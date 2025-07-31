"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, X, ExternalLink } from "lucide-react";
import { Star, Sparkles, Scissors, Palette } from "lucide-react";
import Image from 'next/image'


// Sample gallery items - replace with your actual data
const galleryItems = [
  {
    id: 1,
    category: "all",
    image: "/image1.jpg",
    title: "گالری آیتم ۱",
    description: "توضیحات مختصر درباره این نمونه کار",
  },
  {
    id: 2,
    category: "makeup",
    image: "/image2.jpg",
    title: "گالری آیتم ۲",
    description: "میکاپ عروس با متدهای جدید",
  },
  {
    id: 3,
    category: "skincare",
    image: "/image3.jpg",
    title: "گالری آیتم ۳",
    description: "پاکسازی",
  },
  {
    id: 4,
    category: "hairstyle",
    image: "/image1.jpg",
    title: "گالری آیتم ۴",
    description: "شنیون مدل کلاسیک",
  },
  {
    id: 5,
    category: "makeup",
    image: "/image2.jpg",
    title: "گالری آیتم ۵",
    description: "میکاپ مجلسی",
  },
  {
    id: 6,
    category: "skincare",
    image: "/image3.jpg",
    title: "گالری آیتم ۶",
    description: "مراقبت ویژه پوست",
  },
  {
    id: 7,
    category: "hairstyle",
    image: "/image1.jpg",
    title: "گالری آیتم ۷",
    description: "کوتاهی مو تخصصی",
  },
  {
    id: 8,
    category: "makeup",
    image: "/image2.jpg",
    title: "گالری آیتم ۸",
    description: "میکاپ طبیعی روزانه",
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState(galleryItems);
  const [selectedItem, setSelectedItem] = useState<
    (typeof galleryItems)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const galleryRef = useRef(null);
  const isInView = useInView(galleryRef, { once: true, amount: 0.1 });

  // Filter categories
  const categories = [
    { id: "all", label: "نمایش همه", icon: <Star className="w-4 h-4" /> },
    {
      id: "skincare",
      label: "پاکسازی",
      icon: <Sparkles className="w-4 h-4" />,
    },
    { id: "hairstyle", label: "شنیون", icon: <Scissors className="w-4 h-4" /> },
    { id: "makeup", label: "میکاپ", icon: <Palette className="w-4 h-4" /> },
  ];

  // Handle filter change
  const handleFilterChange = (category: string) => {
    setActiveFilter(category);

    if (category === "all") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(
        galleryItems.filter((item) => item.category === category)
      );
    }
  };

  // Open modal with selected item
  const openModal = (item: (typeof galleryItems)[0]) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // const buttonVariants = {
  //   inactive: {
  //     backgroundColor: "rgb(252, 231, 243)",
  //     scale: 1,
  //   },
  //   active: {
  //     backgroundColor: "rgb(244, 114, 182)",
  //     color: "white",
  //     scale: 1.05,
  //     boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  //   },
  //   hover: {
  //     scale: 1.1,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  //   tap: {
  //     scale: 0.95,
  //   },
  // };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      dir="rtl"
      className="py-16 px-4 bg-gradient-to-b from-white to-pink-50 relative"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 170">
        <path
          fill="pink"
          fillOpacity="1"
          d="M0,96L120,106.7C240,117,480,139,720,138.7C960,139,1200,117,1320,106.7L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        ></path>
      </svg>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent z-10"></div>
      <div className="absolute top-40 right-0 w-32 h-32 bg-pink-100 rounded-full opacity-20"></div>
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-pink-100 rounded-full opacity-20"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#BC0060] mb-4 mt-4">
            گالری نمونه کارها
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            نمونه کارهای انجام شده توسط تیم متخصص ما را مشاهده کنید
          </p>
          <div className="w-24 h-1 bg-pink-300 mx-auto rounded-full"></div>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex justify-center items-center gap-1 sm:gap-4 mb-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleFilterChange(category.id)}
              className={`
      rounded-full py-1 px-2 sm:py-2.5 sm:px-4 text-xs sm:text-base font-medium cursor-pointer 
      flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300
      min-w-[80px] sm:min-w-[100px] h-[32px] sm:h-[40px]
      ${
        activeFilter === category.id
          ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
          : "bg-white text-gray-700 border border-pink-100 shadow-sm hover:bg-pink-50"
      }
    `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // Add these animation properties to ensure the button stays visible
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0 }}
            >
              <motion.span
                className={`${
                  activeFilter === category.id ? "text-white" : "text-pink-500"
                } text-sm sm:text-base flex-shrink-0`}
                animate={{
                  rotate: activeFilter === category.id ? [0, 15, 0, -15, 0] : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {category.icon}
              </motion.span>
              <span className="truncate">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <div ref={galleryRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              exit="hidden"
            >
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="group relative overflow-hidden rounded-xl shadow-md bg-white"
                  variants={itemVariants}
                  layoutId={`gallery-item-${item.id}`}
                  whileHover={{ y: -5 }}
                  onClick={() => openModal(item)}
                >
                  <div className="relative h-64 cursor-pointer w-full overflow-hidden">
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end">
                      <div className="p-4 w-full">
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-200 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>

                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <motion.button
                      className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModal(item)}
                    >
                      <Search size={18} className="text-pink-600" />
                    </motion.button>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-[#BC0060]"
                    initial={{ scaleX: 0, originX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
              <Search size={32} className="text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              هیچ موردی یافت نشد
            </h3>
            <p className="text-gray-500">لطفا دسته‌بندی دیگری را انتخاب کنید</p>
          </motion.div>
        )}

        {/* View more button */}
        {filteredItems.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className="bg-white text-pink-600 border border-pink-200 hover:bg-pink-50 px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>مشاهده همه نمونه کارها</span>
              <ExternalLink size={16} />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modal for image preview */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full"
                onClick={closeModal}
              >
                <X size={20} className="text-gray-800" />
              </button>

              <div className="w-full md:w-2/3 h-64 md:h-auto relative">
                {/* <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                /> */}
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/3 p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-pink-600 mb-4">
                  {selectedItem.category}
                </p>
                <p className="text-gray-600 mb-6">{selectedItem.description}</p>

                <div className="mt-auto">
                  <motion.button
                    className="w-full bg-pink-600 text-white py-3 rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    رزرو نوبت
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
