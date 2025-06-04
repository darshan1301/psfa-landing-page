"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { JSX, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  tag: string;
  bgColor: string;
  features: string[];
  capacity?: string;
  availability?: string;
  image?: string;
}

const serviceCards: ServiceCard[] = [
  {
    id: 1,
    title: "Sports Academy",
    description: "Versatile space for a wide range of activities",
    shortDescription:
      "Multi-purpose outdoor facility with natural turf and professional lighting for various sports and training activities.",
    tag: "Outdoor Area",
    bgColor: "bg-gradient-to-br from-green-400 via-green-500 to-blue-500",
    features: ["Natural Turf", "Pro Lighting", "Multi-Sport"],
    capacity: "50+ Athletes",
    availability: "24/7 Access",
    image: "/serviceCard/pexels-rdne-7187827.jpg",
  },
  {
    id: 2,
    title: "Sports Space",
    description: "Professional indoor futsal court with premium flooring",
    shortDescription:
      "FIFA-standard indoor futsal court with shock-absorbing flooring, perfect for year-round training and matches.",
    tag: "Indoor",
    bgColor: "bg-gradient-to-br from-blue-400 via-blue-500 to-purple-500",
    features: ["FIFA Standard", "Shock Absorption", "Climate Controlled"],
    capacity: "10v10 Games",
    availability: "All Weather",
    image: "/serviceCard/pexels-mason-tuttle-612393380-17299530 (2).jpg",
  },
  {
    id: 3,
    title: "Sports Infra",
    description: "Open field perfect for team training and drills",
    shortDescription:
      "Spacious training facility with marked zones for tactical drills, fitness training, and team practice sessions.",
    tag: "Training",
    bgColor: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-500",
    features: ["Tactical Zones", "Fitness Area", "Team Sessions"],
    capacity: "Full Squad",
    availability: "Day & Night",
    image: "/serviceCard/pexels-drewdempsey-29893638.jpg",
  },
  {
    id: 4,
    title: "Sportskart",
    description: "State-of-the-art equipment for strength training",
    shortDescription:
      "Modern gym with professional-grade equipment, personal training services, and recovery facilities for athletes.",
    tag: "Fitness",
    bgColor: "bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500",
    features: ["Pro Equipment", "Personal Training", "Recovery Zone"],
    capacity: "30 Members",
    availability: "6AM - 11PM",
    image: "/serviceCard/pexels-rodrigo-ortega-2044210904-30864601.jpg",
  },
];

export default function ServicesShowcase(): JSX.Element {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Header animation
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
        );
      }

      // Static image animation
      if (mainCardRef.current) {
        tl.fromTo(
          mainCardRef.current,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
          "-=0.5"
        );
      }

      // Right column cards animation
      if (rightColumnRef.current) {
        const cards = rightColumnRef.current.querySelectorAll(".service-card");
        tl.fromTo(
          cards,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.8"
        );
      }

      // CTA animation
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
          "-=0.4"
        );
      }

      // Scroll-triggered animations for desktop
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          if (window.innerWidth >= 768) {
            gsap.fromTo(
              sectionRef.current?.querySelectorAll(".desktop-animate") || [],
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
              }
            );
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card transition animation for right column
  useEffect(() => {
    if (rightColumnRef.current && isAnimating) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setIsAnimating(false),
        });

        const activeCard =
          rightColumnRef.current?.querySelector(".active-card");
        const infoCard = rightColumnRef.current?.querySelector(".info-card");

        if (activeCard) {
          tl.fromTo(
            activeCard,
            { scale: 0.9, opacity: 0, x: 20 },
            { scale: 1, opacity: 1, x: 0, duration: 0.5, ease: "back.out(1.7)" }
          );
        }

        if (infoCard) {
          tl.fromTo(
            infoCard,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.3"
          );
        }
      }, rightColumnRef);

      return () => ctx.revert();
    }
  }, [currentCard, isAnimating]);

  // Handle card navigation
  const nextCard = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCard((prev) => (prev + 1) % serviceCards.length);
    }
  };

  const prevCard = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentCard(
        (prev) => (prev - 1 + serviceCards.length) % serviceCards.length
      );
    }
  };

  const goToCard = (index: number): void => {
    if (!isAnimating && index !== currentCard) {
      setIsAnimating(true);
      setCurrentCard(index);
    }
  };

  const currentService = serviceCards[currentCard];

  // Hover handlers
  const handleButtonHover = (
    element: HTMLElement,
    isEntering: boolean
  ): void => {
    gsap.to(element, {
      scale: isEntering ? 1.05 : 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleCardHover = (element: HTMLElement, isEntering: boolean): void => {
    gsap.to(element, {
      y: isEntering ? -5 : 0,
      scale: isEntering ? 1.02 : 1,
      boxShadow: isEntering
        ? "0 20px 40px rgba(0,0,0,0.15)"
        : "0 10px 25px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={sectionRef}
      className=" py-8 md:py-16 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-0 h-full">
        {/* ==================== Mobile Layout ==================== */}
        <div className="flex flex-col h-full md:hidden space-y-6">
          {/* 1. Text + CTA (same as desktop’s left column) */}
          <div ref={headerRef} className="px-4 space-y-4">
            <p className="text-gray-700 leading-relaxed text-base">
              From structured school programs to corporate wellness, our
              comprehensive services ensure a seamless experience—whether you’re
              training, competing, or just staying fit.
            </p>

            <div ref={ctaRef} className="w-full">
              <Link href="/">
                <button
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white font-light px-6 py-3 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg text-lg"
                  onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                  onMouseLeave={(e) =>
                    handleButtonHover(e.currentTarget, false)
                  }>
                  Our Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* 2. Static Hero Image (same as desktop’s middle column) */}
          <div className="relative w-full h-100 px-4">
            <div
              className="h-full bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl"
              style={{ backgroundImage: "url('/basketball-a.jpg')" }}
              ref={mainCardRef}>
              {/* Floating Element (mirrors desktop) */}
              <div className="absolute bottom-4 left-4 mx-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-xs">
                  Premium Sports Services
                </span>
              </div>
            </div>
          </div>

          {/* 3. Service Card + Short Description + Navigation (similar to desktop’s right column) */}
          <div className="px-4" ref={rightColumnRef}>
            {/* Service Image Card */}
            <div
              className="active-card z-10 service-card relative rounded-4xl overflow-hidden shadow-xl cursor-pointer border border-white/20 h-80"
              key={currentService.id}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}>
              {/* Next.js Image as background */}
              <Image
                src={currentService.image!}
                alt={currentService.title}
                fill
                className=" object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Title at bottom-left (mirrors desktop style) */}
              <div className="absolute inset-0 flex items-end p-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 max-w-xs w-fit">
                  <h3 className="text-white font-medium tracking-tight">
                    {currentService.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Single Info Card */}
            <div className="info-card bg-white rounded-2xl mt-4 border border-gray-200 p-4">
              <p className="text-gray-700 text-sm">
                {currentService.shortDescription}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-4">
              {/* Card Indicators */}
              <div className="flex space-x-2">
                {serviceCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCard(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentCard
                        ? "bg-gray-800 w-6 h-2"
                        : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex space-x-2">
                <button
                  onClick={prevCard}
                  disabled={isAnimating}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 border border-gray-200"
                  aria-label="Previous"
                  onMouseEnter={(e) =>
                    !isAnimating && handleButtonHover(e.currentTarget, true)
                  }
                  onMouseLeave={(e) =>
                    !isAnimating && handleButtonHover(e.currentTarget, false)
                  }>
                  <ArrowLeft className="w-3 h-3 text-gray-800" />
                </button>

                <button
                  onClick={nextCard}
                  disabled={isAnimating}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 border border-gray-200"
                  aria-label="Next"
                  onMouseEnter={(e) =>
                    !isAnimating && handleButtonHover(e.currentTarget, true)
                  }
                  onMouseLeave={(e) =>
                    !isAnimating && handleButtonHover(e.currentTarget, false)
                  }>
                  <ArrowRight className="w-3 h-3 text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== Desktop Layout - 3 Columns ==================== */}
        <div className="hidden md:grid md:grid-cols-3 my-8 gap-8 items-start h-full">
          {/* Column 1: Text Content */}
          <div
            className="space-y-6 lg:h-max flex flex-col justify-between desktop-animate"
            ref={headerRef}>
            <p className="text-black px-4 leading-tight text-base lg:font-normal tracking-tighter lg:text-3xl">
              From structured school programs to corporate wellness, our
              comprehensive services ensure a seamless experience—whether you’re
              training, competing, or just staying fit.
            </p>

            <div ref={ctaRef}>
              <Link href="/">
                <button
                  className="inline-flex items-center lg:mt-14 bg-gradient-to-r from-black to-gray-800 text-white font-light px-8 py-4 rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-200 shadow-lg text-lg"
                  onMouseEnter={(e) => handleButtonHover(e.currentTarget, true)}
                  onMouseLeave={(e) =>
                    handleButtonHover(e.currentTarget, false)
                  }>
                  Our Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Column 2: Static Hero Image */}
          <div className="desktop-animate" ref={mainCardRef}>
            <div
              className="relative h-88 mx-4 lg:h-[500px] bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl"
              style={{ backgroundImage: "url('/basketball-a.jpg')" }}>
              {/* Floating Elements */}
              <div className="absolute bottom-4 mx-4 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span className="text-white">Premium Sports Services</span>
              </div>
            </div>
          </div>

          {/* Column 3: Service Image and Single Info Card */}
          <div
            className="space-y-6 px-6 py-10 desktop-animate"
            ref={rightColumnRef}>
            {/* Service Image Card */}
            <div
              className="active-card service-card relative rounded-4xl overflow-hidden shadow-xl cursor-pointer border border-white/20 h-80"
              key={currentService.id}
              onMouseEnter={(e) => handleCardHover(e.currentTarget, true)}
              onMouseLeave={(e) => handleCardHover(e.currentTarget, false)}>
              {/* Next.js Image as background */}
              <Image
                src={`${currentService.image}`}
                alt={currentService.title}
                fill
                className="-z-10 object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="absolute inset-0 flex items-end p-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 max-w-xs w-fit">
                  <h3 className="text-white font-normal tracking-tight">
                    {currentService.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Single Info Card that changes with the service */}
            <div className="info-card rounded-2xl bg-white border border-gray-200">
              <p className="text-gray-700 p-4">
                {currentService.shortDescription}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              {/* Card Indicators */}
              <div className="flex space-x-2">
                {serviceCards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCard(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCard
                        ? "bg-gray-800 w-6"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex space-x-2">
                <button
                  onClick={prevCard}
                  disabled={isAnimating}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 border border-gray-200"
                  aria-label="Previous"
                  onMouseEnter={(e) =>
                    !isAnimating && handleButtonHover(e.currentTarget, true)
                  }
                  onMouseLeave={(e) =>
                    !isAnimating && handleButtonHover(e.currentTarget, false)
                  }>
                  <ArrowLeft className="w-3 h-3 text-gray-800" />
                </button>

                <button
                  onClick={nextCard}
                  disabled={isAnimating}
                  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 border border-gray-200"
                  aria-label="Next"
                  onMouseEnter={(e) =>
                    !isAnimating && handleButtonHover(e.currentTarget, true)
                  }
                  onMouseLeave={(e) =>
                    !isAnimating && handleButtonHover(e.currentTarget, false)
                  }>
                  <ArrowRight className="w-3 h-3 text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ======================================================== */}
      </div>
    </section>
  );
}
