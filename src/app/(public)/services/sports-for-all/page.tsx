import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  ClipboardCheck,
  Trophy,
  Activity,
  Lightbulb,
  FileText,
  Wrench,
  BarChart3,
  Layers,
  Camera,
  Monitor,
  Settings,
  HeartPulse,
} from "lucide-react";
import { Section } from "@/components/Section";
import FAQItem from "@/components/FAQItem";
import Astpvid from "@/components/Astpvid";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Annual Sports Training Program for Schools & Colleges | PSFA ASTP",
  description:
    "ASTP brings weekly coaching, assessments, events and live dashboards to your campus. Measurable outcomes, standardized SOPs and safety.",
  keywords: [
    "school sports program",
    "annual sports training",
    "institutional sports partner",
    "sports coaching for schools",
  ],
};

export default async function ASTPPage() {
  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="text-center mx-6 sm:mx-10 px-0 pt-32 pb-16">
        <div className=" my-4 flex justify-center">
          <Image
            alt="Pratigrham Sports Space Logo"
            width={200}
            height={200}
            src={
              "https://res.cloudinary.com/hotel-booking-1301/image/upload/c_scale,h_2449/v1758277716/psfa-landing-page/logo/pgm_logo_navy_title_hhrqvk.png"
            }
          />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-gray-900 mb-6">
          Year-Round Sports Education
          <br />
          <span className="text-blue-600 font-medium">That Scales.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
          Weekly training + assessments + tournaments with dashboards — built
          for schools & colleges.
        </p>
        <Link href="/contact">
          <button className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-full shadow-lg transition transform hover:scale-105 text-lg">
            Bring ASTP to Your Campus
          </button>
        </Link>
      </section>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 space-y-20">
        {/* Program Design */}
        <Section
          variant="gradient"
          title="Program Design"
          items={[
            {
              title: "Custom Sports Mix",
              desc: "3-5 sports per institute, customizable to your needs.",
              icon: Layers,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Weekly Skill Sessions",
              desc: "Integrated into the timetable for consistency.",
              icon: Activity,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "Holistic Add-ons",
              desc: "Fitness, nutrition, and life-skills modules.",
              icon: HeartPulse,
              color: "from-pink-500 to-rose-500",
            },
            {
              title: "Assessments",
              desc: "Quarterly certifications with skill benchmarks.",
              icon: ClipboardCheck,
              color: "from-purple-500 to-violet-600",
            },
            {
              title: "Tournaments",
              desc: "Inter-house and inter-school competition calendars.",
              icon: Trophy,
              color: "from-orange-500 to-amber-600",
            },
          ]}
        />

        {/* Tech Enablement */}
        <Section
          title="Ai/Tech Enablement "
          items={[
            {
              title: "Fitness Trackers",
              desc: "Attendance & activity logging integrated with dashboards.",
              icon: Users,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "AI Camera",
              desc: "Smart session recording & analytics.",
              icon: Camera,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Live Streaming",
              desc: "Broadcast intra-school tournaments in real-time.",
              icon: Monitor,
              color: "from-purple-500 to-pink-600",
            },
            {
              title: "Dashboards",
              desc: "Principals & parents can view progress & leaderboards.",
              icon: BarChart3,
              color: "from-orange-500 to-amber-600",
            },
          ]}
        />

        {/* Implementation Process */}
        <Section
          title="Implementation Process"
          items={[
            {
              title: "Discovery & Audit",
              desc: "Ground, equipment & timetable survey.",
              icon: FileText,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Proposal",
              desc: "Sports mix, batch matrix, pricing, SLAs.",
              icon: Lightbulb,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "Onboarding",
              desc: "Coach deployment, kits, safety SOPs.",
              icon: Users,
              color: "from-orange-500 to-amber-600",
            },
            {
              title: "Delivery",
              desc: "Weekly sessions and assessments.",
              icon: Wrench,
              color: "from-purple-500 to-violet-600",
            },
            {
              title: "Events",
              desc: "Quarterly tournaments & showcases.",
              icon: Trophy,
              color: "from-pink-500 to-rose-500",
            },
            {
              title: "Reporting",
              desc: "Dashboards, reports & stakeholder feedback.",
              icon: BarChart3,
              color: "from-red-500 to-rose-600",
            },
          ]}
        />

        {/* Pricing Models */}
        <Section
          variant="gradient"
          title="Pricing Models"
          items={[
            {
              title: "Per Student",
              desc: "Per-student per month (PSPM) billing.",
              icon: Users,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Fixed Retainer",
              desc: "Monthly retainer based on program size.",
              icon: Settings,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "CSR-Funded",
              desc: "Blended models supported by CSR initiatives.",
              icon: HeartPulse,
              color: "from-orange-500 to-amber-600",
            },
          ]}
        />
        <Astpvid heading="Take A Look At ASTP" />
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
    </div>
  );
}

const faqs = [
  {
    question: "How does ASTP fit into our school timetable?",
    answer:
      "The Annual Sports Training Program (ASTP) is aligned with the school’s existing sports periods. Sessions are conducted during regular timetable slots to ensure no academic disruption while promoting fitness and skill development.",
  },
  {
    question: "What benefits will students get apart from playing sports?",
    answer:
      "ASTP blends practical drills, theory, and visual learning with AI-driven analytics. Students receive fitness tests, progress dashboards, skill reports, and even live match streaming for better exposure and engagement.",
  },
  {
    question: "Do you provide qualified coaches?",
    answer:
      "Yes, we provide expert coaches trained in multiple sports who follow a structured curriculum. The coaching module ensures consistency, discipline, and measurable outcomes across all participating schools.",
  },
  {
    question: "How will parents stay updated on their child’s progress?",
    answer:
      "Parents can access a dedicated portal with fitness tracker results, AI skill reports, attendance records, and live streaming of tournaments. They also receive auto-generated participation certificates for their child.",
  },
  {
    question: "Will there be additional costs for equipment and kits?",
    answer:
      "No hidden costs. The program includes annual training equipment, sports kits, and tournament participation as part of the service package, ensuring complete coverage for every student.",
  },
  {
    question: "Is ASTP aligned with the National Education Policy (NEP)?",
    answer:
      "Yes, ASTP is designed to meet the revised NEP guidelines, ensuring physical education and sports become an integral part of holistic student development.",
  },
  {
    question: "How is student safety and fitness monitored?",
    answer:
      "ASTP integrates fitness tests, family fitness check-ups, and AI-based monitoring like motion tracking, overtraining alerts, and wellness dashboards to ensure student health and safety.",
  },
  {
    question: "Can schools host tournaments under this program?",
    answer:
      "Yes, ASTP includes tournament participation, intra-school event management, and sports day coordination. We also offer live streaming of tournaments for parents and community engagement.",
  },
  {
    question: "What role do parents have in this program?",
    answer:
      "Parents are engaged through fitness check-ups, live streaming of matches, and regular updates via dashboards. This ensures families stay connected to the child’s sports journey.",
  },
  {
    question: "How many sports are covered in ASTP?",
    answer:
      "The curriculum covers a wide range of team and individual sports including cricket, football, basketball, badminton, skating, martial arts, athletics, yoga, swimming, and many more — ensuring holistic multi-sport training.",
  },
];
