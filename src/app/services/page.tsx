"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Star,
  Users,
  Target,
  Building,
  ShoppingCart,
  MapPin,
  Check,
  ExternalLink,
  Play,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

// Service interface based on your JSON structure
interface Service {
  name: string;
  tagline: string;
  objective: string;
  key_highlights?: string[];
  impact?: string;
  core_approach?: {
    [key: string]: string;
  };
  specialties?: string[];
  target_group?: string;
  process?: {
    [key: string]: string;
  };
  project_types?: string[];
  product_categories?: string[];
  services?: string[];
  facilities?: string[];
  benefits?: string[];
}

interface ServiceWithImage extends Service {
  id: number;
  image: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  accentColor: string;
}

// Mock API function to simulate server-side data fetching
const fetchServicesData = async (): Promise<ServiceWithImage[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const servicesData: Service[] = [
    {
      name: "Sports For All",
      tagline: "Annual Training Programs in Schools",
      objective:
        "To ensure every child receives professional sports training as part of their school education.",
      key_highlights: [
        "Annual sports curriculum integrated into school timetables",
        "Covers K3 (Kindergarten) to K12 (Senior School)",
        "Emphasis on multi-sport exposure at early stages",
        "Periodic fitness assessments and skill evaluations",
        "Inter-school tournaments and seasonal leagues",
        "Trained and certified coaches assigned per school",
        "Helps schools utilize sports infrastructure efficiently",
      ],
      impact:
        "Empowers students to develop discipline, teamwork, and lifelong fitness habits from an early age.",
    },
    {
      name: "Pratigrham Sports Academy",
      tagline: "Transforming Students Into Athletes",
      objective:
        "To develop competitive athletes through structured, high-performance programs.",
      core_approach: {
        Train:
          "Multi-level coaching (beginner to elite), skill-based drills, goal-oriented plans",
        Coach:
          "Mentorship by professional and certified coaches for each sport",
        Nourish:
          "Personalized nutrition guidance to optimize athlete health and performance",
        Monitor:
          "Analytics-driven fitness tracking, injury prevention, and recovery strategies",
      },
      specialties: [
        "Cricket",
        "Football",
        "Pickleball",
        "Athletics",
        "Badminton",
      ],
      target_group:
        "Ages 6–18 and amateur athletes seeking professional training",
    },
    {
      name: "Sports Infra",
      tagline: "Infrastructure Design, Development, Maintenance & Management",
      objective:
        "To deliver world-class sports and fitness infrastructure across schools, corporates, and urban spaces.",
      process: {
        Design:
          "Site analysis, space planning, layout design based on global sports standards",
        Develop:
          "Turnkey construction of courts, fields, gyms, and indoor/outdoor sports areas",
        Maintain:
          "Annual Maintenance Contracts (AMC), wear-and-tear prevention, safety checks",
        Manage:
          "Smart operations including scheduling, staffing, booking systems",
      },
      project_types: [
        "Turf-based cricket/football arenas",
        "Modular indoor badminton/TT courts",
        "Jogging tracks",
        "Kids playgrounds",
        "Rooftop sports zones",
        "Gymnasiums and wellness centers",
      ],
    },
    {
      name: "SportsKart",
      tagline: "Retail & Wholesale Sports Equipment Platform",
      objective:
        "To make high-quality sports equipment, fitness gear, and apparel accessible to all.",
      product_categories: [
        "Indoor/outdoor sports gear",
        "Training and fitness equipment",
        "Sportswear and uniforms",
        "Nutrition and wellness products",
        "PP tiles and flooring solutions",
      ],
      services: [
        "B2C retail sales (online & offline)",
        "B2B bulk orders for schools, academies, and institutions",
        "Custom equipment sourcing and branding",
        "Equipment installation & after-sales support",
      ],
    },
    {
      name: "Sports Space",
      tagline: "Commercial Sports Venues for All Age Groups",
      objective:
        "To create vibrant community sports hubs for youth, adults, corporates, and families.",
      facilities: [
        "Multi-sport turf grounds",
        "Pay-and-play court rentals",
        "Membership programs",
        "Event and tournament hosting",
        "Corporate wellness sessions",
        "Open gym and fitness zones",
      ],
      benefits: [
        "High-footfall sports activity centers",
        "Safe and accessible spaces for all demographics",
        "Community engagement and revenue generation",
      ],
    },
  ];

  // Enhance with UI data
  const enhancedServices: ServiceWithImage[] = servicesData.map(
    (service, index) => ({
      ...service,
      id: index + 1,
      image: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
      ][index],
      icon: [
        <Users className="w-7 h-7" key="users" />,
        <Star className="w-7 h-7" key="star" />,
        <Building className="w-7 h-7" key="building" />,
        <ShoppingCart className="w-7 h-7" key="cart" />,
        <MapPin className="w-7 h-7" key="map" />,
      ][index],
      color: ["blue", "emerald", "orange", "purple", "pink"][index],
      bgGradient: [
        "from-blue-500/90 via-blue-600/90 to-blue-700/90",
        "from-emerald-500/90 via-emerald-600/90 to-emerald-700/90",
        "from-orange-500/90 via-orange-600/90 to-orange-700/90",
        "from-purple-500/90 via-purple-600/90 to-purple-700/90",
        "from-pink-500/90 via-pink-600/90 to-pink-700/90",
      ][index],
      accentColor: ["#3B82F6", "#10B981", "#F97316", "#8B5CF6", "#EC4899"][
        index
      ],
    })
  );

  return enhancedServices;
};

export default function EnhancedServicesSection() {
  const [services, setServices] = useState<ServiceWithImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeService, setActiveService] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const data = await fetchServicesData();
        setServices(data);
      } catch (err) {
        setError("Failed to load services data");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  useEffect(() => {
    if (!services.length || !servicesRef.current) return;

    const servicesContainer = servicesRef.current;
    const servicePanels = servicesContainer.querySelectorAll(".service-panel");

    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;

      const progress = Math.min(
        Math.max(-rect.top / (rect.height - window.innerHeight), 0),
        1
      );

      setScrollProgress(progress);

      const translateX = progress * (services.length - 1) * window.innerWidth;
      servicesContainer.style.transform = `translateX(-${translateX}px)`;

      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }

      const active = Math.floor(progress * services.length);
      const newActiveService = Math.min(
        Math.max(active, 0),
        services.length - 1
      );

      if (newActiveService !== activeService) {
        setActiveService(newActiveService);
      }

      servicePanels.forEach((panel, i) => {
        const distance = Math.abs(i - active);
        const scale = Math.max(0.96, 1 - distance * 0.02);
        const opacity = Math.max(0.7, 1 - distance * 0.15);
        (panel as HTMLElement).style.transform = `scale(${scale})`;
        (panel as HTMLElement).style.opacity = `${opacity}`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [services, activeService]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <div className="space-y-2">
            <p className="text-slate-700 text-lg font-medium">
              Loading Services
            </p>
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !services.length) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-red-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-red-700 text-lg font-medium">
            {error || "No services available"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative mt-20"
      style={{ height: `${services.length * 100}vh` }}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Enhanced Header */}
        <header className="absolute top-0 w-full z-20 py-8 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    Our Sports Ecosystem
                  </h1>
                </div>
                <p className="text-slate-600 text-lg ml-12">
                  Comprehensive solutions for sports development and
                  infrastructure
                </p>
              </div>

              {/* Service Counter */}
              <div className="hidden md:flex items-center space-x-4 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
                <span className="text-sm font-medium text-slate-600">
                  {String(activeService + 1).padStart(2, "0")} /{" "}
                  {String(services.length).padStart(2, "0")}
                </span>
                <div className="w-8 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
                    style={{
                      width: `${
                        ((activeService + 1) / services.length) * 100
                      }%`,
                    }}></div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-1.5 bg-gradient-to-r from-slate-200 via-blue-200 to-purple-200 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out shadow-sm"
                style={{ width: "0%" }}>
                <div className="absolute right-0 top-0 w-2 h-full bg-white/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Services Container */}
        <div
          ref={servicesRef}
          className="flex transition-transform duration-500 ease-out h-full pt-32">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-panel flex-shrink-0 w-screen px-6 md:px-16 flex items-center justify-center">
              <div className="max-w-6xl w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Content Side */}
                  <div className="space-y-6 order-2 lg:order-1">
                    {/* Icon and Badge */}
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${service.bgGradient} text-white shadow-lg transform hover:scale-105 transition-transform duration-300`}>
                        {service.icon}
                      </div>
                      <div className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full border border-white/30">
                        <span className="text-sm font-medium text-slate-600">
                          Service {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* Title and Tagline */}
                    <div className="space-y-3">
                      <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                        {service.name}
                      </h2>
                      <p className="text-xl text-slate-600 font-medium">
                        {service.tagline}
                      </p>
                    </div>

                    {/* Objective */}
                    <p className="text-slate-700 text-lg leading-relaxed">
                      {service.objective}
                    </p>

                    {/* Key Highlights */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-slate-800 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-blue-600" />
                        Key Highlights
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {(service.key_highlights || [])
                          .slice(0, 4)
                          .map((point, i) => (
                            <div
                              key={i}
                              className="flex items-start space-x-3 group">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mt-0.5">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-slate-700 leading-relaxed group-hover:text-slate-900 transition-colors duration-200">
                                {point}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <span>Learn More</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="order-1 lg:order-2">
                    <div className="relative group">
                      {/* Main Image Container */}
                      <div className="relative overflow-hidden rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
                        <Image
                          src={service.image}
                          alt={service.name}
                          className="w-full h-80 lg:h-96 object-cover"
                        />

                        {/* Overlay */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${service.bgGradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>
                      </div>

                      {/* Floating Card */}
                      <div className="absolute -bottom-6 -right-6 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 transform group-hover:translate-y-1 transition-transform duration-300">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.bgGradient} animate-pulse`}></div>
                          <span className="text-sm font-medium text-slate-700">
                            {service.impact ? "High Impact" : "Premium Service"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-3 border border-white/30 shadow-lg">
            {services.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeService
                    ? `bg-gradient-to-r ${services[activeService].bgGradient} shadow-lg scale-125`
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
                onClick={() => {
                  const targetScroll =
                    (index / services.length) *
                    (sectionRef.current?.scrollHeight || 0);
                  window.scrollTo({ top: targetScroll, behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
