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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Pencil, Plus } from "lucide-react";

// Types
interface MilestonePayload {
  id?: string;
  title: string;
  year: string;
  description: string;
  image: string;
}

type Props = {
  onSubmit: (payload: MilestonePayload) => void | Promise<void>;
  initialData?: MilestonePayload;
  triggerLabel?: string;
};

type FormData = {
  title: string;
  year: string;
  description: string;
  image: string;
};

export function AddMilestoneForm({
  onSubmit,
  initialData,
  triggerLabel = "Add Milestone",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>();

  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const {
    isUploading,
    error: uploadError,
    uploadImage,
    reset: resetUpload,
  } = useImageUpload();

  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("year", initialData.year);
      setValue("description", initialData.description);
      setUploadedUrl(initialData.image);
    }
  }, [initialData, setValue]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    resetUpload();

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError("Image must be less than 1MB.");
      return;
    }

    try {
      const url = await uploadImage(file, "milestones");
      setFile(file);
      setUploadedUrl(url || null);
    } catch {
      setError("Upload failed. Try again.");
    }
  };

  const handleImageDelete = async () => {
    if (!uploadedUrl) return;

    try {
      const res = await fetch("/api/panel-api/imageUpload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: uploadedUrl }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to delete image");

      setFile(null);
      setUploadedUrl(null);
    } catch (err) {
      console.error("Image delete failed:", err);
      setError("Failed to delete image. Try again.");
    }
  };

  const onInternalSubmit = async (data: MilestonePayload) => {
    setError("");

    if (!uploadedUrl) {
      setError("Please upload an image.");
      return;
    }

    const payload: MilestonePayload = {
      ...data,
      image: uploadedUrl,
    };

    try {
      await onSubmit(payload);
      reset();
      setFile(null);
      setUploadedUrl(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          {isEdit ? (
            <Pencil className="w-4 h-4" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
          <span>{triggerLabel}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit" : "Add"} Milestone</DialogTitle>
          <DialogDescription>
            Upload 1 image (≤ 1MB). All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onInternalSubmit)} className="space-y-4">
          <InputBlock
            label="Title"
            register={register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />

          <InputBlock
            label="Year"
            register={register("year", { required: "Year is required" })}
            error={errors.year?.message}
          />

          <TextareaBlock
            label="Description"
            register={register("description", {
              required: "Description is required",
            })}
            error={errors.description?.message}
          />

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm"
            />
            {isUploading && <p className="text-sm mt-1">Uploading...</p>}
            {uploadError && (
              <p className="text-red-600 text-sm mt-1">{uploadError}</p>
            )}
            {uploadedUrl && (
              <div className="relative mt-2">
                <Image
                  height={96}
                  width={96}
                  src={file ? URL.createObjectURL(file) : uploadedUrl}
                  alt={`preview`}
                  className="w-full h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="absolute top-1 right-1 bg-white rounded-full shadow p-1 hover:bg-red-100"
                  title="Delete Image">
                  <span className="text-xs text-red-600 font-bold">×</span>
                </button>
              </div>
            )}
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

function InputBlock({
  label,
  register,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  register: import("react-hook-form").UseFormRegisterReturn;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Input type={type} {...register} placeholder={placeholder} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

function TextareaBlock({
  label,
  register,
  error,
}: {
  label: string;
  register: import("react-hook-form").UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Textarea {...register} />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Types
interface MilestonePayload {
  id?: string;
  title: string;
  year: string;
  description: string;
  image: string;
}
