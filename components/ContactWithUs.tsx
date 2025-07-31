'use client'

import { Phone, Map } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactWithUs() {
  return (
    <div
      className="flex flex-col md:flex-row gap-10 justify-center items-start max-w-7xl mx-auto mt-20 px-4"
      dir="rtl"
    >
      {/* Form Section */}
      <motion.div
        className="w-full md:w-2/3 p-8 bg-white rounded-xl shadow-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <form className="space-y-4 text-right">
          <div>
            <label htmlFor="name" className="block font-bold text-gray-700">
              نام و نام خانوادگی
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              className="mt-1 w-full px-4 py-2 border border-pink-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-bold text-gray-700">
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="ایمیل خود را وارد کنید"
              className="mt-1 w-full px-4 py-2 border border-pink-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block font-bold text-gray-700">
              موضوع پیام
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder="موضوع پیام خود را وارد کنید"
              className="mt-1 w-full px-4 py-2 border border-pink-300 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-bold text-gray-700">
              متن پیام
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              placeholder="متن پیام خود را وارد کنید"
              className="mt-1 w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-pink-400 text-white font-bold py-2 px-8 rounded-full hover:bg-pink-700 transition duration-200"
            >
              ارسال پیام
            </button>
          </div>
        </form>
      </motion.div>

      {/* Contact Info + Map Section */}
      <motion.div
        className="flex flex-col gap-6 w-full md:w-2/3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <div className="w-full flex flex-col gap-6 bg-white rounded-xl shadow-md p-6">
          {/* Address */}
          <div className="flex items-start gap-4 border-b-2 border-gray-300 pb-4">
            <Map className="w-6 h-6 text-pink-500 mt-1" />
            <div>
              <h2 className="text-pink-500 text-xl font-semibold">آدرس</h2>
              <p className="text-gray-600">
                شیراز خیابان برق، روبه روی کوچه 10، ساختمان ارشیا، طبقه 6 واحد 8
              </p>
            </div>
          </div>

          {/* Phone 1 */}
          <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-pink-500 mt-1" />
              <div>
                <h2 className="text-pink-500 text-xl font-semibold">تلفن</h2>
                <p className="text-gray-600">021-33333333</p>
              </div>
            </div>
            <button className="bg-pink-300 py-3 px-8 rounded-full text-white">
              9 صبح الی 22
            </button>
          </div>

          {/* Phone 2 */}
          <div className="flex justify-between items-center border-b-2 border-gray-300 pb-4">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-pink-500 mt-1" />
              <div>
                <h2 className="text-pink-500 text-xl font-semibold">تلفن</h2>
                <p className="text-gray-600">021-33333333</p>
              </div>
            </div>
            <button className="bg-pink-300 py-3 px-8 rounded-full text-white">
              9 صبح الی 22
            </button>
          </div>
        </div>

        {/* Google Map */}
        <motion.div
          className="relative overflow-hidden pt-[56.25%] rounded-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <iframe
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            frameBorder="0"
            title="map"
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            allowFullScreen
          ></iframe>
        </motion.div>
      </motion.div>
    </div>
  );
}
