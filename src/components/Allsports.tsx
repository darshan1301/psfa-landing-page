// FacilitiesCarousel.tsx
"use client";

import React, { FC, useRef, useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { sports } from "@/utils/sports";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const FacilitiesCarousel: FC = () => {
  const sliderRef = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Update slidesToShow on resize (client-side)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setSlidesToShow(1);
      } else if (w < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(4);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const settings: Settings = {
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false, // hide default arrows
    dots: false, // hide default dots
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const maxIndex = sports.length - slidesToShow;
  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < maxIndex;

  return (
    <div className="lg:max-w-fit bg-white lg:rounded-4xl lg:mx-4 px-6 py-4 pt-10 lg:px-16 lg:py-8">
      {/* Header / Search / View All */}
      <div className="flex lg:flex-row justify-between md:justify-center lg:justify-between mb-6 items-center md:my-10 gap-4">
        <div className="md:flex w-full md:gap-4 lg:items-center ">
          <span className="px-3 md:block hidden py-1 border border-gray-300 rounded-full tracking-tight text-gray-900">
            Sports
          </span>
          <h2 className="text-black text-xl max-w-fit md:max-w-full lg:px-4 leading-tight lg:font-normal tracking-tighter md:text-2xl lg:text-3xl">
            Our Facilities
          </h2>
        </div>
        <div className="items-end lg:gap-4 w-60 md:w-40">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {sports.map((facility) => (
            <div key={facility.id} className="px-1">
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  className="w-full transition-all hover:h-100 overflow-hidden h-96 object-cover"
                />
                {/* Tag Pill */}
                <div className="absolute bottom-4 left-4 lg:font backdrop-blur-sm text-white font tracking-tight px-3 py-1 rounded-full">
                  {facility.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Prev/Next Buttons */}
      <div className="lg:flex justify-between align-top lg:items-center my-8 lg:my-10 lg:space-x-4">
        <div className="flex justify-center gap-4 ">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            disabled={!canGoPrev}
            className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-300 transition-colors ${
              canGoPrev
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed"
            }`}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            disabled={!canGoNext}
            className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-gray-300 transition-colors ${
              canGoNext
                ? "text-gray-700 hover:bg-gray-100"
                : "text-gray-300 cursor-not-allowed"
            }`}>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
        <div className="text-center px-4 lg:px-0 lg:text-right">
          <p className="text-gray-600 tracking-tight mt-10 lg:mt-0 max-w-md mx-auto lg:ml-auto">
            Book a court for focused practice, team drills, or private coaching,
            and take your game to the next level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesCarousel;
