"use client";

import React, { useEffect, useState, useRef } from "react";
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
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Plus, Upload, Loader2, X } from "lucide-react";

interface MemberPayload {
  name: string;
  role: string;
  image: string;
  yearsOfExperience: number;
}

interface Props {
  onSubmit: (payload: MemberPayload) => void | Promise<void>;
}

export default function AddMemberForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<MemberPayload>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const {
    isUploading,
    error: uploadError,
    uploadedUrl,
    uploadImage,
    reset: resetUpload,
  } = useImageUpload();

  useEffect(() => {
    if (uploadedUrl) {
      setValue("image", uploadedUrl);
    }
  }, [uploadedUrl, setValue]);

  const onInternalSubmit = async (data: MemberPayload) => {
    if (!data.image) {
      setError("Please upload an image or provide a valid URL.");
      return;
    }

    try {
      await onSubmit(data);
      reset();
      resetUpload();
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError("Image size must be less than 1MB.");
      return;
    }

    try {
      await uploadImage(file, "team-members");
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Failed to upload image.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Team Member</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>
            Upload a profile image (≤ 1MB) and fill in all required fields.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onInternalSubmit)} className="space-y-4">
          <InputBlock
            label="Name"
            register={register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />

          <InputBlock
            label="Role"
            register={register("role", { required: "Role is required" })}
            error={errors.role?.message}
          />
          <InputBlock
            label="Experience (in years)"
            type="number"
            placeholder="e.g., 5"
            register={register("yearsOfExperience", {
              min: { value: 0, message: "Experience must be positive" },
            })}
            error={errors.yearsOfExperience?.message}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Image
            </label>
            <div className="flex gap-2 items-center">
              <Input
                type="url"
                placeholder="Or paste image URL"
                {...register("image")}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}>
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {watch("image") && (
              <div className="relative w-20 h-20 mt-2 rounded overflow-hidden border">
                <Image
                  fill
                  src={watch("image")}
                  alt="Preview"
                  className="object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0 h-5 w-5"
                  onClick={() => setValue("image", "")}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            )}

            {uploadError && (
              <p className="text-sm text-red-600 mt-1">{uploadError}</p>
            )}
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isUploading}>
              Create Member
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
