"use client";

import React, { JSX } from "react";
import { useForm } from "react-hook-form";
import { Mail, MapPinned } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export default function ContactForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData): Promise<void> => {
    // Simulate API call
    // console.log("Form submitted:", data);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Enquiry submitted successfully:", result);
        alert("Message sent successfully!");
        reset();
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative pt-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[calc(100vh-8rem)]">
          {/* Left Section - Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6 leading-tight">
                Contact us
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                We are always looking for ways to improve our products and
                services. Contact us and let us know how we can help you.
              </p>
            </div>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-400/30">
                    <Mail className="w-5 h-5 text-blue-300" />
                  </div>
                  <h3 className="font-normal text-lg tracking-tight text-white">
                    Email Support
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-white/80">
                  <p>info@pratigrham.com</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-400/30">
                    <svg
                      className="w-5 h-5 text-green-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-normal text-lg tracking-tight text-white">
                    Phone Support
                  </h3>
                </div>
                <div className="text-sm text-white/80">
                  <p>+919156620658</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-400/30">
                    <MapPinned className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="font-normal text-lg tracking-tight text-white">
                    Find Us At:
                  </h3>
                </div>
                <div className="space-y-1 text-sm text-white/80">
                  <p>
                    Pratigrham Sports for All Pvt. Ltd Ground Floor, Ankit
                    Apartment, Atrey Layout, Pratap Nagar, Nagpur, Maharashtra
                    440020
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="flex flex-col justify-center">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-2xl border border-white/20">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", {
                      required: "Full name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name.message}
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
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.message
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300 focus:ring-blue-500"
                    } focus:ring-2 focus:border-transparent transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 resize-none`}
                    placeholder="Type your message here"
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
