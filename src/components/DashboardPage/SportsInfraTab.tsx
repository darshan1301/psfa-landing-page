import React, { useEffect, useState } from "react";
import { Building, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddInfrastructureForm } from "../AddInfrastructureForm";
import Image from "next/image";

interface SportsInfrastructure {
  id: string;
  name: string;
  location: string;
  description: string;
  Area?: number;
  images: string[];
  createdAt: string;
  Amenities: string[];
}
type InfrastructurePayload = {
  id?: string;
  name: string;
  location: string;
  description: string;
  Area?: number;
  images: string[];
  Amenities: string[];
};

export default function SportsInfrastructureTab() {
  const [infrastructures, setInfrastructures] = useState<
    SportsInfrastructure[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInfrastructures = async () => {
    try {
      const res = await fetch("/api/panel-api/sports-infra");
      const data = await res.json();
      setInfrastructures(data);
    } catch (error) {
      console.error("Failed to fetch infrastructures", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInfrastructures();
  }, []);

  async function handleAddInfra(payload: InfrastructurePayload): Promise<void> {
    try {
      const res = await fetch("/api/panel-api/sports-infra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        // Optionally show error to user here
        console.error(err.error || "Failed to add infrastructure");
        return;
      }

      // Optionally show success to user here
      fetchInfrastructures(); // Refresh the list after adding
    } catch (error) {
      // Optionally show error to user here
      console.error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }

  async function handleEditInfra(
    payload: InfrastructurePayload
  ): Promise<void> {
    try {
      const res = await fetch(`/api/panel-api/sports-infra`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        // Optionally show error to user here
        console.error(err.error || "Failed to update infrastructure");
        return;
      }

      // Optionally show success to user here
      fetchInfrastructures(); // Refresh the list after editing
    } catch (error) {
      // Optionally show error to user here
      console.error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }

  const handleDeleteInfra = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/panel-api/sports-infra`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const err = await res.json();
        // Optionally show error to user here
        console.error(err.error || "Failed to delete infrastructure");
        return;
      }

      // Optionally show success to user here
      fetchInfrastructures(); // Refresh the list after deleting
    } catch (error) {
      // Optionally show error to user here
      console.error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Sports Infrastructure
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your sports infrastructure listings
          </p>
        </div>
        <AddInfrastructureForm
          onSubmit={handleAddInfra}
          triggerLabel="Add Infrastructure"
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      ) : infrastructures.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Building className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Infrastructure Listed
            </h3>
            <p className="text-gray-600">
              Your sports infrastructure items will appear here for management.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infrastructures.map((infra) => (
            <div
              key={infra.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden flex flex-col transition hover:shadow-lg">
              {/* Cover Image */}
              {infra.images?.[0] && (
                <Image
                  height={384}
                  width={384}
                  src={infra.images[0]}
                  alt={infra.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5 flex flex-col justify-between flex-grow">
                {/* Details */}
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    {infra.name}
                  </h4>
                  <p className="text-sm text-gray-500">{infra.location}</p>

                  <div className="text-sm text-gray-600 mt-3 space-y-1">
                    <p>
                      <span className="font-medium text-gray-800">Area:</span>{" "}
                      {infra.Area ?? "N/A"} sqft
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">
                        Amenities:
                      </span>{" "}
                      {infra.Amenities.join(", ")}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-3 justify-end">
                  <AddInfrastructureForm
                    onSubmit={handleEditInfra}
                    triggerLabel="Edit"
                    initialData={infra}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="px-4 py-2 rounded-lg bg-red-100 text-sm font-medium text-red-600 hover:bg-red-200 transition">
                        Delete
                      </button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. It will permanently
                          delete this infrastructure.
                        </DialogDescription>
                      </DialogHeader>

                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleDeleteInfra(infra.id)}>
                          Confirm Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
