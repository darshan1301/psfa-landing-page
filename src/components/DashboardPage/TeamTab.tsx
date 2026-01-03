import { UserCheck } from "lucide-react";
import AddTeamMemberForm from "../AddTeamMemberForm";
import React, { useEffect, useState } from "react";

import Loading from "../Loader";
import Image from "next/image";
import DeleteDialog from "../DeleteDialog";
import EditTeamMember from "../EditTeamMember";

type Member = {
  id: string;
  name: string;
  role: string;
  image: string;
  yearsOfExperience: number;
  sortOrder: number;
};

type TeamMemberBase = {
  name: string;
  role: string;
  image: string;
  yearsOfExperience: number;
  sortOrder: number;
};

export function TeamTab() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/panel-api/team-members");
      if (!response.ok) {
        throw new Error("Failed to fetch team members");
      }
      const data = await response.json();
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleAddMember = async (memberData: TeamMemberBase) => {
    console.log(memberData);
    try {
      const response = await fetch("/api/panel-api/team-members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        throw new Error("Failed to add team member");
      }

      const newMember = await response.json();
      setTeamMembers((prev) => [...prev, newMember]);
    } catch (error) {
      console.error("Error adding team member:", error);
    }
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const response = await fetch(`/api/panel-api/team-members`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete team member");
      }

      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const handleEditMember = async (member: Member) => {
    try {
      const res = await fetch(`/api/panel-api/team-members`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(member),
      });
      if (res.ok) {
        const updatedMember: Member = await res.json();
        setTeamMembers((prev) => {
          return prev.map((member) =>
            member.id === updatedMember.id ? updatedMember : member
          );
        });
      }
    } catch (error) {
      console.error("Error editing team member: ", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Team Members</h2>
          <p className="text-gray-600 mt-1">Manage your team member profiles</p>
        </div>
        <AddTeamMemberForm onSubmit={handleAddMember} />
      </div>

      {teamMembers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <UserCheck className="w-16 h-16 text-pink-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Team Members
            </h3>
            <p className="text-gray-600">
              Team member profiles and information will be managed here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                {member.image && (
                  <div className="relative group">
                    <Image
                      width={64}
                      height={64}
                      src={member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.role}</p>
                  <p className="text-gray-500 text-sm">
                    {member.yearsOfExperience} year experience
                  </p>
                  <p className="text-gray-500 text-sm">
                    Sort Order: {member.sortOrder}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <EditTeamMember onSubmit={handleEditMember} member={member} />
                <DeleteDialog
                  onConfirm={() => handleDeleteMember(member.id!)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
