import { GiCricketBat } from "react-icons/gi";
import {
  Dumbbell,
  Volleyball,
  Search,
  Ruler,
  Wrench,
  FileText,
  ClipboardCheck,
  Shield,
  Users,
  Hammer,
  Settings,
  BarChart3,
  Lightbulb,
} from "lucide-react";
import { GiSoccerBall, GiTennisCourt, GiShuttlecock } from "react-icons/gi";
import { Section } from "@/components/Section";

export default function InfraPage() {
  return (
    <div className="min-h-screen mt-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-20 space-y-20">
        {/* What We Build */}
        <Section
          title="What We Build"
          items={[
            {
              title: "Futsal & Multi-sport Turfs",
              desc: "EPDM / Artificial Grass installations for multi-sport play.",
              icon: GiSoccerBall,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "Pickleball & Tennis Courts",
              desc: "Indoor/outdoor courts built for precision & durability.",
              icon: GiTennisCourt,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Cricket Nets & Pitches",
              desc: "Single/multi-lane nets and match-ready cricket pitches.",
              icon: GiCricketBat,
              color: "from-orange-500 to-amber-600",
            },
            {
              title: "Badminton Sheds",
              desc: "Wooden/PVC floor courts inside custom sheds.",
              icon: GiShuttlecock,
              color: "from-purple-500 to-violet-600",
            },
            {
              title: "Basketball & Volleyball",
              desc: "Indoor/outdoor courts with pro-grade flooring.",
              icon: Volleyball,
              color: "from-pink-500 to-rose-600",
            },
            {
              title: "Gym & Play Zones",
              desc: "Fitness zones, kids EPDM flooring & safe setups.",
              icon: Dumbbell,
              color: "from-red-500 to-orange-500",
            },
          ]}
        />

        {/* Services */}
        <Section
          variant="gradient"
          title="Services"
          items={[
            {
              title: "Feasibility & Planning",
              desc: "Revenue & feasibility models tailored for your site.",
              icon: BarChart3,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Designs & Mockups",
              desc: "CAD drawings, 2D/3D layouts & visual mockups.",
              icon: Ruler,
              color: "from-green-500 to-teal-600",
            },
            {
              title: "Civil Works",
              desc: "Sub-base, RCC, drainage & slope management.",
              icon: Hammer,
              color: "from-orange-500 to-amber-600",
            },
            {
              title: "Fabrication & Lighting",
              desc: "Custom sheds, fabrication, LED lux lighting design.",
              icon: Lightbulb,
              color: "from-purple-500 to-pink-600",
            },
            {
              title: "Fencing & Safety",
              desc: "Garware nets, posts, pads & protective systems.",
              icon: Shield,
              color: "from-red-500 to-rose-600",
            },
            {
              title: "AMC & Staffing",
              desc: "Operations handover with AMC & staffing (Sports Space).",
              icon: Users,
              color: "from-yellow-500 to-orange-500",
            },
          ]}
        />

        {/* Delivery Model */}
        <Section
          title="Delivery Model"
          items={[
            {
              title: "Audit & Concept",
              desc: "Site survey: soil, slope, drainage checks.",
              icon: Search,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Design & BOQ",
              desc: "Drawings, specs, materials & timelines.",
              icon: FileText,
              color: "from-green-500 to-teal-600",
            },
            {
              title: "Build",
              desc: "EPC execution with strict QA/QC processes.",
              icon: Wrench,
              color: "from-orange-500 to-amber-600",
            },
            {
              title: "Commission",
              desc: "Handover with safety checks & SOPs.",
              icon: ClipboardCheck,
              color: "from-purple-500 to-pink-600",
            },
            {
              title: "Operate",
              desc: "Optional PSFA operations engine support.",
              icon: Settings,
              color: "from-red-500 to-rose-600",
            },
          ]}
        />
      </div>
    </div>
  );
}
