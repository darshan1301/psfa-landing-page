// components/AddAcademyForm.tsx
import React, { useState } from "react";
import { Plus } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Academy } from "./DashboardPage/SportsAcademyTab";
import Image from "next/image";

interface AddAcademyFormProps {
  onAdd: (academy: Academy) => void | Promise<void>;
}

export function AddAcademyForm({ onAdd }: AddAcademyFormProps) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<(File | null)[]>([null, null, null]);
  const [error, setError] = useState<string>("");
  const [uploadedUrls, setUploadedUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);

  const {
    isUploading,
    error: uploadError,
    uploadImage,
    reset,
  } = useImageUpload();

  const handleImageChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    reset();

    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    try {
      const url = await uploadImage(file, "academies");
      setFiles((prev) => {
        const updated = [...prev];
        updated[index] = file;
        return updated;
      });
      setUploadedUrls((prev) => {
        const updated = [...prev];
        updated[index] = url || null;
        return updated;
      });
    } catch {
      // error is shown by hook via uploadError
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const validUrls = uploadedUrls.filter((url): url is string => Boolean(url));
    if (validUrls.length < 1) {
      setError("Please upload at least 1 image.");
      return;
    }

    try {
      const payload = {
        name,
        location,
        description,
        images: validUrls,
      };
      const res = await fetch("/api/panel-api/sports-academy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create academy");
      }
      const newAcademy: Academy = await res.json();
      onAdd(newAcademy);
      // Optionally reset form
      setName("");
      setLocation("");
      setDescription("");
      setFiles([null, null, null]);
      setUploadedUrls([null, null, null]);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Academy</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Academy</DialogTitle>
          <DialogDescription>
            Upload up to 3 images (max 1MB each) to showcase the academy.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Academy Name
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Images (at least 1, up to 3)
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className="border-2 border-dashed border-gray-300 p-2 rounded">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={(e) => handleImageChange(idx, e)}
                    className="block w-full text-sm"
                  />
                  {isUploading && <p className="text-sm mt-1">Uploading...</p>}
                  {uploadError && (
                    <p className="text-red-600 text-sm mt-1">{uploadError}</p>
                  )}
                  {files[idx] && (
                    <Image
                      height={96}
                      width={96}
                      src={URL.createObjectURL(files[idx] as File)}
                      alt={`preview-${idx}`}
                      className="w-full h-24 object-cover rounded mt-2 border"
                    />
                  )}
                </div>
              ))}
            </div>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isUploading}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
