"use client";

import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash } from "lucide-react";

// Define job position without id and timestamps
export interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

interface JobFormValues {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string;
  benefits: string;
}

// Modal for adding or editing jobs
const AddEditJobModal: React.FC<{
  job?: JobPosition;
  index?: number;
  onSubmit: (data: JobPosition, index?: number) => void;
}> = ({ job, index, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    defaultValues: job
      ? {
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type,
          experience: job.experience,
          description: job.description,
          requirements: job.requirements.join(", "),
          benefits: job.benefits.join(", "),
        }
      : {
          title: "",
          department: "",
          location: "",
          type: "Full Time",
          experience: "0",
          description: "",
          requirements: "",
          benefits: "",
        },
  });

  const handleOnSubmit = (values: JobFormValues) => {
    const newJob: JobPosition = {
      title: values.title,
      department: values.department,
      location: values.location,
      type: values.type,
      experience: values.experience,
      description: values.description,
      requirements: values.requirements.split(",").map((r) => r.trim()),
      benefits: values.benefits.split(",").map((b) => b.trim()),
    };
    onSubmit(newJob, index);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex bg-indigo-800 hover:bg-indigo-700 hover:text-white text-white items-center space-x-2">
          {job ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{job ? "Edit" : "Add New Job"}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg p-0">
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col h-[70vh]">
          {/* Scrollable content */}
          <div className="overflow-y-auto px-6 py-4 space-y-4">
            <DialogHeader>
              <DialogTitle>{job ? "Edit Job" : "Add Job"}</DialogTitle>
              <DialogDescription>
                {job
                  ? "Update job details and click save."
                  : "Fill in the fields to create a new job opening."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              {[
                ["title", "Job Title"],
                ["department", "Department"],
                ["location", "Location"],
              ].map(([field, label]) => (
                <div key={field} className="space-y-1">
                  <Label htmlFor={field}>{label}</Label>
                  <Input
                    id={field}
                    {...register(field as keyof JobFormValues, {
                      required: `${label} is required`,
                    })}
                  />
                  {errors[field as keyof JobFormValues] && (
                    <p className="text-red-600">
                      {errors[field as keyof JobFormValues]?.message}
                    </p>
                  )}
                </div>
              ))}

              {/* Type selection */}
              <div className="space-y-1">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  {...register("type", { required: "Type is required" })}
                  className="block w-full px-3 py-2 border rounded-lg">
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
                {errors.type && (
                  <p className="text-red-600">{errors.type.message}</p>
                )}
              </div>

              {/* Experience selection */}
              <div className="space-y-1">
                <Label htmlFor="experience">Experience (Years)</Label>
                <select
                  id="experience"
                  {...register("experience", {
                    required: "Experience is required",
                  })}
                  className="block w-full px-3 py-2 border rounded-lg">
                  {Array.from({ length: 11 }, (_, i) => (
                    <option key={i} value={i.toString()}>
                      {i}
                      {i === 10 ? "+" : ""}
                    </option>
                  ))}
                </select>
                {errors.experience && (
                  <p className="text-red-600">{errors.experience.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="requirements">
                  Requirements (comma separated)
                </Label>
                <Textarea
                  id="requirements"
                  rows={2}
                  {...register("requirements", {
                    required: "At least one requirement is required",
                  })}
                />
                {errors.requirements && (
                  <p className="text-red-600">{errors.requirements.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="benefits">Benefits (comma separated)</Label>
                <Textarea
                  id="benefits"
                  rows={2}
                  {...register("benefits", {
                    required: "At least one benefit is required",
                  })}
                />
                {errors.benefits && (
                  <p className="text-red-600">{errors.benefits.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer always visible */}
          <DialogFooter className="px-6 py-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{job ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Confirmation dialog for deletion by index
const DeleteJobDialog: React.FC<{
  index: number;
  title: string;
  onConfirm: (index: number) => void;
}> = ({ index, title, onConfirm }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" className="text-red-600">
        <Trash className="w-4 h-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-xs">
      <DialogHeader>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete <b>{title}</b>? This action cannot be
          reversed.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button variant="destructive" onClick={() => onConfirm(index)}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default function JobsTab() {
  const [jobs, setJobs] = useState<JobPosition[]>([]);

  const handleSave = (job: JobPosition, index?: number) => {
    setJobs((prev) => {
      if (typeof index === "number") {
        const updated = [...prev];
        updated[index] = job;
        return updated;
      }
      return [job, ...prev];
    });
  };

  const handleDelete = (index: number) => {
    setJobs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Job Openings</h2>
          <p className="text-gray-600 mt-1">Manage your job openings</p>
        </div>
        <AddEditJobModal onSubmit={handleSave} />
      </div>

      {jobs.length ? (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Department</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Experience</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{job.title}</td>
                  <td className="px-4 py-2">{job.department}</td>
                  <td className="px-4 py-2">{job.location}</td>
                  <td className="px-4 py-2">{job.type}</td>
                  <td className="px-4 py-2">{job.experience} yrs</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <AddEditJobModal
                      job={job}
                      index={idx}
                      onSubmit={handleSave}
                    />
                    <DeleteJobDialog
                      index={idx}
                      title={job.title}
                      onConfirm={handleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <Trash className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Job Openings Yet
          </h3>
          <p className="text-gray-600">
            Add new positions using the button above.
          </p>
        </div>
      )}
    </div>
  );
}
