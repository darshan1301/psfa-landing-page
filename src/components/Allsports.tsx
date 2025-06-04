// FacilitiesCarousel.tsx
"use client";

import React, { FC, useRef, useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Facility {
  id: string;
  name: string;
  tag: string;
  image: string;
  caption: string;
}

const facilities: Facility[] = [
  {
    id: "1",
    name: "Tennis Court",
    tag: "Tennis court",
    image:
      "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0531%2Fr1500800_1296x518_5%2D2.jpg&w=1320&h=528&scale=crop&cquality=40&location=center&format=jpg",
    caption: "Professionally Designed Courts for Every Skill Level",
  },
  {
    id: "2",
    name: "Swimming Pool",
    tag: "Swimming pool",
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&h=600&fit=crop",
    caption: "Dive In – Relax and Enjoy in Our Pool",
  },
  {
    id: "4",
    name: "Basketball Court",
    tag: "Basketball court",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop",
    caption: "Full-Sized Courts for Play and Competition",
  },
  {
    id: "5",
    name: "Yoga Studio",
    tag: "Yoga studio",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop",
    caption: "Find Your Zen in Our Dedicated Space",
  },
  {
    id: "6",
    name: "Gym Area",
    tag: "Gym area",
    image:
      "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=600&fit=crop",
    caption: "Fully Equipped Gym for Strength & Cardio",
  },
];

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

  const maxIndex = facilities.length - slidesToShow;
  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < maxIndex;

  return (
    <div className="lg:max-w-fit bg-white lg:rounded-4xl lg:mx-4 px-6 py-8 lg:px-16 lg:py-12">
      {/* Header / Search / View All */}
      <div className="flex lg:flex-row justify-between items-center my-14 gap-4">
        <div className="lg:flex w-full lg:w-fit lg:items-center ">
          <span className="px-3 lg:block hidden py-1 border border-gray-300 rounded-full tracking-tight text-gray-900">
            Sports
          </span>
          <h2 className="text-black max-w-fit lg:px-4 leading-tight text-base lg:font-normal tracking-tighter lg:text-3xl">
            Explore Our Facilities
          </h2>
        </div>
        <div className="items-end lg:gap-4 w-full lg:w-auto">
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <Slider ref={sliderRef} {...settings}>
          {facilities.map((facility) => (
            <div key={facility.id} className="px-1">
              <div className="relative rounded-3xl overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-96 object-cover"
                />
                {/* Tag Pill */}
                <div className="absolute top-3 right-4 border border-white font-light backdrop-blur-sm text-white font tracking-tight px-3 py-1 rounded-full">
                  {facility.name}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Prev/Next Buttons */}
      <div className="lg:flex justify-between align-top lg:items-center my-8 lg:my-14 lg:space-x-4">
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
