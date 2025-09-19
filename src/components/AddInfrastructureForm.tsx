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
import { useImageUpload } from "@/hooks/useImageUpload";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Pencil, Plus } from "lucide-react";

type InfrastructurePayload = {
  id?: string;
  name: string;
  location: string;
  Area?: number;
  images: string[];
  Amenities: string[];
};

type Props = {
  onSubmit: (payload: InfrastructurePayload) => void | Promise<void>;
  initialData?: InfrastructurePayload;
  triggerLabel?: string;
};

type FormData = {
  name: string;
  location: string;
  Area?: number;
  Amenities: string;
};

export function AddInfrastructureForm({
  onSubmit,
  initialData,
  triggerLabel = "Add Infrastructure",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>();

  const [files, setFiles] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [uploadedUrls, setUploadedUrls] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
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
      setValue("name", initialData.name);
      setValue("location", initialData.location);
      setValue("Area", initialData.Area);
      setValue("Amenities", initialData.Amenities.join(", "));
      const filled = initialData.images.slice(0, 5);
      setUploadedUrls([...filled, ...Array(5 - filled.length).fill(null)]);
    } else {
      reset();
    }
  }, [initialData, reset, setValue]);

  const handleImageChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError("");
    resetUpload();

    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      setError("Each image must be less than 1MB.");
      return;
    }

    try {
      const url = await uploadImage(file, "sports");
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
    } catch {}
  };

  const handleImageDelete = async (index: number) => {
    const urlToDelete = uploadedUrls[index];
    if (!urlToDelete) return;

    try {
      const res = await fetch("/api/panel-api/imageUpload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: urlToDelete }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to delete image");

      const newFiles = [...files];
      const newUrls = [...uploadedUrls];
      newFiles[index] = null;
      newUrls[index] = null;

      setFiles(newFiles);
      setUploadedUrls(newUrls);
    } catch (err) {
      console.error("Image delete failed:", err);
      setError("Failed to delete image. Try again.");
    }
  };

  const onInternalSubmit = async (data: FormData) => {
    setError("");

    const validUrls = uploadedUrls.filter((url): url is string => Boolean(url));
    if (validUrls.length < 1) {
      setError("Please upload at least 1 image.");
      return;
    }

    const payload: InfrastructurePayload = {
      id: initialData?.id,
      ...data,
      Area: data.Area ? Number(data.Area) : undefined,
      images: validUrls,
      Amenities: data.Amenities.split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    };

    try {
      await onSubmit(payload);
      reset();
      setFiles([null, null, null, null, null]);
      setUploadedUrls([null, null, null, null, null]);
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
          <DialogTitle>{isEdit ? "Edit" : "Add"} Infrastructure</DialogTitle>
          <DialogDescription>
            Upload up to 5 images (each ≤ 1MB). All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onInternalSubmit)} className="space-y-4">
          <InputBlock
            label="Name"
            register={register("name", { required: "Name is required" })}
            error={errors.name?.message}
          />

          <InputBlock
            label="Location"
            register={register("location", {
              required: "Location is required",
            })}
            error={errors.location?.message}
          />

          <InputBlock
            label="Area (sqft)"
            register={register("Area")}
            type="number"
          />

          <InputBlock
            label="Amenities (comma-separated)"
            register={register("Amenities")}
            placeholder="Lights, Turf, Gym"
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Images (at least 1, up to 5)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4].map((idx) => (
                <div
                  key={idx}
                  className="border-2 border-dashed border-gray-300 p-2 rounded">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(idx, e)}
                    className="block w-full text-sm"
                  />
                  {isUploading && <p className="text-sm mt-1">Uploading...</p>}
                  {uploadError && (
                    <p className="text-red-600 text-sm mt-1">{uploadError}</p>
                  )}
                  {uploadedUrls[idx] && (
                    <div className="relative mt-2">
                      <Image
                        height={96}
                        width={96}
                        src={
                          files[idx]
                            ? URL.createObjectURL(files[idx] as File)
                            : (uploadedUrls[idx] as string)
                        }
                        alt={`preview-${idx}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(idx)}
                        className="absolute top-1 right-1 bg-white rounded-full shadow p-1 hover:bg-red-100"
                        title="Delete Image">
                        <span className="text-xs text-red-600 font-bold">
                          ×
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isUploading}>
              {isEdit ? "Update" : "Submit"}
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
