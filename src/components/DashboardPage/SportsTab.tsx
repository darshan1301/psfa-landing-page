import { Loader2, Plus, Trophy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useImageUpload } from "@/hooks/useImageUpload";
import SportCard from "../SportCard";

interface Sport {
  id: number;
  createdAt?: string; // ISO string from backend
  name: string;
  image: string;
  status?: boolean;
}
export default function SportsTab() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/panel-api/sports");
        if (!response.ok) {
          throw new Error("Failed to fetch sports");
        }
        const data: Sport[] = await response.json();
        setSports(data);
      } catch (error) {
        console.error("Error fetching sports:", error);
        // Handle error (e.g., show notification)
      } finally {
        setIsLoading(false);
      }
    };
    fetchSports();
  }, []);

  const addSportHandler = async (sport: Sport) => {
    console.log("Sport added:", sport);
    try {
      const response = await fetch("/api/panel-api/sports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sport),
      });

      if (!response.ok) {
        throw new Error("Failed to add sport");
      }

      const newSport: Sport = await response.json();
      setSports((prev) => [...prev, newSport]);
    } catch (error) {
      console.error("Error adding sport:", error);
      // Handle error (e.g., show notification)
    }
  };

  const deleteSportHandler = async (id: number) => {
    try {
      const response = await fetch(`/api/panel-api/sports`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete sport");
      }

      setSports((prev) => prev.filter((sport) => sport.id !== id));
    } catch (error) {
      console.error("Error deleting sport:", error);
      // Handle error (e.g., show notification)
    }
  };

  const editSportHandler = async (sport: Sport) => {
    try {
      const response = await fetch(`/api/panel-api/sports`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sport),
      });
      if (response.ok) {
        setSports((prev) =>
          prev.map((s) => (s.id === sport.id ? { ...s, ...sport } : s))
        );
      }
    } catch (error) {
      console.error("Error editing sport:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex mt-40 items-center justify-center h-full">
        <Loader2 className="animate-spin w-8 h-8 text-gray-800" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Sports</h2>
          <p className="text-gray-600 mt-1">
            Manage sports content and activities
          </p>
        </div>
        <AddSportModal onAdd={addSportHandler} />
      </div>

      {sports.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Sports Content
            </h3>
            <p className="text-gray-600">
              Sports activities and content will be managed here.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport) => (
            <SportCard
              key={sport.image}
              sport={sport}
              onDelete={deleteSportHandler}
              onEdit={editSportHandler}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface AddSportFormData {
  name: string;
  image: FileList;
}

/**
 * Modal to add a new sport with name and image file (<1MB)
 * Automatically uploads to S3 and returns sport data with image URL
 */
export const AddSportModal: React.FC<{
  onAdd?: (sport: Sport) => void;
  onError?: (error: string) => void;
}> = ({ onAdd, onError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isUploading,
    error: uploadError,
    uploadFromFormData,
  } = useImageUpload();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<AddSportFormData>();

  const onSubmit = async (data: AddSportFormData) => {
    const file = data.image[0];

    // File size validation (ensure <1MB)
    if (file.size >= 1048576) {
      setError("image", { message: "Image must be less than 1MB" });
      return;
    }

    try {
      // Create FormData and upload to S3
      const formData = new FormData();
      formData.append("file", file);

      // Upload to S3 with 'sports' folder
      const imageUrl = await uploadFromFormData(formData, "sports");

      if (imageUrl) {
        // Create sport object with S3 URL
        const sport: Sport = {
          id: Date.now(), // Temporary unique id, replace with backend id if needed
          name: data.name,
          image: imageUrl,
        };

        console.log("Sport added successfully:", sport);

        // Call parent callback with sport data
        if (onAdd) onAdd(sport);

        // Reset form and close modal
        reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      if (onError) onError(errorMessage);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex text-white bg-red-500 hover:bg-red-600 hover:text-white items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Sport</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col h-[50vh]">
          <div className="overflow-y-auto px-6 py-4 space-y-4">
            <DialogHeader>
              <DialogTitle>Add Sport</DialogTitle>
              <DialogDescription>
                Provide a sport name and upload an image (less than 1MB). The
                image will be automatically uploaded to cloud storage.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Sport Name</Label>
                <Input
                  id="name"
                  disabled={isUploading}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="image">Sport Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  {...register("image", {
                    required: "Image is required",
                    validate: (files) =>
                      files?.[0]?.size < 1048576 ||
                      "Image must be less than 1MB",
                  })}
                />
                {errors.image && (
                  <p className="text-red-600 text-sm">
                    {errors.image.message as string}
                  </p>
                )}
                {uploadError && (
                  <p className="text-red-600 text-sm">{uploadError}</p>
                )}
                <p className="text-gray-500 text-xs">
                  Supported formats: JPG, PNG, WebP, GIF (max 1MB)
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isUploading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Add Sport"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
