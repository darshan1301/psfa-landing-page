"use client";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const LEFT_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
];

const RIGHT_BUTTON = { label: "Contact Us", href: "/contact" };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show navbar after delay based on screen size
  useEffect(() => {
    const showNavbar = () => {
      const delay = window.innerWidth >= 1024 ? 4000 : 3000; // 4s for desktop, 3s for mobile/tablet
      setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    showNavbar();

    // Handle window resize
    const handleResize = () => {
      if (!isVisible) {
        showNavbar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isVisible]);

  return (
    <nav
      className={`fixed lg:top-4 top-0 items-center left-0 w-full z-50  transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
      <div
        className={`${
          menuOpen ? "rounded-3xl" : "rounded-full"
        } max-w-5xl lg:rounded-full  bg-black/20 border-b border-white/10 mx-2 mt-2 lg:mx-auto backdrop-blur-lg px-4 sm:px-6 lg:px-8`}>
        <div className="flex items-center justify-between h-14 lg:h-18">
          {/* Desktop Left Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {LEFT_NAV_ITEMS.map((item, index) => (
              <div
                key={item.href}
                className={`transition-all duration-600 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[-20px]"
                }`}
                style={{
                  transitionDelay: isVisible ? `${0.2 + 0.1 * index}s` : "0s",
                }}>
                <Link
                  href={item.href}
                  className="relative text-white/90 hover:text-white font-light tracking-wide transition-all duration-300 group">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            ))}
          </div>

          {/* Logo */}
          <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
            <div
              className={`transition-all duration-600 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-20px]"
              }`}
              style={{
                transitionDelay: isVisible
                  ? `${0.2 + 0.1 * LEFT_NAV_ITEMS.length}s`
                  : "0s",
              }}>
              <Link
                href="/"
                className="text-xl lg:text-2xl font-semibold text-white uppercase hover:text-gray-200 transition-colors duration-300">
                Pratigrham
              </Link>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <div
              className={`transition-all duration-600 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-20px]"
              }`}
              style={{
                transitionDelay: isVisible
                  ? `${0.2 + 0.1 * (LEFT_NAV_ITEMS.length + 1)}s`
                  : "0s",
              }}>
              <Link href={RIGHT_BUTTON.href}>
                <button className="group relative overflow-hidden bg-gradient-to-r from-black to-gray-700 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                  <span className="relative z-10 flex items-center space-x-2">
                    <span className="text-sm tracking-wide">
                      {RIGHT_BUTTON.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden">
            <div
              className={`transition-all duration-600 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-20px]"
              }`}
              style={{ transitionDelay: isVisible ? "0.2s" : "0s" }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative p-2\ text-white hover:text-blue-300 transition-colors duration-200"
                aria-label="Toggle menu">
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute top-0 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}></span>
                  <span
                    className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? "opacity-0" : ""
                    }`}></span>
                  <span
                    className={`absolute top-5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-100 ease-in-out ${
            menuOpen
              ? "max-h-screen opacity-100 py-2 pb-4"
              : "max-h-0 opacity-0"
          }`}>
          <div className="px-4 py-6 backdrop-blur-xl border-t border-white/10 rounded-b-2xl">
            <div className="flex flex-col space-y-6">
              {LEFT_NAV_ITEMS.map((item, index) => (
                <div
                  key={item.href}
                  className={`transform transition-all duration-500 ${
                    menuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${index * 0.1}s` : "0s",
                  }}>
                  <Link
                    href={item.href}
                    className="block text-white/90 hover:text-white font-medium text-lg transition-colors duration-200 hover:translate-x-2 transform"
                    onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </div>
              ))}

              <div
                className={`transform transition-all duration-500 pt-4 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen
                    ? `${LEFT_NAV_ITEMS.length * 0.1}s`
                    : "0s",
                }}>
                <a href={RIGHT_BUTTON.href}>
                  <button
                    className="w-full bg-gradient-to-r from-black to-gray-700 text-white font-medium px-6 py-4 rounded-2xl flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => setMenuOpen(false)}>
                    <span className="text-base">{RIGHT_BUTTON.label}</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
}
