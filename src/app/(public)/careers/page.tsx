"use client";

import React, { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";

interface ApplicationData {
  fullName: string;
  email: string;
  phone?: string;
  position: string;
  experience: string;
  coverLetter: string;
  portfolio?: string;
}

interface JobPosition {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const jobPositions: JobPosition[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / San Francisco",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Join our engineering team to build cutting-edge web applications using React, TypeScript, and modern web technologies.",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Modern CSS frameworks",
      "Git workflow",
    ],
    benefits: [
      "Competitive salary",
      "Health insurance",
      "Flexible hours",
      "Learning budget",
    ],
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "New York / Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Lead product strategy and roadmap for our core platform, working closely with engineering and design teams.",
    requirements: [
      "Product management experience",
      "Analytics tools knowledge",
      "Agile methodologies",
      "Strong communication",
    ],
    benefits: [
      "Stock options",
      "Health & dental",
      "Unlimited PTO",
      "Career development",
    ],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    department: "Design",
    location: "Los Angeles / Remote",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Create intuitive and beautiful user experiences that delight our customers and drive business growth.",
    requirements: [
      "Design system experience",
      "Figma expertise",
      "User research skills",
      "Prototyping abilities",
    ],
    benefits: [
      "Creative freedom",
      "Latest design tools",
      "Conference attendance",
      "Wellness programs",
    ],
  },
];

export default function CareersPage(): JSX.Element {
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationData>();

  const onSubmit = async (data: ApplicationData): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Application submitted:", data);
    alert("Application submitted successfully! We'll be in touch soon.");
    reset();
    setShowApplication(false);
    setSelectedJob(null);
  };

  const handleApplyClick = (job: JobPosition) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative pt-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://my-s3-storage-prathmesh-nagpur.s3.ap-south-1.amazonaws.com/psfa/austin-distel-_S7-KX8geL0-unsplash+(1)+(1).jpg')",
      }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showApplication ? (
          // Main Careers Content
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[calc(100vh-8rem)]">
            {/* Left Section - Company Info */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6 leading-tight">
                  Join our team
                </h1>
                <p className="text-xl tracking-tight text-white/90 leading-relaxed max-w-lg">
                  We&apos;re building the future of sports technology. Join
                  passionate professionals who are changing how teams connect,
                  compete, and grow.
                </p>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                      <Users className="w-5 h-5 text-blue-300" />
                    </div>
                    <h3 className="font-semibold text-white">Team Size</h3>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">50+</div>
                  <div className="text-sm text-white/80">
                    Talented professionals
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-400/30">
                      <TrendingUp className="w-5 h-5 text-green-300" />
                    </div>
                    <h3 className="font-semibold text-white">Growth Rate</h3>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">200%</div>
                  <div className="text-sm text-white/80">Year over year</div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                      <Award className="w-5 h-5 text-purple-300" />
                    </div>
                    <h3 className="font-semibold text-white">Company Values</h3>
                  </div>
                  <div className="space-y-1 text-sm text-white/80">
                    <p>Innovation • Teamwork • Excellence</p>
                    <p>Work-life balance • Continuous learning</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Job Listings */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Open Positions
                </h2>

                <div className="space-y-6">
                  {jobPositions.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Briefcase className="w-4 h-4" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mt-2 sm:mt-0">
                          {job.experience}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {job.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2 text-sm">
                          Key Requirements:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 3).map((req, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {req}
                            </span>
                          ))}
                          {job.requirements.length > 3 && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              +{job.requirements.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => handleApplyClick(job)}
                        className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 text-sm">
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Application Form
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[calc(100vh-8rem)]">
            {/* Left Section - Job Details */}
            <div className="flex flex-col justify-center space-y-6">
              <button
                onClick={() => setShowApplication(false)}
                className="self-start text-white/80 hover:text-white transition-colors text-sm flex items-center space-x-2">
                <span>←</span>
                <span>Back to all positions</span>
              </button>

              {selectedJob && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedJob.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm text-white/80 mb-6">
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{selectedJob.department}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedJob.type}</span>
                    </div>
                  </div>

                  <p className="text-white/90 mb-6 leading-relaxed">
                    {selectedJob.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-white mb-3">
                        Requirements:
                      </h3>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req, index) => (
                          <li
                            key={index}
                            className="text-white/80 text-sm flex items-start space-x-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-white mb-3">
                        Benefits:
                      </h3>
                      <ul className="space-y-2">
                        {selectedJob.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="text-white/80 text-sm flex items-start space-x-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Section - Application Form */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-2xl border border-white/20">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Apply for this position
                </h2>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Full name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.fullName
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone", {
                        pattern: {
                          value: /^[\+]?[1-9][\d]{0,15}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      {...register("experience", {
                        required: "Experience level is required",
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.experience
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-gray-900`}>
                      <option value="">Select experience level</option>
                      <option value="0-1">0-1 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="4-5">4-5 years</option>
                      <option value="6+">6+ years</option>
                    </select>
                    {errors.experience && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.experience.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="portfolio"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio/Resume Link
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="portfolio"
                      type="url"
                      {...register("portfolio", {
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: "Please enter a valid URL",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.portfolio
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500`}
                      placeholder="https://yourportfolio.com"
                    />
                    {errors.portfolio && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.portfolio.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="coverLetter"
                      className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <textarea
                      id="coverLetter"
                      rows={4}
                      {...register("coverLetter", {
                        required: "Cover letter is required",
                        minLength: {
                          value: 50,
                          message:
                            "Cover letter must be at least 50 characters",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.coverLetter
                          ? "border-red-300 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      } focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 resize-none`}
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    />
                    {errors.coverLetter && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.coverLetter.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    {isSubmitting
                      ? "Submitting Application..."
                      : "Submit Application"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
