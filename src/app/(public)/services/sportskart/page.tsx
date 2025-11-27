import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  Building2,
  Calculator,
  Users,
  Wrench,
  Shield,
  ShoppingCart,
  FileCheck,
  CreditCard,
  CheckCircle,
  Package,
  Truck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SportsKart - Premium Sports Equipment Online in India | PSFA",
  description:
    "Shop high-quality sports equipment for all levels. Fast delivery across India. Equip yourself with the best gear from SportsKart by PSFA.",
  keywords: [
    "sports gear",
    "sports gear near me",
    "sport gear",
    "gear for sports",
    "academy sports",
    "football gear",
    "outdoor gear near me",
    "gear football equipment",
    "fitness gear",
    "sports gear demo",
    "best sports gear mumbai",
    "gym equipment",
    "sports gear maharashtra",
    "sports shop mumbai",
    "sports shop nagpur",
    "fitness wear maharashtra",
    "in-store sports",
    "team sports gear",
    "sports gear suppliers",
    "high quality sports equipment maharashtra",
    "buy sports gear for schools maharashtra",
    "custom sports event kits maharashtra",
    "bulk sports gear suppliers india",
    "sports gear and apparel bulk purchase",
    "cricket gear maharashtra",
    "football gear bulk order india",
    "badminton gear online",
    "table tennis paddle",
    "home fitness gear bulk",
    "boxing gloves maharashtra",
    "branded table tennis",
  ],
};

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "SS TON Silver Edition EW Bat",
    description:
      "Premium English Willow cricket bat by SS TON – Silver Edition with massive edges and great pickup.",
    price: "₹33,000",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758114701/Products/5-7_1_a8lk2i.jpg", // example from Cricketer Shop :contentReference[oaicite:0]{index=0}
  },
  {
    id: 2,
    name: "SG RSD Xtreme Cricket Bat",
    description:
      "SG RSD Xtreme bat: aggressive profile, mid to low sweet spot, suited for power hitters.",
    price: "₹12,500",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758114754/Products/4_464508c4-4681-460b-8b85-e1784521d874_kbaygi.webp", // placeholder
  },
  {
    id: 3,
    name: "Nivia Dominator 2.0 Football Shoes",
    description:
      "Unisex Nivia Dominator 2.0 – high performance football shoes with durable outsole.",
    price: "₹4,200",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758114829/Products/FB-1157BK_Dominator_2.0_1_opcqeu.webp", // placeholder
  },
  {
    id: 4,
    name: "Adidas Predator Club FG Soccer Cleats",
    description:
      "Adidas Predator Club Firm Ground cleats – classic Predator control, good grip on FG surfaces.",
    price: "₹6,999",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758114944/Products/Predator_Club_Flexible_Ground_Football_Boots_Black_IG7760_01_standard_hover_fkdmlz.avif", // placeholder
  },
  {
    id: 5,
    name: "COSCO Brazil Intl Match Standard Football",
    description:
      "COSCO Brazil – International Match Standard size 5 football, durable stitched panels.",
    price: "₹1,600",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758115014/Products/5bc3mNQ8S8sW2bn59eGT7134IObDqkg4BGhn8l84_mzy4vh.webp", // placeholder
  },
  {
    id: 6,
    name: "Yonex Badminton Racket",
    description:
      "Yonex badminton racket – lightweight, great for control and power.",
    price: "₹3,499",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758115080/Products/yonex_nanoflare_speed_7_black_orange._1_1024x1024_2x_gwafqy.webp", // placeholder
  },
  {
    id: 7,
    name: "SLICE T700 Raw Carbon Fibre Paddle",
    description:
      "Slice T700 Paddle with raw carbon fibre – designed for superior strength and responsiveness.",
    price: "₹7,499",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758115157/Products/51JmMZB-sBL._UF894_1000_QL80__vnyhrt.jpg", // placeholder
  },
  {
    id: 8,
    name: "PowerMax Adjustable Dumbbells Set",
    description:
      "PowerMax Dumbbell set – adjustable, steel/iron plates, suitable for home gym.",
    price: "₹8,549",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758115291/Products/m22157900_d9e6wf.jpg", // from Flipkart for PDS-30C set :contentReference[oaicite:1]{index=1}
  },
  {
    id: 9,
    name: "Wilson Tennis Balls (Can of 3)",
    description:
      "Wilson premium tennis balls – pressurized can of three, ideal for club/play sessions.",
    price: "₹850",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758115345/Products/a730a651-e43b-4db1-b101-897b7c5bb3c3_64528_1_pxaios.avif", // placeholder
  },
  {
    id: 10,
    name: "Nivia Warrior Basketball",
    description:
      "Nivia Warrior basketball – indoor/outdoor resin surface, great grip and rebound.",
    price: "₹1,900",
    image:
      "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758115407/Products/81dDP81aKrL_bapdbe.jpg", // placeholder
  },
];

export default function SportsKartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900 overflow-hidden">
      {/* Subtle background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-32 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 right-1/3 w-80 h-80 bg-gray-100/50 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative text-center mx-6 sm:mx-10 mb-20 px-0 pt-32">
        <div className=" my-6 md:my-4 flex justify-center">
          <Image
            alt="Pratigrham Sports Space Logo"
            width={200}
            height={200}
            src={
              "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758277714/psfa-landing-page/logo/sportskart_npr9x1.png"
            }
          />
        </div>
        <div className="relative z-10">
          <div className="inline-block mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-1 rounded-2xl shadow-lg">
              <div className="bg-white px-6 py-3 rounded-xl">
                <span className="text-sm font-bold text-blue-600">
                  PREMIUM SPORTS EQUIPMENT
                </span>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8">
            <span className="text-gray-900">SportsKart</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-normal text-blue-600">
              Quality Sports Gear. Fast Delivery.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            Discover high-quality sports equipment tailored for athletes of all
            levels. Equip yourself with the best and perform at your peak.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-20 ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-gray-900">Our Top Products</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="bg-white border h-full border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  {/* Product Image */}
                  <div className="relative w-full h-56 mb-6 overflow-hidden rounded-2xl bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {product.description}
                    </p>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between pt-10">
                      {/* <span className="text-2xl font-bold text-gray-900">
                        {product.price}
                      </span> */}
                      <Link
                        href="/contact"
                        className="inline-block absolute bottom-4 mt-4">
                        <button className="bg-blue-600  hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm">
                          Enquire
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Why Shop With Us
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Quality Assured",
                desc: "Only vetted products from top brands",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                ),
                title: "Best Prices",
                desc: "Competitive pricing without compromise",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
                title: "Fast Delivery",
                desc: "Reliable shipping across India",
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Expert Support",
                desc: "Guidance from sports professionals",
              },
            ].map((feature, index) => (
              <div key={index} className="group relative h-full">
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 h-full flex flex-col">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed flex-grow">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ValueAddsSection />
      <HowOrderingWorksSection />
    </div>
  );
}

// Value Adds Section
const ValueAddsSection = () => {
  return (
    <section className=" py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Why Choose{" "}
            <span className="font-medium text-blue-600">SportsKart</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Professional sports procurement made simple — from bulk orders to
            complete installation services.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Institutional Procurement",
              desc: "Streamlined procurement process with dedicated PO handling for schools, clubs & organizations",
              icon: Building2,
              gradient: "from-blue-500 to-indigo-500",
              bgAccent: "from-blue-50 to-blue-100",
            },
            {
              title: "Bulk Discounts & GST",
              desc: "Competitive bulk pricing with proper GST invoicing for business purchases",
              icon: Calculator,
              gradient: "from-green-500 to-emerald-500",
              bgAccent: "from-green-50 to-green-100",
            },
            {
              title: "Event Kits & Apparel",
              desc: "Custom event kits, team uniforms and staff apparel with branding options",
              icon: Users,
              gradient: "from-purple-500 to-violet-500",
              bgAccent: "from-purple-50 to-purple-100",
            },
            {
              title: "On-Site Installation",
              desc: "Professional installation services for equipment and infrastructure items",
              icon: Wrench,
              gradient: "from-orange-500 to-amber-500",
              bgAccent: "from-orange-50 to-orange-100",
            },
            {
              title: "After-Sales Support",
              desc: "Comprehensive warranties and dedicated support for all your purchases",
              icon: Shield,
              gradient: "from-pink-500 to-rose-500",
              bgAccent: "from-pink-50 to-pink-100",
            },
            {
              title: "Fast Delivery",
              desc: "Quick turnaround times with reliable logistics for urgent requirements",
              icon: Truck,
              gradient: "from-yellow-500 to-orange-400",
              bgAccent: "from-yellow-50 to-yellow-100",
            },
          ].map((item, idx) => (
            <div key={idx} className="group relative">
              {/* Background Accent */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.bgAccent} rounded-3xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300 opacity-40`}></div>

              {/* Main Card */}
              <div className="relative h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform group-hover:-translate-y-2">
                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${item.gradient} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-10 h-10" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${item.gradient} rounded-t-full`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How Ordering Works Section
const HowOrderingWorksSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-10 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
          How <span className="font-medium text-blue-600">Ordering</span> Works
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Simple, streamlined process from cart to delivery — designed for both
          individual and bulk orders.
        </p>
      </div>

      <div className="relative">
        {/* Connection Lines */}
        <div className="hidden md:block">
          <div className="absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-300 via-green-300 to-purple-300"></div>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-purple-300 to-orange-300"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              step: "1",
              title: "Add to Cart",
              desc: "Browse products and add to cart, or submit your bulk requirement list for custom quotes",
              icon: ShoppingCart,
              gradient: "from-blue-500 to-blue-600",
              bgAccent: "from-blue-50 to-blue-100",
              options: [
                "Individual Items",
                "Bulk List Upload",
                "Custom Requirements",
              ],
            },
            {
              step: "2",
              title: "Confirm Quote",
              desc: "Review pricing, confirm delivery timelines and finalize your order details",
              icon: FileCheck,
              gradient: "from-green-500 to-green-600",
              bgAccent: "from-green-50 to-green-100",
              options: [
                "Price Confirmation",
                "Delivery Timeline",
                "Order Finalization",
              ],
            },
            {
              step: "3",
              title: "Payment & Delivery",
              desc: "Choose between online payment or Purchase Order route for institutional buyers",
              icon: CreditCard,
              gradient: "from-purple-500 to-purple-600",
              bgAccent: "from-purple-50 to-purple-100",
              options: ["Online Payment", "PO Route", "GST Invoice"],
            },
          ].map((step, idx) => (
            <div key={idx} className="group relative">
              {/* Background Card */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.bgAccent} rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300 opacity-50`}></div>

              {/* Main Card */}
              <div className="relative h-full bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform group-hover:-translate-y-2">
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-gray-100">
                    <span className="text-xl font-bold text-gray-700">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${step.gradient} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-10 h-10" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {step.desc}
                </p>

                {/* Options List */}
                <div className="space-y-2">
                  {step.options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className="flex items-center justify-center text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                      {option}
                    </div>
                  ))}
                </div>

                {/* Bottom Accent */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${step.gradient} rounded-t-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Step - Delivery */}
        <div className="flex justify-center">
          <div className="group relative max-w-md">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300 opacity-50"></div>
            <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform group-hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-gray-100">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>

              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-10 h-10" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                Delivery & Installation
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fast, reliable delivery with optional installation services and
                after-sales support
              </p>

              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-600 mb-6">Ready to place your order?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Browse Products
          </button> */}
          <Link
            href={"/contact"}
            className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300">
            Submit Bulk Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
};
