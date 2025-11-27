import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Dumbbell,
  Users,
  HeartPulse,
  ClipboardCheck,
  Utensils,
  Trophy,
  Search,
  Layers,
  CalendarCheck,
  BarChart3,
  Flag,
} from "lucide-react";
// Sports icons
import Image from "next/image";
import { Section } from "@/components/Section";
import FAQItem from "@/components/FAQItem";

export const metadata: Metadata = {
  title: "Sports Academy in Nagpur – Football, Cricket, Pickleball Coaching ",
  description:
    "Join Pratigrham Sports Academy in Nagpur for expert coaching in cricket, football, and martial arts. Our youth sports development programs include fitness training, structured skill development, and multi-sport coaching for all ages. Enroll now for affordable and professional sports training in Nagpur.",
  keywords: [
    "sports academy Nagpur",
    "sports coaching Nagpur",
    "football academy Nagpur",
    "cricket coaching Nagpur",
    "sports training center Nagpur",
    "youth sports academy Nagpur",
    "Nagpur sports coaching programs",
    "Sports academy Nagpur",
    "Cricket academy Nagpur",
    "Football academy Nagpur",
    "Martial arts academy Nagpur",
    "Sports coaching Nagpur",
    "Youth sports academy Nagpur",
    "Best sports academy Nagpur",
    "Sports training Nagpur",
    "academy sports near me",
    "sports academy cricket",
    "sports academy in india",
    "best sports academy in india",
    "india sports academy",
    "Sports coaching and training in Nagpur",
    "Multi-sport academy Maharashtra",
    "Sports development programs Nagpur",
    "Athlete training Nagpur Maharashtra",
    "Kids sports academy Nagpur",
    "Nagpur sports clubs and academy",
    "Fitness and sports coaching Nagpur",
    "Structured sports training Maharashtra",
    "Sports academy for children Nagpur",
    "Nagpur cricket and football coaching",
    "Best sports academy in Nagpur",
    "Cricket coaching academy in Nagpur Maharashtra",
    "Football training programs for kids in Nagpur",
    "Martial arts classes near me Nagpur",
    "Youth sports development academy Nagpur",
    "Structured sports coaching for beginners in Nagpur",
    "Multi-sport training academy Maharashtra",
    "Sports fitness and agility training Nagpur",
    "Affordable cricket and football coaching in Nagpur",
  ],
};

export default async function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero */}
      <section className="relative text-center mx-6 sm:mx-10 px-0 pt-32 pb-20">
        <div className="mb-6 flex justify-center overflow-hidden">
          <Image
            alt="Pratigrham Sports Academy Logo"
            width={200}
            height={200}
            src={
              "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1758277715/psfa-landing-page/logo/sports_academy_ftogln.png"
            }
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
          Train Like a Pro.
          <br />
          <span className="text-blue-600 font-normal">
            Play With Confidence.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
          Structured coaching in Football, Cricket, Pickleball and more — from
          fundamentals to match performance.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg font-semibold rounded-full shadow-lg transition transform hover:scale-105">
          Enroll in Our Academy
        </Link>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 sm:px-10 pb-20">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-8 text-center">
          What You <span className="font-medium text-blue-600">Get</span>
        </h2>
        {/* <p className="text-gray-600 text-base sm:text-lg text-center max-w-3xl mx-auto mb-12">
          Every program at PSFA is built for holistic athlete development —
          skills, fitness, mindset, and performance.
        </p> */}

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "Curriculum",
              text: "Progressive curriculum across Foundation → Development → Performance (45-day cycles)",
              icon: Layers,
              gradient: "from-blue-500 to-indigo-500",
            },
            {
              title: "Coaching",
              text: "Age & level-based groups; low coach-to-athlete ratios",
              icon: Users,
              gradient: "from-green-500 to-emerald-500",
            },
            {
              title: "Fitness",
              text: "Fitness, agility, and injury-prevention modules",
              icon: HeartPulse,
              gradient: "from-pink-500 to-rose-500",
            },
            {
              title: "Tracking",
              text: "Performance tracking, report cards & parent reviews",
              icon: ClipboardCheck,
              gradient: "from-purple-500 to-violet-500",
            },
            {
              title: "Nutrition",
              text: "Diet guidance & recovery tips",
              icon: Utensils,
              gradient: "from-orange-500 to-amber-500",
            },
            {
              title: "Competition",
              text: "Intra-academy leagues & quarterly tournaments",
              icon: Trophy,
              gradient: "from-yellow-500 to-orange-400",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center text-center bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 p-8">
              {/* Icon Badge */}
              <div
                className={`w-20 h-20 mb-6 rounded-3xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}>
                <item.icon className="w-10 h-10" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">
                {item.title}
              </h3>

              {/* Text */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.text}
              </p>

              {/* Accent Border on Hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* Programs & Batches */}
      <section id="programs" className=" py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-12 text-center">
            Programs & Batches
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Football Academy",
                desc: "U6, U9, U12, U15, U18, Adults",
                image:
                  "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1757150350/psfa-landing-page/all%20sports/pexels-yogendras31-1375149_mov6j3.jpg",
                color: "bg-green-600",
              },
              {
                title: "Cricket Academy",
                desc: "Beginner / Intermediate / Advanced nets",
                image:
                  "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1749544444/psfa-landing-page/all%20sports/khf6hkraecesywaxqrjk.jpg",
                color: "bg-orange-600",
              },
              {
                title: "Pickleball",
                desc: "Beginner clinics, intermediate drills, matchplay",
                image:
                  "https://res.cloudinary.com/hotel-booking-1301/image/upload/v1749543288/psfa-landing-page/all%20sports/i1olssqp4g21ftsv1cf8.png",
                color: "bg-purple-600",
              },
              {
                title: "Holiday & Summer Camps",
                desc: "Multi-sport skill boosters",
                image:
                  "https://res.cloudinary.com/hotel-booking-1301/image/upload/c_crop,h_720,w_1000/v1757150508/psfa-landing-page/all%20sports/pexels-franco-monsalvo-252430633-33257254_hqkb1t.jpg",
                color: "bg-blue-500",
              },
            ].map((prog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition flex flex-col items-start">
                <div
                  className={`w-fit h-48 overflow-hidden ${prog.color} text-white rounded-xl flex items-center justify-center mb-4`}>
                  <Image
                    className="rounded-xl"
                    src={prog.image}
                    alt={prog.title}
                    width={400}
                    height={400}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl tracking-tight font-normal text-gray-900 mb-2">
                  {prog.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 py-10">
        <h2 className="text-3xl sm:text-4xl  text-gray-900 mb-4 text-center">
          How It Works ?
        </h2>

        <Section
          title=""
          variant="gradient"
          items={[
            {
              title: "Assessment",
              desc: "Free trial & baseline skills test",
              icon: Search,
              color: "bg-blue-500",
            },
            {
              title: "Placement",
              desc: "Batch allocation by age & level",
              icon: Users,
              color: "bg-green-600",
            },
            {
              title: "Plan",
              desc: "45-day development plan with goals",
              icon: CalendarCheck,
              color: "bg-purple-500",
            },
            {
              title: "Train",
              desc: "2–4 sessions/week + fitness & homework",
              icon: Dumbbell,
              color: "bg-orange-500",
            },
            {
              title: "Track",
              desc: "Monthly progress report & coach review",
              icon: BarChart3,
              color: "bg-pink-500",
            },
            {
              title: "Compete",
              desc: "Friendly fixtures & quarterly tournaments",
              icon: Flag,
              color: "bg-yellow-500",
            },
          ]}
        />
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
    </div>
  );
}

const faqs = [
  {
    question: "What age groups can join the Pratigrham Sports Academy?",
    answer:
      "We welcome children of all age groups, from beginners to advanced athletes. Our structured programs are tailored to each age and skill level to ensure steady growth and enjoyment.",
  },
  {
    question: "Which sports are offered at the academy?",
    answer:
      "We offer a wide range of indoor and outdoor sports including football, cricket, badminton, basketball, volleyball, hockey, kabaddi, swimming, martial arts, gymnastics, yoga, skating, and many more.",
  },
  {
    question: "How do you ensure the quality of coaching?",
    answer:
      "Our programs are led by expert coaches and professional mentors who follow structured, progressive training methods focused on discipline, fitness, skill development, and goal-oriented performance.",
  },
  {
    question: "Will my child’s fitness and health be monitored?",
    answer:
      "Yes, we provide regular fitness activities, quarterly fitness reports, endurance training, and advanced health analytics. Our trainers also design nutrition guidance and injury-prevention assessments for holistic development.",
  },
  {
    question: "Do you provide opportunities for competitions?",
    answer:
      "Yes, apart from regular training, we prepare students for tournaments and provide platforms to showcase their talent at intra-academy and external competitions.",
  },
  {
    question: "Where are your academies located?",
    answer:
      "Our academies are spread across multiple locations in Nagpur including Narendra Nagar, Isasani, Hingna Road, and Kamptee Road, offering football, cricket, yoga, and pickleball programs.",
  },
  {
    question: "How do you keep parents involved?",
    answer:
      "Parents receive regular updates through fitness reports, progress tracking, and event participation details. Live events and tournament updates also keep families engaged in their child’s sports journey.",
  },
];
