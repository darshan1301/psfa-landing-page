"use client";

import React, { useState, useRef, useEffect } from "react";
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
import Loading from "@/components/Loader";

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
  role: string;
  image: string;
  description: string;
  yearsOfExperience: number;
}

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
};

export default function AboutUsSection() {
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [currentTeamMember, setCurrentTeamMember] = useState(0);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public-api/about-us");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const { teamMembers, milestones } = await response.json();
        setTeamMembers(teamMembers);
        setMilestones(milestones);
      } catch (error) {
        console.error("Error fetching about us data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (!milestones.length || !teamMembers.length) {
    return (
      <div className="text-center text-gray-500 py-20">
        <p>No data available at the moment.</p>
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="py-1 mt-10 lg:mt-20 overflow-hidden">
      <div className="max-w-screen  sm:px-4 ">
        {/* Hero Section */}
        <motion.div
          className="text-center mx-10 mb-16 px-0"
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
            Empowering Every Player,
            <br />
            <span className="text-blue-600 font-normal">
              Inspiring Every Journey
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Pratigrham Sports For All is a sports management company dedicated
            to promoting fitness and sports for all age groups. Through
            expert-led training programs and inclusive initiatives, we aim to
            make sports accessible, engaging, and a way of life for everyone.
          </p>
        </motion.div>

        {/* Company History & Vision/Mission */}
        <div className="grid px-4 lg:mx-20 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
              Our vision is to make India fit by nurturing world-class athletes
              and instilling values of discipline, teamwork, and excellence.
            </p>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
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
              Pratigrham Sports For All Pvt Ltd is a sports management company
              committed to making sports and fitness a way of life. Through
              structured training programs and expert-led sessions, we aim to
              make sports accessible, inclusive, and impactful for all age
              groups.
            </p>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">10+</div>
              <div className="text-sm text-gray-600">Awards & Recognition</div>
            </div>
          </motion.div>
        </div>

        {/* Milestones Section */}
        <motion.div
          className="mb-20 bg-white lg:mx-24 md:rounded-2xl lg:rounded-4xl px-4 py-8 lg:p-6"
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
                    priority
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
        {teamMembers.length > 0 && (
          <motion.div
            id="our-team"
            className="mb-20 lg:mx-24 px-4"
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
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <span className="text-white text-sm">
                          {teamMembers[currentTeamMember].yearsOfExperience}+
                          years
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Previous Team Member Thumbnail */}
              <div className="md:order-1 hidden md:flex justify-center">
                <div className="w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    priority
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
                      {teamMembers[currentTeamMember].role}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {teamMembers[currentTeamMember].description}
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
        )}

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-br mx-4 lg:mx-0 from-gray-900 to-black shadow-md rounded-3xl p-8 md:p-12"
          variants={containerVariants}
          initial="initial"
          animate="animate">
          <Heart className="w-12 h-12 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-4">
            Interested in collaborating?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Visit our Contact page to connect with our team and kick things off.
          </p>
          <Link href="/contact">
            <button className="inline-flex items-center bg-gradient-to-r from-white to-gray-300 text-black font-light px-8 py-4 rounded-full hover:from-gray-100 hover:to-white transition-all duration-200 shadow-lg text-lg">
              Let&apos;s Connect
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
