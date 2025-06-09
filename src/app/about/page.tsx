"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Trophy,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  image: string;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  bio: string;
  experience: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    year: "2018",
    title: "Foundation",
    description:
      "Pratigrham Sports Academy was founded with a vision to create world-class sports facilities and training programs.",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/y316eyzrdsvig3mpskzb",
  },
  {
    id: 2,
    year: "2020",
    title: "Expansion",
    description:
      "Opened our second facility with state-of-the-art indoor courts and professional training equipment.",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/zgobehvpmmgyepbmbol3",
  },
  {
    id: 3,
    year: "2022",
    title: "Recognition",
    description:
      "Received the 'Excellence in Sports Training' award and certified as a premier sports academy.",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    year: "2024",
    title: "Innovation",
    description:
      "Launched our digital training platform and expanded to serve over 1000+ athletes annually.",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/f_auto,q_auto/v1/psfa-landing-page/gm1sbsufzwiv4offzu9k",
  },
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Founder & Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    bio: "Former national-level athlete with 15+ years in sports management",
    experience: "15+ Years",
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Head of Training",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop",
    bio: "Certified sports trainer specializing in youth development programs",
    experience: "12+ Years",
  },
  {
    id: 3,
    name: "Arjun Singh",
    position: "Facilities Manager",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1974&auto=format&fit=crop",
    bio: "Expert in sports infrastructure and facility management",
    experience: "10+ Years",
  },
  {
    id: 4,
    name: "Kavita Patel",
    position: "Nutrition Specialist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1974&auto=format&fit=crop",
    bio: "Sports nutritionist helping athletes achieve peak performance",
    experience: "8+ Years",
  },
];

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
};

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

export default function AboutUsSection() {
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  // Navigation handlers
  const nextMilestone = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentMilestone((prev) => (prev + 1) % milestones.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevMilestone = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentMilestone(
        (prev) => (prev - 1 + milestones.length) % milestones.length
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const nextTeamMember = () => {
    setCurrentTeamMember((prev) => (prev + 1) % teamMembers.length);
  };

  const prevTeamMember = () => {
    setCurrentTeamMember(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  return (
    <section ref={sectionRef} className="py-1 mt-10 lg:mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto sm:px-4 ">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16 px-0"
          variants={containerVariants}
          initial="initial"
          animate="animate">
          <div className="flex items-center mt-14 justify-center mb-8">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
              <button className="px-4 py-1 text-sm font-medium text-gray-600 border border-gray-300 rounded-full">
                About Us
              </button>
              <button className="px-4 py-1 text-sm font-medium text-white bg-black rounded-full">
                Our Story & Values
              </button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
            Building Champions,
            <br />
            <span className="text-blue-600">Creating Futures</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At Pratigrham Sports Academy, we believe in nurturing talent,
            building character, and creating champions both on and off the
            field.
          </p>
        </motion.div>

        {/* Company History & Vision/Mission */}
        <div className="grid px-4 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* History */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            variants={containerVariants}
            initial="initial"
            animate="animate">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="lg:font-normal tracking-tighter text-2xl lg:text-3xl text-gray-900">
                Our History
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Founded in 2018, Pratigrham Sports Academy began as a small
              community initiative to provide quality sports training. Today, we
              stand as a premier sports facility serving over 1000+ athletes
              annually.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">6+</div>
              <div className="text-sm text-gray-600">Years of Excellence</div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            variants={containerVariants}
            initial="initial"
            animate="animate">
            <div className="flex items-center mb-6">
              <Eye className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="lg:font-normal tracking-tighter text-2xl lg:text-3xl text-gray-900">
                Our Vision
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              To be India&apos;s leading sports academy, recognized for
              developing world-class athletes while fostering values of
              discipline, teamwork, and excellence.
            </p>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">
                1000+
              </div>
              <div className="text-sm text-gray-600">Athletes Trained</div>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 md:col-span-2 lg:col-span-1"
            variants={containerVariants}
            initial="initial"
            animate="animate">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="lg:font-normal tracking-tighter text-2xl lg:text-3xl text-gray-900">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              To provide comprehensive sports training, state-of-the-art
              facilities, and holistic development programs that empower
              athletes to achieve their full potential.
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Awards & Recognition</div>
            </div>
          </motion.div>
        </div>

        {/* Milestones Section */}
        <motion.div
          className="mb-20 bg-white md:rounded-2xl lg:rounded-4xl px-4 py-8 lg:p-8"
          variants={containerVariants}
          initial="initial"
          animate="animate">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Trophy className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-gray-900">
                Our Journey
              </h2>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Key milestones that shaped our path to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Milestone Image */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={milestones[currentMilestone].id}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={milestones[currentMilestone].image}
                    alt={milestones[currentMilestone].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-white font-medium">
                        {milestones[currentMilestone].year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Milestone Content */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={milestones[currentMilestone].id}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit">
                  <h3 className="lg:font-normal tracking-tighter text-2xl lg:text-3xl text-gray-900 mb-4">
                    {milestones[currentMilestone].title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {milestones[currentMilestone].description}
                  </p>
                  <div className="text-4xl font-bold text-blue-600">
                    {milestones[currentMilestone].year}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6">
                <div className="flex space-x-2">
                  {milestones.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMilestone(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMilestone
                          ? "bg-gray-800 w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={prevMilestone}
                    disabled={isAnimating}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 border border-gray-200"
                    aria-label="Previous milestone">
                    <ChevronLeft className="w-4 h-4 text-gray-800" />
                  </button>
                  <button
                    onClick={nextMilestone}
                    disabled={isAnimating}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 border border-gray-200"
                    aria-label="Next milestone">
                    <ChevronRight className="w-4 h-4 text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-20 px-4"
          variants={containerVariants}
          initial="initial"
          animate="animate">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-gray-900">
                Meet Our Team
              </h2>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Team Member Image */}
            <div className="md:order-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={teamMembers[currentTeamMember].id}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={teamMembers[currentTeamMember].image}
                    alt={teamMembers[currentTeamMember].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-white text-sm">
                        {teamMembers[currentTeamMember].experience}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Previous Team Member Thumbnail */}
            <div className="md:order-1 flex justify-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={
                    teamMembers[
                      (currentTeamMember - 1 + teamMembers.length) %
                        teamMembers.length
                    ].image
                  }
                  alt="Previous member"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Team Member Info */}
            <div className="md:order-3 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={teamMembers[currentTeamMember].id}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit">
                  <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">
                    {teamMembers[currentTeamMember].name}
                  </h3>
                  <p className="text-lg text-blue-600 font-medium mb-4">
                    {teamMembers[currentTeamMember].position}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {teamMembers[currentTeamMember].bio}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Team Navigation */}
              <div className="flex items-center justify-between pt-6">
                <div className="flex space-x-2">
                  {teamMembers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTeamMember(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTeamMember
                          ? "bg-gray-800 w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={prevTeamMember}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                    aria-label="Previous team member">
                    <ChevronLeft className="w-4 h-4 text-gray-800" />
                  </button>
                  <button
                    onClick={nextTeamMember}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-200 border border-gray-200"
                    aria-label="Next team member">
                    <ChevronRight className="w-4 h-4 text-gray-800" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-br mx-4 lg:mx-0 from-gray-900 to-black shadow-md rounded-3xl p-8 md:p-12"
          variants={containerVariants}
          initial="initial"
          animate="animate">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Become part of the Pratigrham family and start your journey towards
            excellence in sports and life.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center bg-gradient-to-r from-white to-gray-300 text-black font-light px-8 py-4 rounded-full hover:from-gray-100 hover:to-white transition-all duration-200 shadow-lg text-lg">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
