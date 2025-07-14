"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useImageUpload } from "@/hooks/useImageUpload";
import { Pencil, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

export interface Testimonial {
  id?: string;
  name: string;
  membership: string;
  comment: string;
  image: string;
}

interface AddTestimonialFormProps {
  initialData?: Testimonial;
  onSubmit: (data: Testimonial) => void | Promise<void>;
  triggerLabel?: string;
}

export function AddTestimonialForm({
  initialData,
  onSubmit,
  triggerLabel,
}: AddTestimonialFormProps) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(initialData?.image || "");
  const [uploading, setUploading] = useState(false);
  const { uploadImage } = useImageUpload();
  const isEditMode = !!initialData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Testimonial>({
    defaultValues: {
      name: initialData?.name || "",
      membership: initialData?.membership || "",
      comment: initialData?.comment || "",
    },
  });

  // Reset form values when modal is closed
  useEffect(() => {
    if (!open && !isEditMode) {
      reset({
        name: "",
        membership: "",
        comment: "",
      });
      setImage("");
    }
  }, [open, isEditMode, reset]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("Image size should be less than 1MB.");
      return;
    }

    try {
      setUploading(true);
      const uploadedUrl = await uploadImage(file, "testimonials");
      setImage(uploadedUrl);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmitInternal = async (formValues: Testimonial) => {
    if (!image) return;

    await onSubmit({
      ...formValues,
      id: initialData?.id,
      image,
    });

    setOpen(false);
    if (!isEditMode) {
      reset();
      setImage("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isEditMode ? "ghost" : "default"}
          className="flex border items-center gap-2">
          {isEditMode ? (
            <Pencil className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {triggerLabel || (isEditMode ? "Edit" : "Add Testimonial")}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the testimonial details below."
              : "Fill in the details to add a new testimonial. "}
            Image size should be less than 1MB.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitInternal)} className="space-y-4">
          <Input placeholder="Name" {...register("name", { required: true })} />
          <Input
            placeholder="Membership (e.g., Gold Member)"
            {...register("membership", { required: true })}
          />
          <Textarea
            placeholder="Comment"
            {...register("comment", { required: true })}
          />
          <div>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}
            {image && (
              <Image
                src={image}
                alt="Preview"
                width={100}
                height={100}
                className="rounded-md mt-2 object-cover"
              />
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || uploading || !image}>
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
