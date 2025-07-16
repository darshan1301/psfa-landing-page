"use client";

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
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Eye, Trash } from "lucide-react";

// Define application interface
export interface JobApplication {
  fullName: string;
  email: string;
  phone?: string;
  resume: string;
  status: string;
  createdAt: string;
  experience: string;
  coverLetter: string;
  jobPosition: {
    title: string;
  };
  id: string;
}

interface StatusFormValues {
  status: string;
}

export default function ApplicationsTab() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  async function fetchApplications() {
    try {
      const res = await fetch("/api/panel-api/job-applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching the job applications", error);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

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
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Applications
        </h2>
        <p className="text-sm text-gray-500">{applications.length} total</p>
      </div>

      {applications.length ? (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">
                        {app.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {app.experience}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{app.email}</div>
                      {app.phone && (
                        <div className="text-sm text-gray-500">{app.phone}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          app.status === "APPLIED"
                            ? "bg-blue-100 text-blue-800"
                            : app.status === "ACCEPTED"
                            ? "bg-green-100 text-green-800"
                            : app.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <JobApplications
                          application={app}
                          index={idx}
                          onUpdate={handleUpdate}
                        />
                        <DeleteApplicationDialog
                          index={idx}
                          applicantName={app.fullName}
                          onConfirm={handleDelete}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-gray-400 mb-2">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No applications received yet</p>
        </div>
      )}
    </div>
  );
}

// Modal to view and update application status
const JobApplications: React.FC<{
  application: JobApplication;
  index: number;
  onUpdate: (data: JobApplication, index: number) => void;
}> = ({ application, index, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { register, handleSubmit, reset } = useForm<StatusFormValues>({
    defaultValues: { status: application.status },
  });

  const submitStatus = async (values: StatusFormValues) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/panel-api/job-applications`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: values.status,
          applicationId: application.id,
        }),
      });

      if (response.ok) {
        const updatedApplication = await response.json();
        onUpdate(updatedApplication, index);
        reset({ status: values.status });
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {application.fullName}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Applying for {application.jobPosition.title}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitStatus)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-medium text-gray-500 uppercase">
                  Email
                </Label>
                <p className="text-sm text-gray-900 mt-1">
                  {application.email}
                </p>
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500 uppercase">
                  Phone
                </Label>
                <p className="text-sm text-gray-900 mt-1">
                  {application.phone || "—"}
                </p>
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500 uppercase">
                  Applied
                </Label>
                <p className="text-sm text-gray-900 mt-1">
                  {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-500 uppercase">
                  Position
                </Label>
                <p className="text-sm text-gray-900 mt-1">
                  {application.jobPosition.title}
                </p>
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-500 uppercase">
                Experience
              </Label>
              <p className="text-sm text-gray-900 mt-1">
                {application.experience}
              </p>
            </div>

            <div>
              <Label className="text-xs font-medium text-gray-500 uppercase">
                Resume
              </Label>
              <div className="mt-1">
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800">
                  <span>View Resume</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {application.coverLetter && (
              <div>
                <Label className="text-xs font-medium text-gray-500 uppercase">
                  Cover Letter
                </Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm text-gray-700 max-h-32 overflow-y-auto">
                  {application.coverLetter}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <Label className="text-xs font-medium text-gray-500 uppercase mb-2 block">
                Update Status
              </Label>
              <Select {...register("status")}>
                <option value="APPLIED">Applied</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm" disabled={isUpdating}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" size="sm" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
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
