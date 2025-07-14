import { Map } from "lucide-react";
import { AddMilestoneForm } from "../AddMilestoneForm";
import { useEffect, useState } from "react";
import Image from "next/image";
import DeleteDialog from "../DeleteDialog";

interface Milestone {
  id: string;
  title: string;
  description: string;
  image: string;
  year: string;
}

interface MilestonePayload {
  id?: string;
  title: string;
  year: string;
  description: string;
  image: string;
}

export default function JourneyTab() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await fetch("/api/panel-api/milestones");
        if (!response.ok) {
          throw new Error("Failed to fetch milestones");
        }
        const data: Milestone[] = await response.json();
        setMilestones(data);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };
    fetchMilestones();
  }, []);

  const handleAddMilestone = async (data: MilestonePayload) => {
    try {
      const response = await fetch("/api/panel-api/milestones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add milestone");
      }

      const newMilestone: Milestone = await response.json();
      setMilestones((prev) => [...prev, newMilestone]);
    } catch (error) {
      console.error("Error adding milestone:", error);
    }
  };

  const handleDeleteMilestone = async (id: string) => {
    try {
      const response = await fetch("/api/panel-api/milestones", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete milestone");
      }

      setMilestones((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting milestone:", error);
    }
  };

  const handleEditMilestone = async (id: string, data: MilestonePayload) => {
    try {
      const response = await fetch(`/api/panel-api/milestones`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, id }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit milestone");
      }

      const updatedMilestone: Milestone = await response.json();
      setMilestones((prev) =>
        prev.map((m) => (m.id === id ? updatedMilestone : m))
      );
    } catch (error) {
      console.error("Error editing milestone:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Journey Cards</h2>
          <p className="text-gray-600 mt-1">
            Create and manage journey timeline cards
          </p>
        </div>
        <AddMilestoneForm onSubmit={handleAddMilestone} />
      </div>

      {milestones.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Map className="w-16 h-16 text-teal-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Journey Cards
            </h3>
            <p className="text-gray-600">
              Journey timeline cards and milestones will be displayed here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {milestone.title}
              </h3>
              <p className="text-gray-600">{milestone.description}</p>
              <Image
                width={300}
                height={200}
                src={milestone.image}
                alt={milestone.title}
                className="w-full h-32 object-cover rounded-md"
              />
              <p className="text-gray-500 text-sm">Year: {milestone.year}</p>
              <div className="flex justify-end space-x-2">
                <AddMilestoneForm
                  onSubmit={(data) => handleEditMilestone(milestone.id, data)}
                  initialData={milestone}
                  triggerLabel="Edit"
                />
                <DeleteDialog
                  triggerLabel="Delete Milestone"
                  description="Are you sure you want to delete this milestone?"
                  onConfirm={() => handleDeleteMilestone(milestone.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
