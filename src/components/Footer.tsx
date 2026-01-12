import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#a4def7] m-4 rounded-2xl text-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3">
        {/* Left Section: Company Slogan */}

        <div className=" items-center mb-10 md:mb-0">
          <Image
            className="pb-8"
            src={"/footer-logo.png"}
            height={100}
            width={100}
            alt="pratigrham logo"
          />
          <p className="text-lg font-normal tracking-tigh">
            <p className="text-lg font-normal tracking-tight">
              Pratigrham Sports for All Pvt. Ltd <br />
              3rd Floor, Plot No. 5, RPTS Rd, <br />
              behind Jeril Lawn, Kotwal Nagar, <br />
              Pratap Nagar, Nagpur, Maharashtra 440022
            </p>
          </p>
          {/* <button className="my-6 bg-white px-4 py-1  font-normal  rounded-full">
            Some Button
          </button> */}
        </div>
        <div className="hidden md:block"></div>

        {/* Right Section: 3 Columns of Links */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8">
          <div></div>
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
                  href="/about/#our-team"
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
            <h3 className="text-2xl font-semibold mb-4">Verticals</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/sports-for-all"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sports For All
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sports-academy"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sports Academy
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sportsspace"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sports Space
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sports-infra"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sports Infra
                </Link>
              </li>
              <li>
                <Link
                  href="/services/sportskart"
                  className="text-base hover:underline hover:text-gray-700 transition-colors duration-200">
                  Sportskart
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
