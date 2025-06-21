"use client";

import { useState } from "react";
import { Eye, EyeOff, UserPlus, Mail, Lock, Key, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch("/api/panel-api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, adminsecret: adminSecret }),
      });

      const data = await res.json();
      console.log(res, data);

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Signup successful! ✅");
      // You might want to redirect or clear form here
    } catch (err) {
      console.error("Signup error:", err);
      alert("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}></div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Main card with glassmorphism effect */}
          <div className="bg-black/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 space-y-8 transform hover:scale-105 transition-all duration-500 hover:shadow-white/10">
            {/* Header with animated icon */}
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mb-4 transform hover:rotate-12 transition-transform duration-300">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-gray-400 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Register to access admin features
                  <Sparkles className="w-4 h-4" />
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label className=" text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition-all duration-300 group-hover:bg-black/40"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/20 to-gray-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className=" text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-3 pr-12 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition-all duration-300 group-hover:bg-black/40"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-white transition-colors duration-200">
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/20 to-gray-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Admin Secret field */}
              <div className="space-y-2">
                <label className=" text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Admin Secret
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={adminSecret}
                    onChange={(e) => setAdminSecret(e.target.value)}
                    placeholder="Enter admin access key"
                    className="w-full bg-black/30 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-400 focus:border-transparent outline-none transition-all duration-300 group-hover:bg-black/40"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500/20 to-gray-400/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="button"
                onClick={handleRegister}
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-800/25 disabled:opacity-50 disabled:cursor-not-allowed group">
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      Create Account
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>

            {/* Login link */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mx-1">
                Already have an account?{" "}
                <Link
                  href="/panel/login"
                  className="text-gray-300 hover:text-white font-medium hover:underline transition-colors duration-200 transform hover:scale-105 inline-block">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Additional decorative elements */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-4 text-gray-500 text-xs">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-600"></div>
              <span>Secure Registration</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-600"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in-from-top 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
