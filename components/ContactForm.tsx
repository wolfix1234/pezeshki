"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker, {
  DateObject,
  DatePickerRef
} from "react-multi-date-picker";
// Calendar as DatePickerCalendar,
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, ChevronDown } from "lucide-react";

const dropdownVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const submitButtonVariants = {
  initial: { scale: 1, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const selectContainerVariants = {
  focus: {
    boxShadow: "0 0 0 3px rgba(188, 0, 96, 0.2)",
    borderColor: "#BC0060",
  },
  blur: {
    boxShadow: "0 0 0 0px rgba(188, 0, 96, 0)",
    borderColor: "#e5e7eb",
  },
};

export default function ContactForm() {
  const categories = [
    "اپیلاسیون",
    "پاکسازی صورت",
    "شینیون",
    "کراتین",
    "کوتاهی مو",
    "مانیکور",
    "میکاپ",
  ];

  // Map categories to their skills
  const categoryToSkills: { [key: string]: string[] } = {
    اپیلاسیون: [
      "اپیلاسیون با موم",
      "اپیلاسیون دست‌ها",
      "اپیلاسیون صورت",
      "اپیلاسیون کامل",
    ],
    "پاکسازی صورت": ["پاکسازی عمیق", "پاکسازی معمولی"],
    شینیون: ["شینیون ساده", "شینیون مجلسی"],
    کراتین: ["کراتین برزیلی", "کراتین ایرانی"],
    "کوتاهی مو": ["کوتاهی ساده", "کوتاهی مدل دار"],
    مانیکور: ["مانیکور ساده", "مانیکور ژل"],
    میکاپ: ["میکاپ ساده", "میکاپ عروس"],
    default: ["لطفا ابتدا دسته بندی را انتخاب کنید"],
  };

  const persons: { [key: string]: string[] } = {
    "اپیلاسیون با موم": ["سحر نعمتی", "مریم احمدی"],
    "اپیلاسیون دست‌ها": ["سحر نعمتی", "زهرا محمدی"],
    "اپیلاسیون صورت": ["مریم احمدی", "زهرا محمدی"],
    "اپیلاسیون کامل": ["سحر نعمتی"],
    "پاکسازی عمیق": ["ممد اکبری", "قاسم صمدی"],
    "پاکسازی معمولی": ["ممد اکبری"],
    "شینیون ساده": ["زهرا محمدی", "سارا رضایی"],
    "شینیون مجلسی": ["سارا رضایی"],
    "کراتین برزیلی": ["مریم احمدی", "سارا رضایی"],
    "کراتین ایرانی": ["مریم احمدی"],
    "کوتاهی ساده": ["قاسم صمدی", "ممد اکبری"],
    "کوتاهی مدل دار": ["قاسم صمدی"],
    "مانیکور ساده": ["زهرا محمدی"],
    "مانیکور ژل": ["زهرا محمدی", "سحر نعمتی"],
    "میکاپ ساده": ["سارا رضایی"],
    "میکاپ عروس": ["سارا رضایی", "مریم احمدی"],
    default: ["لطفا ابتدا خدمات را انتخاب کنید"],
  };

  // State for each dropdown
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateObject | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Focus states for dropdowns
  const [categoryFocused, setCategoryFocused] = useState(false);
  const [skillFocused, setSkillFocused] = useState(false);
  const [personFocused, setPersonFocused] = useState(false);

  // Refs for each dropdown
  const categoryRef = useRef<HTMLSelectElement>(null);
  const skillRef = useRef<HTMLSelectElement>(null);
  const personRef = useRef<HTMLSelectElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const datePickerCalendarRef = useRef<DatePickerRef>(null);

  // Get available skills based on selected category
  const availableSkills = selectedCategory
    ? categoryToSkills[selectedCategory] || categoryToSkills.default
    : categoryToSkills.default;

  // Get available persons based on selected skill
  const availablePersons = selectedSkill
    ? persons[selectedSkill] || persons.default
    : persons.default;

  // Effect to focus on skill dropdown when category is selected
  useEffect(() => {
    if (selectedCategory && skillRef.current) {
      skillRef.current.focus();
    }
  }, [selectedCategory]);

  // Effect to focus on person dropdown when skill is selected
  useEffect(() => {
    if (selectedSkill && personRef.current) {
      personRef.current.focus();
    }
  }, [selectedSkill]);

  // Close datepicker when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  // Function to handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSkill(""); // Reset skill when category changes
    setSelectedPerson(""); // Reset person when category changes
  };

  // Function to handle skill selection
  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const skill = e.target.value;
    setSelectedSkill(skill);
    setSelectedPerson(""); // Reset person when skill changes
  };

  // Function to handle date selection
  const handleDateChange = (date: DateObject) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  // Format date for display
  const formatDate = (date: DateObject | null) => {
    if (!date) return "انتخاب تاریخ";
    return `${date.day} ${date.month.name} ${date.year}`;
  };

  // Function to open the date picker and its calendar
  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);

    // Use setTimeout to ensure the DatePicker component is rendered before trying to open the calendar
    setTimeout(() => {
      if (datePickerCalendarRef.current) {
        datePickerCalendarRef.current.openCalendar();
      }
    }, 0);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto mt-4 sm:mt-6 md:mt-8 py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="flex flex-col items-center justify-center mb-4 sm:mb-6 md:mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl text-[#BC0060] mb-4 sm:mb-6"
        >
          رزرو نوبت
        </motion.h1>
      </div>

      {/* Date selection buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-12 mb-6 sm:mb-8">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleOpenDatePicker}
          className="w-full sm:w-auto text-base sm:text-lg md:text-xl bg-[#BC0060] text-white rounded-full h-10 md:h-12 px-4 sm:px-6 md:px-8 mb-3 sm:mb-0 flex items-center justify-center"
        >
          <Calendar className="ml-2" size={18} />
          انتخاب تاریخ
        </motion.button>

        <motion.div
          dir="rtl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full sm:w-auto text-base sm:text-lg md:text-xl bg-gray-100 text-gray-700 rounded-full h-10 md:h-12 px-4 sm:px-6 md:px-8 flex items-center justify-center"
        >
          {selectedDate ? formatDate(selectedDate) : "تاریخ را انتخاب کنید"}
        </motion.div>

        {/* Date Picker */}
        <AnimatePresence>
          {isDatePickerOpen && (
            <motion.div
              ref={datePickerRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute mt-12 z-50"
            >
              <DatePicker
                ref={datePickerCalendarRef}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={selectedDate}
                onChange={handleDateChange}
                minDate={new DateObject({ calendar: persian }).add(1, "day")}
                maxDate={new DateObject({ calendar: persian }).add(90, "day")}
                className="custom-calendar"
                hideOnScroll
                onlyShowInRangeDates
                onOpen={() => {}} // This is needed to make the ref work properly
                inputClass="hidden" // This hides the input field
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Form fields */}
      <div
        className="flex flex-col md:flex-row justify-center gap-4 sm:gap-6 md:gap-10"
        dir="rtl"
      >
        {/* Category dropdown */}
        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full md:w-64 text-right mb-4 md:mb-0"
        >
          <label className="block text-gray-700 font-semibold mb-2">
            دسته بندی
          </label>
          <motion.div
            className="relative"
            variants={selectContainerVariants}
            animate={categoryFocused ? "focus" : "blur"}
            transition={{ duration: 0.2 }}
          >
            <select
              ref={categoryRef}
              value={selectedCategory}
              onChange={handleCategoryChange}
              onFocus={() => setCategoryFocused(true)}
              onBlur={() => setCategoryFocused(false)}
              className="block w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none appearance-none bg-white pr-4"
              // autoFocus
            >
              <option value="">انتخاب کنید...</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <motion.div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              animate={{ rotate: categoryFocused ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="text-gray-400" size={18} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skill dropdown */}
        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-full md:w-64 text-right mb-4 md:mb-0"
        >
          <label className="block text-gray-700 font-semibold mb-2">
            خدمات
          </label>
          <motion.div
            className="relative"
            variants={selectContainerVariants}
            animate={skillFocused ? "focus" : "blur"}
            transition={{ duration: 0.2 }}
          >
            <select
              ref={skillRef}
              value={selectedSkill}
              onChange={handleSkillChange}
              onFocus={() => setSkillFocused(true)}
              onBlur={() => setSkillFocused(false)}
              className={`block w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none appearance-none bg-white pr-4 ${
                !selectedCategory ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedCategory}
            >
              <option value="">انتخاب کنید...</option>
              {availableSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <motion.div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              animate={{ rotate: skillFocused ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="text-gray-400" size={18} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Person dropdown */}
        <motion.div
          variants={dropdownVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.2, duration: 0.3 }}
          className="w-full md:w-64 text-right"
        >
          <label className="block text-gray-700 font-semibold mb-2">
            متخصص
          </label>
          <motion.div
            className="relative"
            variants={selectContainerVariants}
            animate={personFocused ? "focus" : "blur"}
            transition={{ duration: 0.2 }}
          >
            <select
              ref={personRef}
              value={selectedPerson}
              onChange={(e) => setSelectedPerson(e.target.value)}
              onFocus={() => setPersonFocused(true)}
              onBlur={() => setPersonFocused(false)}
              className={`block w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none appearance-none bg-white pr-4 ${
                !selectedSkill ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedSkill}
            >
              <option value="">انتخاب کنید...</option>
              {availablePersons.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
            <motion.div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
              animate={{ rotate: personFocused ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="text-gray-400" size={18} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Submit button - only enabled when all selections are made */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity:
            selectedCategory && selectedSkill && selectedPerson && selectedDate
              ? 1
              : 0,
          y:
            selectedCategory && selectedSkill && selectedPerson && selectedDate
              ? 0
              : 20,
        }}
        transition={{ duration: 0.3 }}
        className="flex justify-center mt-6 sm:mt-8"
      >
        <motion.button
          variants={submitButtonVariants}
          initial="initial"
          animate={
            selectedCategory && selectedSkill && selectedPerson && selectedDate
              ? "animate"
              : "initial"
          }
          whileHover="hover"
          whileTap="tap"
          className={`px-6 py-2 sm:py-3 rounded-full text-white font-bold text-base sm:text-lg ${
            selectedCategory && selectedSkill && selectedPerson && selectedDate
              ? "bg-[#BC0060] hover:bg-pink-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={
            !(
              selectedCategory &&
              selectedSkill &&
              selectedPerson &&
              selectedDate
            )
          }
        >
          ثبت نوبت
        </motion.button>
      </motion.div>

      {/* Add some custom styles for the date picker */}
      <style jsx global>{`
        .custom-calendar {
          font-family: "Vazirmatn", sans-serif !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 16px;
          background-color: white;
          border: 1px solid #eaeaea;
        }

        .custom-calendar .rmdp-day.rmdp-selected span {
          background-color: #bc0060 !important;
        }

        .custom-calendar
          .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden)
          span:hover {
          background-color: rgba(188, 0, 96, 0.2) !important;
        }

        .custom-calendar .rmdp-arrow {
          border: solid #bc0060;
          border-width: 0 2px 2px 0;
        }

        .custom-calendar .rmdp-week-day {
          color: #bc0060;
          font-weight: bold;
        }

        .custom-calendar .rmdp-header-values {
          font-weight: bold;
          color: #333;
        }
      `}</style>
    </motion.section>
  );
}
