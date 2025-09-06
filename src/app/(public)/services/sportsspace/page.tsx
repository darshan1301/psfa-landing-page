import { Metadata } from "next";
import Link from "next/link";
import {
  Trophy,
  Settings,
  Shield,
  Clock,
  MapPin,
  CreditCard,
  Smartphone,
  Building2,
  Star,
  CheckCircle,
} from "lucide-react";
import FAQItem from "@/components/FAQItem";
import Image from "next/image";
// Sports icons

export const metadata: Metadata = {
  title: "Turf & Court Booking | Venue Management Services | PSFA Sports Space",
  description:
    "Book premium turfs and courts online, or scale your facility with PSFA's operations, staffing, and marketing engine.",
  keywords: [
    "turf booking Nagpur",
    "sports venue management",
    "book football turf",
    "book pickleball court",
    "corporate sports events",
  ],
};

const faqs = [
  {
    question: "Do you allow corporate bookings?",
    answer:
      "Yes, with invoicing. We offer special corporate rates and can handle bulk bookings with proper documentation and invoicing for your business needs.",
  },
  {
    question: "Can I reschedule?",
    answer:
      "Yes, subject to slot rules. You can reschedule your booking up to 12 hours before the scheduled time, depending on availability and the specific venue's cancellation policy.",
  },
  {
    question: "What about rain?",
    answer:
      "Weather policy applies; credits where eligible. For outdoor facilities, we offer rain credits or rescheduling options when weather conditions make play unsafe or impossible.",
  },
  {
    question: "Do you provide equipment at the facilities?",
    answer:
      "Yes, we provide all the necessary equipment at the facility including balls, rackets, cones, and other sports gear as part of your booking experience.",
  },
  {
    question: "Can you operate my venue?",
    answer:
      "Yes — full facility management. We offer comprehensive venue management services including operations, staffing, marketing, maintenance, and technology solutions to maximize your facility's potential.",
  },
];

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <Image
          src="https://my-s3-storage-prathmesh-nagpur.s3.ap-south-1.amazonaws.com/psfa/emilio-garcia-AWdCgDDedH0-unsplash+(1).jpg"
          alt="Sportsspace background"
          fill
          className="object-cover object-center brightness-75"
          priority
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Play more. <span className="text-blue-200">Book Faster.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-100">
            Discover and book PSFA‑managed turfs, courts and arenas across the
            city — or let us operate your venue end‑to‑end.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="https://sportsspace.in/grounds/nagpur"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition">
              Book a Ground
            </Link>
            <Link
              href="https://sportsspace.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white text-white hover:bg-white/10 transition">
              Visit sportsspace.in
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="max-w-6xl mx-auto mt-10 px-6 sm:px-10 pb-20">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 text-center">
          Premium <span className="font-medium text-blue-600">Venues</span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg text-center max-w-3xl mx-auto mb-12">
          State-of-the-art facilities across Nagpur, managed by professionals
          for the ultimate sports experience.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              name: "Premier Football Turf",
              location: "Sadar, Nagpur",
              image: "🏟️",
              sports: ["Football", "Cricket"],
              rating: 4.8,
              price: "₹800/hour",
            },
            {
              name: "Elite Pickleball Courts",
              location: "Civil Lines, Nagpur",
              image: "🎾",
              sports: ["Pickleball", "Badminton"],
              rating: 4.9,
              price: "₹400/hour",
            },
            {
              name: "Multi-Sport Arena",
              location: "Dharampeth, Nagpur",
              image: "🏀",
              sports: ["Basketball", "Volleyball"],
              rating: 4.7,
              price: "₹600/hour",
            },
          ].map((venue, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-6xl">
                {venue.image}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-medium text-gray-900">
                    {venue.name}
                  </h3>
                  <div className="flex items-center text-sm text-yellow-600">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    {venue.rating}
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {venue.location}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {venue.sports.map((sport, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                      {sport}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">
                    {venue.price}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4 text-center">
            What We <span className="font-medium text-blue-600">Offer</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg text-center max-w-3xl mx-auto mb-12">
            Complete sports facility solutions — from seamless booking
            experiences to full venue operations.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Online Booking",
                desc: "Instant confirmations with memberships, passes & dynamic pricing",
                icon: Smartphone,
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                title: "Event Management",
                desc: "Corporate tournaments, leagues & birthday events",
                icon: Trophy,
                gradient: "from-green-500 to-emerald-500",
              },
              {
                title: "Facility Operations",
                desc: "Staffing, SOPs, maintenance & scheduling optimization",
                icon: Settings,
                gradient: "from-purple-500 to-violet-500",
              },
              {
                title: "Safety & Lighting",
                desc: "Professional lighting systems and safety protocols",
                icon: Shield,
                gradient: "from-orange-500 to-amber-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center text-center bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 p-8">
                <div
                  className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            How It <span className="font-medium text-blue-600">Works</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get on the field in just four simple steps — from discovery to game
            time.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200  via-purple-200 to-orange-200"></div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {[
              {
                step: "1",
                title: "Browse Venues",
                desc: "Explore available turfs, courts and arenas across Nagpur",
                icon: MapPin,
                gradient: "from-blue-500 to-blue-600",
                bgAccent: "from-blue-50 to-blue-100",
              },
              {
                step: "2",
                title: "Select Time",
                desc: "Pick your preferred date and time slot with real-time availability",
                icon: Clock,
                gradient: "from-green-500 to-green-600",
                bgAccent: "from-green-50 to-green-100",
              },
              {
                step: "3",
                title: "Secure Payment",
                desc: "Book instantly with secure online payment and confirmation",
                icon: CreditCard,
                gradient: "from-purple-500 to-purple-600",
                bgAccent: "from-purple-50 to-purple-100",
              },
              {
                step: "4",
                title: "Play & Enjoy",
                desc: "Show up and enjoy your premium sports experience",
                icon: CheckCircle,
                gradient: "from-orange-500 to-orange-600",
                bgAccent: "from-orange-50 to-orange-100",
              },
            ].map((step, idx) => (
              <div key={idx} className="group relative">
                {/* Background Card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.bgAccent} rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-50`}></div>

                {/* Main Card */}
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center transform group-hover:-translate-y-2">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-gray-100">
                      <span className="text-lg font-bold text-gray-700">
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                  {/* Bottom Accent */}
                  <div
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r ${step.gradient} rounded-t-full`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">Ready to get started?</p>
          <Link
            href="https://sportsspace.in/grounds/nagpur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
            Start Booking Now
            <CheckCircle className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>

      {/* For Venue Owners */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center">
          <div className="max-w-4xl mx-auto">
            <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-6">
              Venue <span className="font-medium text-blue-600">Owners</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Maximize your facility&apos;s potential with our complete venue
              management solutions. From operations and staffing to marketing
              and technology — we handle it all.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                "Increase Revenue by 40%",
                "Professional Operations",
                "Technology Integration",
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center bg-white rounded-xl p-4 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <Link
              href="#contact"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg transition transform hover:scale-105">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 py-20">
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-12 text-center">
          Frequently Asked{" "}
          <span className="font-medium text-blue-600">Questions</span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">
            Ready to <span className="font-medium">Get Started?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Book your next game or explore partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#booking"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105">
              Book a Slot
            </Link>
            <Link
              href="#partner"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition">
              Become a Partner
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
