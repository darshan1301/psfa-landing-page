"use client";
import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const LEFT_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Sports For All", href: "/services/sports-for-all" },
      { label: "Sports Academy", href: "/services/sports-academy" },
      { label: "Sports Space", href: "/services/sportsspace" },
      { label: "Sports Infra", href: "/services/sports-infra" },
      { label: "Sportskart", href: "/services/sportskart" },
    ],
  },
];

const RIGHT_BUTTON = { label: "Contact Us", href: "/contact" };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // desktop dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // mobile "Verticals" accordion state
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const showNavbar = () => {
      const delay = window.innerWidth >= 1024 ? 3000 : 2000;
      const t = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(t);
    };
    const cleanup = showNavbar();

    const handleResize = () => {
      if (!isVisible) showNavbar();
    };
    window.addEventListener("resize", handleResize);

    // Escape closes desktop dropdown/hamburger
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMenuOpen(false);
        setMobileDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    // Click outside to close dropdown
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      cleanup?.();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible, dropdownOpen]);

  const closeMenus = useCallback(() => {
    setDropdownOpen(false);
    setMenuOpen(false);
    setMobileDropdownOpen(false);
  }, []);

  return (
    <nav
      className={`fixed lg:top-4 top-0 items-center left-0 w-full z-50 transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
      <div
        className={`${
          menuOpen ? "rounded-3xl" : "rounded-full"
        } max-w-5xl lg:rounded-full bg-black/20 border-b border-white/10 mx-2 mt-2 lg:mx-auto backdrop-blur-lg px-4 sm:px-6 lg:px-8`}>
        <div className="flex items-center justify-between h-14 lg:h-18">
          {/* Desktop Left Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {LEFT_NAV_ITEMS.map((item, index) => {
              const baseWrapper =
                "relative transition-all duration-600 ease-out";
              const anim = isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5";

              if (!item.dropdown) {
                return (
                  <div
                    key={item.href}
                    className={`${baseWrapper} ${anim}`}
                    style={{
                      transitionDelay: isVisible
                        ? `${0.2 + 0.1 * index}s`
                        : "0s",
                    }}>
                    <Link
                      href={item.href}
                      className="relative text-white/90 hover:text-white font-light tracking-wide transition-all duration-300 group">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </div>
                );
              }

              // Verticals with dropdown (desktop)
              return (
                <div
                  key={item.href}
                  className={`${baseWrapper} ${anim} dropdown-container`}
                  style={{
                    transitionDelay: isVisible ? `${0.2 + 0.1 * index}s` : "0s",
                  }}>
                  <div className="relative">
                    <button
                      className="relative flex items-center text-white/90 hover:text-white font-light tracking-wide transition-all duration-300 group py-2"
                      aria-haspopup="menu"
                      aria-expanded={dropdownOpen}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onClick={() => setDropdownOpen((s) => !s)}>
                      {item.label}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                    </button>

                    {/* Enhanced Dropdown panel */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 mt-2 w-72 transition-all duration-300 ease-out ${
                        dropdownOpen
                          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                          : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                      }`}
                      onMouseEnter={() => setDropdownOpen(true)}
                      onMouseLeave={() => setDropdownOpen(false)}
                      role="menu">
                      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-1">
                              Our Verticals
                            </h3>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                          </div>

                          <ul className="space-y-1">
                            {item.dropdown.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className="group relative block px-4 py-3 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:bg-white/5 hover:backdrop-blur-sm"
                                  onClick={closeMenus}
                                  role="menuitem">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium tracking-wide">
                                      {sub.label}
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                                  </div>
                                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Logo (unchanged) */}
          <div className="flex-1 lg:hidden flex justify-start lg:justify-center">
            <div
              className={`transition-all duration-600 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5"
              }`}
              style={{
                transitionDelay: isVisible
                  ? `${0.2 + 0.1 * LEFT_NAV_ITEMS.length}s`
                  : "0s",
              }}>
              <Link
                href="/"
                className="text-xl lg:text-2xl font-semibold text-white uppercase hover:text-gray-200 transition-colors duration-300"
                onClick={closeMenus}>
                <Image
                  src={"/pgm-logo.png"}
                  height={100}
                  width={100}
                  alt="Pratigrham Logo"
                  className="w-fit h-12"
                />
              </Link>
            </div>
          </div>

          {/* Desktop CTA (unchanged) */}
          <div className="hidden lg:flex items-center">
            <div
              className={`transition-all duration-600 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5"
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
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-blue-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile/Tablet Menu Button (unchanged) */}
          <div className="lg:hidden">
            <div
              className={`transition-all duration-600 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5"
              }`}
              style={{ transitionDelay: isVisible ? "0.2s" : "0s" }}>
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="relative p-2 text-white hover:text-blue-300 transition-colors duration-200"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}>
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute top-0 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}
                  />
                  <span
                    className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute top-5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
                  />
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
              {LEFT_NAV_ITEMS.map((item, index) => {
                const isVerticals = Boolean(item.dropdown);
                return (
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
                    {!isVerticals ? (
                      <Link
                        href={item.href}
                        className="block text-white/90 hover:text-white font-medium text-lg transition-colors duration-200 hover:translate-x-2 transform"
                        onClick={closeMenus}>
                        {item.label}
                      </Link>
                    ) : (
                      <div>
                        <button
                          className="w-full flex items-center justify-between text-white/90 hover:text-white font-medium text-lg transition-colors duration-200"
                          onClick={() => setMobileDropdownOpen((s) => !s)}
                          aria-expanded={mobileDropdownOpen}
                          aria-controls="mobile-verticals">
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              mobileDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Mobile accordion panel */}
                        <div
                          id="mobile-verticals"
                          className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                            mobileDropdownOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}>
                          <ul className="mt-3 ml-3 space-y-3 border-l border-white/10 pl-4">
                            {item.dropdown!.map((sub) => (
                              <li key={sub.href}>
                                <Link
                                  href={sub.href}
                                  className="block text-white/80 hover:text-white text-base"
                                  onClick={closeMenus}>
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile CTA (unchanged) */}
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
                <Link href={RIGHT_BUTTON.href}>
                  <button
                    className="w-full bg-gradient-to-r from-black to-gray-700 text-white font-medium px-6 py-4 rounded-2xl flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02]"
                    onClick={closeMenus}>
                    <span className="text-base">{RIGHT_BUTTON.label}</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </Link>
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
