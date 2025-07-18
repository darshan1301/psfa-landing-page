// components/TestimonialSection.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Testimonial {
  id: string;
  name: string;
  membership: string;
  image: string;
  comment: string;
}

const containerVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
};

export default function TestimonialSection({
  testimonials = [],
}: {
  testimonials?: Testimonial[];
}) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = () => {
    setCurrent((prev) => (prev + 1) % total);
  };
  const prev = () => {
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Top Bar with Tabs and Heading */}
      <div className="lg:flex ">
        <div className="px-6 lg:mx-28 flex items-center justify-center mb-8">
          <div className="lg:flex block space-x-4">
            <button className="px-4 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded-full">
              Testimonial
            </button>
            <button className="px-4 py-1 text-sm font-medium text-white bg-black rounded-full">
              What they say about us
            </button>
          </div>
        </div>
        {/* Navigation Arrows (centered under top bar) */}
        <div className="max-w-7xl mx-auto px-6 hidden md:flex justify-center mb-8">
          <button
            onClick={prev}
            className="bg-white p-4 rounded-full shadow hover:shadow-lg transition-all duration-200 disabled:opacity-50 mr-4"
            aria-label="Previous testimonial">
            <ChevronLeft className="w-5 h-5 text-gray-700 hover:text-blue-500 transition-colors" />
          </button>
          <button
            onClick={next}
            className="bg-white p-4 rounded-full shadow hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            aria-label="Next testimonial">
            <ChevronRight className="w-5 h-5 text-gray-700 hover:text-blue-500 transition-colors" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl lg:mx-8 px-6 flex flex-col md:flex-row items-center gap-8">
        {/* Left: Large Image */}
        <div className="md:w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].id}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-sm rounded-4xl overflow-hidden shadow-lg">
              <Image
                width={1920}
                height={1080}
                src={testimonials[current].image}
                alt={testimonials[current].name}
                className="object-cover w-52 md:w-full md:h-90 lg:h-110 h-60"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Quote and Author */}
        <div className="md:w-fit w-full flex flex-col justify-center px-2 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].id}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit">
              <blockquote className=" text-2xl leading-tight lg:font-normal tracking-tighter lg:text-3xl text-gray-900 mb-4">
                “{testimonials[current].comment}”
              </blockquote>
              <p className="text-lg font-medium text-blue-600 mb-1">
                {testimonials[current].name}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[current].membership}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Navigation Arrows (centered under top bar) */}
        <div className="max-w-7xl mx-auto px-3 flex md:hidden justify-center mb-8">
          <button
            onClick={prev}
            className="bg-white p-4 rounded-full shadow hover:shadow-lg transition-all duration-200 disabled:opacity-50 mr-4"
            aria-label="Previous testimonial">
            <ChevronLeft className="w-5 h-5 text-gray-700 hover:text-blue-500 transition-colors" />
          </button>
          <button
            onClick={next}
            className="bg-white p-4 rounded-full shadow hover:shadow-lg transition-all duration-200 disabled:opacity-50"
            aria-label="Next testimonial">
            <ChevronRight className="w-5 h-5 text-gray-700 hover:text-blue-500 transition-colors" />
          </button>
        </div>

        {/* Right: Thumbnail and Counter */}
        <div className="md:w-fit w-full flex flex-col items-center">
          <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg mb-4">
            <Image
              width={1920}
              height={1080}
              src={testimonials[(current + 1) % total].image}
              alt={testimonials[(current + 1) % total].name}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-sm text-gray-700">
            {current + 1} / {total}
          </p>
        </div>
      </div>
    </section>
  );
}
