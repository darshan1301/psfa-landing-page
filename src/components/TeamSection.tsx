import React, { useEffect, useState } from "react";
import TeamMemberCard from "@/components/TeamMemberCard";
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import Loading from "./Loader";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  yearsOfExperience: number;
}

const containerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
};

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public-api/team-members");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const teamMembers = await response.json();
        // render milestones first
        setTeamMembers(teamMembers);
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      {teamMembers.length > 0 && (
        <motion.div
          id="our-team"
          className="mb-20 lg:mx-24 px-4"
          variants={containerVariants}
          initial="initial"
          animate="animate">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-gray-900">
                Meet Our Team
              </h2>
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Dedicated professionals committed to your success
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 items-center">
            {teamMembers.map((member) => {
              return <TeamMemberCard key={member.id} member={member} />;
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TeamSection;
