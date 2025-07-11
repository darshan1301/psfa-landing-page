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
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Eye, Trash } from "lucide-react";

// Define application interface
export interface JobApplication {
  applicantName: string;
  email: string;
  phone?: string;
  resumeUrl: string;
  status: string;
  appliedAt: string;
}

interface StatusFormValues {
  status: string;
}

// Modal to view and update application status
const JobApplications: React.FC<{
  application: JobApplication;
  index: number;
  onUpdate: (data: JobApplication, index: number) => void;
}> = ({ application, index, onUpdate }) => {
  const { register, handleSubmit, reset } = useForm<StatusFormValues>({
    defaultValues: { status: application.status },
  });

  const submitStatus = (values: StatusFormValues) => {
    onUpdate({ ...application, status: values.status }, index);
    reset({ status: values.status });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Eye className="w-4 h-4" />
          <span>View</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md p-0">
        <form
          onSubmit={handleSubmit(submitStatus)}
          className="flex flex-col h-[60vh]">
          <div className="overflow-y-auto px-6 py-4 space-y-4">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                Review applicant info and update status if needed.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3">
              <div>
                <Label>Name</Label>
                <Input value={application.applicantName} disabled />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={application.email} disabled />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={application.phone || "-"} disabled />
              </div>
              <div>
                <Label>Resume URL</Label>
                <Input value={application.resumeUrl} disabled />
              </div>
              <div>
                <Label>Applied At</Label>
                <Input value={application.appliedAt} disabled />
              </div>
              <div>
                <Label>Status</Label>
                <Select {...register("status")}>
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Confirmation dialog to delete application
const DeleteApplicationDialog: React.FC<{
  index: number;
  applicantName: string;
  onConfirm: (index: number) => void;
}> = ({ index, applicantName, onConfirm }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" className="text-red-600">
        <Trash className="w-4 h-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-xs">
      <DialogHeader>
        <DialogTitle>Delete Application</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete the application of{" "}
          <b>{applicantName}</b>? This cannot be undone.
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

export default function ApplicationsTab() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  const handleUpdate = (app: JobApplication, idx: number) => {
    setApplications((prev) => {
      const updated = [...prev];
      updated[idx] = app;
      return updated;
    });
  };

  const handleDelete = (idx: number) => {
    setApplications((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Job Applications</h2>
          <p className="text-gray-600 mt-1">Review and manage submissions</p>
        </div>
      </div>

      {applications.length ? (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-gray-700">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Applied At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{app.applicantName}</td>
                  <td className="px-4 py-2">{app.email}</td>
                  <td className="px-4 py-2">{app.status}</td>
                  <td className="px-4 py-2">{app.appliedAt}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <JobApplications
                      application={app}
                      index={idx}
                      onUpdate={handleUpdate}
                    />
                    <DeleteApplicationDialog
                      index={idx}
                      applicantName={app.applicantName}
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
          <p className="text-gray-600">No applications yet.</p>
        </div>
      )}
    </div>
  );
}
