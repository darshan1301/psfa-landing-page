import React from "react";
import Image from "next/image";
import Link from "next/link";

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
    name: "Professional Football",
    description: "Premium-grade football for training and matches.",
    price: "₹1,200",
    image: "https://source.unsplash.com/featured/400x300/?football",
  },
  {
    id: 2,
    name: "Cricket Bat",
    description: "Lightweight willow bat for powerful shots.",
    price: "₹2,500",
    image: "https://source.unsplash.com/featured/400x300/?cricket-bat",
  },
  {
    id: 3,
    name: "Badminton Racket",
    description: "Carbon fiber racket with excellent shuttle control.",
    price: "₹1,800",
    image: "https://source.unsplash.com/featured/400x300/?badminton-racket",
  },
  {
    id: 4,
    name: "Yoga & Pilates Mat",
    description: "Non-slip mat for yoga and floor exercises.",
    price: "₹800",
    image: "https://source.unsplash.com/featured/400x300/?yoga-mat",
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
              Gear Up for Greatness
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            Discover high-quality sports equipment tailored for athletes of all
            levels. Equip yourself with the best and perform at your peak.
          </p>

          {/* Hero CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <span className="relative z-10">Shop Now</span>
            </button>
            <button className="px-8 py-4 border-2 border-blue-600 rounded-2xl font-semibold text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-105">
              View Catalog
            </button>
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

      {/* Products Grid */}
      <section className="relative py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              Our Top Products
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                  {/* Product Image */}
                  <div className="relative w-full h-48 mb-6 overflow-hidden rounded-2xl bg-gray-100">
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
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price}
                      </span>
                      <Link href="/contact" className="inline-block">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm">
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

      {/* Call To Action */}
      <section className="bg-black py-20 text-white text-center relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_70%)]"></div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Need More Gear?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Browse our full catalog or get in touch for specialized orders and
              bulk inquiries.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact" className="inline-block">
                <button className="group relative px-10 py-4 bg-white text-black font-bold rounded-2xl shadow-2xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <span className="relative z-10">Contact SportsKart</span>
                </button>
              </Link>
              <button className="px-10 py-4 border-2 border-white/30 rounded-2xl font-semibold text-white hover:bg-white/10 transition-all duration-300 hover:scale-105">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="text-2xl font-bold mb-4 text-blue-600">
            SportsKart
          </div>
          <p className="text-gray-600">
            Empowering athletes with premium sports equipment since day one.
          </p>
        </div>
      </footer>
    </div>
  );
}
