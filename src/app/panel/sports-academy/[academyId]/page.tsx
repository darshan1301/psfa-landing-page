"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Calendar,
  User,
  Trophy,
  Clock,
} from "lucide-react";
import Loading from "@/components/Loader";

interface Batch {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  sport: string;
  headCoach: string;
  description?: string;
  startTime: string;
  endTime: string;
}

// interface SportsAcademy {
//   id: string;
//   name: string;
//   description: string;
//   location: string;
//   images: string[];
//   isActive: boolean;
//   batches: Batch[];
// }

export default function EditAcademyPage() {
  const router = useRouter();
  const { academyId } = useParams();

  // Removed unused 'academy' state
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingStates, setUploadingStates] = useState([false, false, false]);
  const [addingBatch, setAddingBatch] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);
  const [isActive, setIsActive] = useState(true);
  const [batches, setBatches] = useState<Batch[]>([]);

  // New batch form
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [newBatch, setNewBatch] = useState({
    name: "",
    startDate: "",
    endDate: "",
    sport: "",
    headCoach: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  // Fetch academy data
  useEffect(() => {
    if (!academyId) {
      router.push("/academies");
      return;
    }

    const fetchAcademy = async () => {
      try {
        const response = await fetch(
          `/api/panel-api/sports-academy?id=${academyId}`
        );
        if (!response.ok) throw new Error("Failed to fetch academy");

        const data = await response.json();
        setName(data.name);
        setDescription(data.description);
        setLocation(data.location);

        // Convert existing images array to fixed 3-slot format
        const imageSlots: (string | null)[] = [null, null, null];
        data.images.forEach((img: string, index: number) => {
          if (index < 3) {
            imageSlots[index] = img;
          }
        });
        setImages(imageSlots);

        setIsActive(data.isActive);
        setBatches(data.batches || []);
      } catch (error) {
        console.error("Error fetching academy:", error);
        alert("Failed to load academy data");
      } finally {
        setLoading(false);
      }
    };

    fetchAcademy();
  }, [academyId, router]);

  // Handle individual image upload
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slotIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Update uploading state for this slot
    setUploadingStates((prev) => {
      const newStates = [...prev];
      newStates[slotIndex] = true;
      return newStates;
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "academies");

      const response = await fetch("/api/panel-api/imageUpload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();

      // Update the specific image slot
      setImages((prev) => {
        const newImages = [...prev];
        newImages[slotIndex] = result.url;
        return newImages;
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      // Reset uploading state for this slot
      setUploadingStates((prev) => {
        const newStates = [...prev];
        newStates[slotIndex] = false;
        return newStates;
      });
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (slotIndex: number) => {
    const imageUrl = images[slotIndex];
    if (images.length <= 1 || !imageUrl) {
      alert("No image to delete");
      return;
    }
    if (!imageUrl) return;

    try {
      await fetch(`/api/panel-api/imageUpload`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      // Clear the specific image slot
      setImages((prev) => {
        const newImages = [...prev];
        newImages[slotIndex] = null;
        return newImages;
      });
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image");
    }
  };

  // Handle batch operations
  const handleAddBatch = async () => {
    if (
      !newBatch.name ||
      !newBatch.startDate ||
      !newBatch.endDate ||
      !newBatch.sport ||
      !newBatch.headCoach ||
      !newBatch.startTime ||
      !newBatch.endTime
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setAddingBatch(true);
    try {
      const response = await fetch(`/api/panel-api/sports-academy/batches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          academyId,
          name: newBatch.name,
          startDate: newBatch.startDate,
          endDate: newBatch.endDate,
          sport: newBatch.sport,
          headCoach: newBatch.headCoach,
          description: newBatch.description || undefined,
          startTime: newBatch.startTime,
          endTime: newBatch.endTime,
        }),
      });

      if (!response.ok) throw new Error("Failed to create batch");

      const createdBatch = await response.json();

      // Add the new batch to the local state
      setBatches([...batches, createdBatch]);

      // Reset form
      setNewBatch({
        name: "",
        startDate: "",
        endDate: "",
        sport: "",
        headCoach: "",
        description: "",
        startTime: "",
        endTime: "",
      });
      setShowAddBatch(false);

      alert("Batch created successfully!");
    } catch (error) {
      console.error("Error creating batch:", error);
      alert("Failed to create batch");
    } finally {
      setAddingBatch(false);
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (!confirm("Are you sure you want to delete this batch?")) return;

    try {
      const response = await fetch(`/api/panel-api/sports-academy/batches`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ academyId, batchId }),
      });

      if (!response.ok) throw new Error("Failed to delete batch");

      setBatches(batches.filter((batch) => batch.id !== batchId));
      alert("Batch deleted successfully!");
    } catch (error) {
      console.error("Error deleting batch:", error);
      alert("Failed to delete batch");
    }
  };

  // Handle form submission (only academy details, not batches)
  const handleSave = async () => {
    // Check if at least one image is uploaded
    const validImages = images.filter((img) => img !== null);
    if (!name || !description || !location || validImages.length === 0) {
      alert("Please fill in all required fields and upload at least one image");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/panel-api/sports-academy`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: academyId,
          name,
          description,
          location,
          images: validImages, // Only send non-null images
          isActive,
          // Note: batches are handled separately
        }),
      });

      if (!response.ok) throw new Error("Failed to save academy");

      alert("Academy updated successfully!");
      router.push("/panel?tab=sports-academy");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save academy");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen py-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push("/panel?tab=sports-academy")}
              className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Academies</span>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Edit Academy</h1>
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Academy Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter academy name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter academy description"
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter academy location"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
                <Label htmlFor="isActive">Academy is active</Label>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images (Upload 1-3 images) *</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Three Individual Image Upload Slots */}
                {images.map((imageUrl, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`image-${index}`}>
                      Image {index + 1} {index === 0 ? "*" : "(Optional)"}
                    </Label>

                    {imageUrl ? (
                      // Display existing image with delete option
                      <div className="relative group">
                        <Image
                          src={imageUrl}
                          alt={`Academy image ${index + 1}`}
                          width={300}
                          height={200}
                          className="object-cover w-full h-48 rounded-lg border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteImage(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      // Display upload area
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-3 text-sm">
                          {uploadingStates[index]
                            ? "Uploading..."
                            : `Upload image ${index + 1}`}
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          disabled={uploadingStates[index]}
                          className="hidden"
                          id={`image-${index}`}
                        />
                        <Label
                          htmlFor={`image-${index}`}
                          className="cursor-pointer bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors text-sm">
                          {uploadingStates[index]
                            ? "Uploading..."
                            : "Choose Image"}
                        </Label>
                      </div>
                    )}
                  </div>
                ))}

                {/* Info text */}
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  <p className="font-medium">Image Requirements:</p>
                  <ul className="mt-1 list-disc list-inside text-xs space-y-1">
                    <li>At least 1 image is required</li>
                    <li>Maximum 3 images allowed</li>
                    <li>Accepted formats: JPG, PNG, GIF</li>
                    <li>Recommended size: 1200x800 pixels</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Batches */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Batches</CardTitle>
              <Button
                variant="outline"
                onClick={() => setShowAddBatch(true)}
                className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Batch</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Existing Batches */}
              {batches.map((batch) => (
                <div key={batch.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{batch.name}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteBatch(batch.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-600">Sport:</span>
                      <span className="font-medium">{batch.sport}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-green-600" />
                      <span className="text-gray-600">Coach:</span>
                      <span className="font-medium">{batch.headCoach}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {new Date(batch.startDate).toLocaleDateString()} -{" "}
                        {new Date(batch.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-600">Start Time:</span>
                      <span className="font-medium">{batch.startTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span className="text-gray-600">End Time:</span>
                      <span className="font-medium">{batch.endTime}</span>
                    </div>
                  </div>

                  {batch.description && (
                    <p className="mt-3 text-gray-600 text-sm">
                      {batch.description}
                    </p>
                  )}
                </div>
              ))}

              {/* Add New Batch Form */}
              {showAddBatch && (
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Add New Batch</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddBatch(false)}
                      disabled={addingBatch}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="batchName">Batch Name *</Label>
                      <Input
                        id="batchName"
                        value={newBatch.name}
                        onChange={(e) =>
                          setNewBatch({ ...newBatch, name: e.target.value })
                        }
                        placeholder="e.g., Morning Cricket Batch"
                        disabled={addingBatch}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sport">Sport *</Label>
                      <Input
                        id="sport"
                        value={newBatch.sport}
                        onChange={(e) =>
                          setNewBatch({ ...newBatch, sport: e.target.value })
                        }
                        placeholder="e.g., Cricket, Football"
                        disabled={addingBatch}
                      />
                    </div>
                    <div>
                      <Label htmlFor="headCoach">Head Coach *</Label>
                      <Input
                        id="headCoach"
                        value={newBatch.headCoach}
                        onChange={(e) =>
                          setNewBatch({
                            ...newBatch,
                            headCoach: e.target.value,
                          })
                        }
                        placeholder="Coach name"
                        disabled={addingBatch}
                      />
                    </div>
                    <div>
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={newBatch.startDate}
                        onChange={(e) =>
                          setNewBatch({
                            ...newBatch,
                            startDate: e.target.value,
                          })
                        }
                        disabled={addingBatch}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newBatch.endDate}
                        onChange={(e) =>
                          setNewBatch({ ...newBatch, endDate: e.target.value })
                        }
                        disabled={addingBatch}
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newBatch.startTime}
                        onChange={(e) =>
                          setNewBatch({
                            ...newBatch,
                            startTime: e.target.value,
                          })
                        }
                        disabled={addingBatch}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newBatch.endTime}
                        onChange={(e) =>
                          setNewBatch({
                            ...newBatch,
                            endTime: e.target.value,
                          })
                        }
                        disabled={addingBatch}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="batchDescription">Description</Label>
                    <Textarea
                      id="batchDescription"
                      value={newBatch.description}
                      onChange={(e) =>
                        setNewBatch({
                          ...newBatch,
                          description: e.target.value,
                        })
                      }
                      placeholder="Additional details about the batch"
                      rows={3}
                      disabled={addingBatch}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddBatch(false)}
                      disabled={addingBatch}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddBatch} disabled={addingBatch}>
                      {addingBatch ? "Creating..." : "Add Batch"}
                    </Button>
                  </div>
                </div>
              )}

              {batches.length === 0 && !showAddBatch && (
                <div className="text-center py-8 text-gray-500">
                  No batches added yet. Click &quot;Add Batch&quot; to create
                  one.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
