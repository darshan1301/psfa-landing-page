"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LEFT_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
];

const RIGHT_BUTTON = { label: "Book Your Ground", href: "/contact" };

// Desktop drop‐in variants
const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 4,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const logoVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 4 + 0.1 * LEFT_NAV_ITEMS.length, // 1 + 0.3 = 1.3s
    },
  },
};

const buttonVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 4 + 0.1 * (LEFT_NAV_ITEMS.length + 1), // 1 + 0.4 = 1.4s
    },
  },
};

// Mobile menu variants
const mobileListVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-6 py-4 md:px-20 md:py-6 flex items-center justify-between">
      {/* ─────────────── Desktop Left Nav ─────────────── */}
      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="hidden md:flex space-x-8">
        {LEFT_NAV_ITEMS.map((item) => (
          <motion.li key={item.href} variants={itemVariants}>
            <Link
              href={item.href}
              className="text-white font-light text-lg hover:text-gray-200 transition-colors duration-200">
              {item.label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* ─────────────── Logo (Center for desktop, left for mobile) ─────────────── */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        className="text-2xl tracking-wider font-medium uppercase text-white">
        <Link href="/">Pratigrham</Link>
      </motion.div>

      {/* ─────────────── Desktop Right Button & Mobile Hamburger ─────────────── */}
      <div className="flex items-center space-x-4">
        {/* Desktop Button */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="hidden md:block">
          <Link href={RIGHT_BUTTON.href}>
            <button
              className="
             bg-gradient-to-r from-black to-gray-800
              text-white 
              font-light 
              px-6 py-3 
              rounded-full 
              flex items-center 
              space-x-2
              hover:bg-gray-700 
              transition-colors 
              duration-200
            ">
              <span>{RIGHT_BUTTON.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-white hover:text-gray-200 transition-colors duration-200">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ─────────────── Mobile Menu ─────────────── */}
      {menuOpen && (
        <motion.div
          variants={mobileListVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md md:hidden">
          <motion.ul className="flex flex-col items-center space-y-6 py-6">
            {LEFT_NAV_ITEMS.map((item) => (
              <motion.li key={item.href} variants={mobileItemVariants}>
                <Link
                  href={item.href}
                  className="text-white font-medium text-xl hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </motion.li>
            ))}

            <motion.li variants={mobileItemVariants}>
              <Link href={RIGHT_BUTTON.href}>
                <button
                  className="
                    bg-white 
                    text-slate-800 
                    font-medium 
                    px-6 py-3 
                    rounded-full 
                    flex items-center 
                    space-x-2
                    hover:bg-gray-100 
                    transition-colors 
                    duration-200
                  "
                  onClick={() => setMenuOpen(false)}>
                  <span>{RIGHT_BUTTON.label}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
      )}
    </nav>
  );
}
