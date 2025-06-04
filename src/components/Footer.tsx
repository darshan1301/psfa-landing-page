// components/Footer.tsx
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#a4def7] m-4 rounded-2xl text-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3">
        {/* Left Section: Company Slogan */}
        <div className=" mb-10 md:mb-0">
          <p className="text-4xl font-normal tracking-tigh">
            Lorem Ipsum Is Simply Dummy Text Of The Printing and Typesetting
            Industry.
          </p>
          <button className="my-6 bg-white px-4 py-1  font-normal  rounded-full">
            {" "}
            Some Button
          </button>
        </div>
        <div></div>

        {/* Right Section: 3 Columns of Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className=" tracking-tighter">
            <h3 className="text-2xl font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className=" tracking-tighter">
            <h3 className="text-2xl font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/programs/football"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sports Academy
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/cricket"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sports Space
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/wellness"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sports Infra
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/equipment"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sportskart
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className=" tracking-tighter">
            <h3 className="text-2xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Pratigrham Sports. All rights
        reserved.
      </div>
    </footer>
  );
}
