import Image from "next/image";
import React from "react";

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  yearsOfExperience: number;
}

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="group relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card content */}
      <div className="relative p-3 md:p-6">
        {/* Profile image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="md:w-48 md:h-48 w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-blue-100 transition-all duration-300">
              <Image
                width={360}
                height={360}
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Experience badge */}
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
              {member.yearsOfExperience}+y
            </div>
          </div>
        </div>

        {/* Name */}
        <h3 className=" md:text-xl md:font-bold text-black text-center mb-2 group-hover:text-gray-800 transition-colors duration-200">
          {member.name}
        </h3>

        {/* Role */}
        <p className="text-blue-600 font-semibold text-center mb-2 md:mb-4 text-sm uppercase tracking-wide group-hover:text-blue-700 transition-colors duration-200">
          {member.role}
        </p>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </div>
  );
};

export default TeamMemberCard;
