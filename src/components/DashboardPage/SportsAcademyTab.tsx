import React, { useEffect, useState } from "react";
import { Edit, GraduationCap, Loader2 } from "lucide-react";
import { AddAcademyForm } from "../AddAcademyForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import DeleteDialog from "../DeleteDialog";

// Interface for academy data
export interface Academy {
  id: string;
  createdAt?: string; // ISO string from backend
  name: string;
  location: string;
  description: string;
  images: string[]; // Array of image URLs
  isActive?: boolean; // Active status
}

export default function SportsAcademyTab() {
  const [academies, setAcademies] = React.useState<Academy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch initial academy data from backend API
    const fetchAcademies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/panel-api/sports-academy");
        if (!response.ok) {
          throw new Error("Failed to fetch academies");
        }
        const data = await response.json();
        setAcademies(data.academies || []);
      } catch (error) {
        console.error("Error fetching academies:", error);
        // Handle error (e.g., show notification)
      } finally {
        setIsLoading(false);
      }
    };
    fetchAcademies();
  }, []);

  const addAcademyHandler = async (academy: Academy) => {
    console.log("Academy added:", academy);

    setAcademies((prev) => [...prev, academy]);
  };

  const deleteAcademyHandler = async (id: string) => {
    try {
      const response = await fetch(`/api/panel-api/sports-academy`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete academy");
      }

      setAcademies((prev) => prev.filter((academy) => academy.id !== id));
    } catch (error) {
      console.error("Error deleting academy:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex mt-40 items-center justify-center h-full">
        <Loader2 className="animate-spin w-8 h-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sports Academy</h2>
          <p className="text-gray-600 mt-1">
            Manage your academy programs and enrollments
          </p>
        </div>
        <AddAcademyForm onAdd={addAcademyHandler} />
      </div>

      {/* Empty State */}
      {academies.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <GraduationCap className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Academy Programs
            </h3>
            <p className="text-gray-600">
              Your sports academy programs and student enrollments will show up
              here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academies.map((academy) => (
            <AcademyCard
              key={academy.id}
              academy={academy}
              // onEdit={editAcademyHandler}
              onDelete={deleteAcademyHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// components/AcademyCard.tsx

interface AcademyCardProps {
  academy: Academy;
  // onEdit: (academy: Academy) => void;
  onDelete: (id: string) => void;
  // onDeleteImage: (academyId: number, imageUrl: string) => void;
}

export function AcademyCard({ academy, onDelete }: AcademyCardProps) {
  // const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(academy.id);
    // setOpenDelete(false);
  };

  return (
    <Card className="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{academy.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full overflow-hidden rounded-lg">
          <Image
            height={480}
            width={640}
            src={academy.images[0]}
            alt={academy.name}
            className="object-cover h-full w-full"
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Location: {academy.location}
        </p>
        <p className="text-sm  mt-1">
          Status:{" "}
          <span
            className={
              academy.isActive
                ? "text-green-600 uppercase font-bold"
                : "text-red-600 uppercase font-bold"
            }>
            {academy.isActive ? "Active" : "Inactive"}
          </span>
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Link
          href={`/panel/sports-academy/${academy.id}`}
          className="flex mx-4 border rounded-xl px-2 py-1 items-center space-x-1">
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </Link>

        <DeleteDialog
          triggerLabel="Delete"
          confirmLabel="Confirm Delete"
          description={`Are you sure you want to delete ${academy.name}? This action cannot be undone.`}
          onConfirm={handleDeleteConfirm}
        />
      </CardFooter>
    </Card>
  );
}
