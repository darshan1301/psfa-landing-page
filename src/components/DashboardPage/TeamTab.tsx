import { Trash2, UserCheck } from "lucide-react";
import AddTeamMemberForm from "../AddTeamMemberForm";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Loading from "../Loader";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Button } from "../ui/button";
import DeleteDialog from "../DeleteDialog";

type Member = {
  id?: string;
  name: string;
  role: string;
  image: string;
  yearsOfExperience: number;
};

export function TeamTab() {
  const [teamMembers, setTeamMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { uploadImage } = useImageUpload();

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

  const handleAddMember = async (memberData: Member) => {
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

  const handleChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    memberId: string,
    oldImageUrl: string
  ) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 1024 * 1024)
      return alert("Image must be less than 1MB");
    try {
      await fetch(`/api/panel-api/imageUpload`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: oldImageUrl }),
      });
      if (!file) return;
      const uploadedUrl = await uploadImage(file, "team-members");
      await fetch(`/api/panel-api/team-members`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: uploadedUrl, id: memberId }),
      });
      fetchTeamMembers();
    } catch (err) {
      console.error("Image update failed:", err);
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
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleChangeImage(e, member.id!, member.image)
                    }
                    className="hidden"
                  />
                </label>
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

interface DeleteMemberDialogProps {
  memberId: string;
  onDelete: (id: string) => void | Promise<void>;
}

export function DeleteMemberDialog({
  memberId,
  onDelete,
}: DeleteMemberDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(memberId);
      setOpen(false);
    } catch (err) {
      console.error("Failed to delete member:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="text-red-600 hover:text-red-800 transition-colors"
          title="Delete member">
          <Trash2 className="h-5 w-5" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this team member? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
