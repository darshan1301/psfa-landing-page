"use client";

import { Edit, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loading from "../Loader";
import { useForm } from "react-hook-form";

// Define possible enquiry statuses
type EnquiryStatus = "NEW" | "IN_PROGRESS" | "QUALIFIED" | "CLOSED";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
  status: EnquiryStatus;
}

interface LeadFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export default function LeadsTab() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Dialog state and handler
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<EnquiryStatus>("NEW");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  // Toggle full/truncated message
  const toggleMessage = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  // Submit new lead (add)
  const onSubmit = (data: LeadFormData) => {
    console.log("Submitting lead:", data);
    // TODO: API call to save
    reset();
  };

  // Fetch enquiries on mount
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/panel-api/enquiries");
        if (!res.ok) throw new Error("Failed to fetch enquiries");
        const data: Enquiry[] = await res.json();
        setEnquiries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  // Handler to open view dialog
  const onViewEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setViewDialogOpen(true);
  };

  // Handler to open edit/dialog
  const onEditEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setStatusValue(enquiry.status);
    setEditDialogOpen(true);
  };

  // Handler to open delete
  const onDeleteEnquiry = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setDeleteDialogOpen(true);
  };

  // Update status via API
  const handleStatusUpdate = async () => {
    if (!selectedEnquiry) return;
    try {
      await fetch(`/api/panel-api/enquiries`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusValue, id: selectedEnquiry.id }),
      });
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === selectedEnquiry.id ? { ...e, status: statusValue } : e
        )
      );
    } catch (err) {
      console.error("Update status failed", err);
    } finally {
      setEditDialogOpen(false);
    }
  };

  // Delete via API
  const handleDeleteConfirm = async (id: string) => {
    if (!selectedEnquiry) return;
    try {
      await fetch(`/api/panel-api/enquiries`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      setEnquiries((prev) => prev.filter((e) => e.id !== selectedEnquiry.id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  // Filtered list
  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.phone && e.phone.includes(searchTerm))
  );

  // Format date
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Status badge styles
  const getStatusStyle = (st: EnquiryStatus) => {
    switch (st) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "QUALIFIED":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Lead */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Leads Enquiry</h2>
          <p className="text-gray-600 mt-1">
            Manage your leads ({enquiries.length})
          </p>
        </div>
        <Dialog>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-900 text-white flex items-center space-x-2 py-3 px-4 rounded-lg">
                <Plus className="w-5 h-5" />
                <span>Add Lead</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>Enter lead details below.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Name required" })}
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name.message}</p>
                  )}
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" {...register("phone")} />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="message">Message</Label>
                  <Input
                    id="message"
                    {...register("message", { required: "Message required" })}
                  />
                  {errors.message && (
                    <p className="text-red-600">{errors.message.message}</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Lead</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>

      {/* Search & Table */}
      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-400" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <Loading message="Loading" className="m-20" />
          ) : error ? (
            <div className="py-12 text-center text-red-600">
              {error}{" "}
              <button
                onClick={() => window.location.reload()}
                className="underline text-blue-600">
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-600">
              No enquiries found.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm">{enquiry.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {enquiry.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {enquiry.phone || "N/A"}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-gray-600 max-w-xs cursor-pointer"
                      onClick={() => toggleMessage(enquiry.id)}>
                      {expandedRow === enquiry.id
                        ? enquiry.message
                        : `${enquiry.message.slice(0, 60)}...`}
                      <br />
                      <span className="text-blue-500 text-xs">
                        {expandedRow === enquiry.id ? "Hide" : "Read more"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                          enquiry.status
                        )}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {/* View Dialog */}
                        <Dialog
                          open={
                            viewDialogOpen && selectedEnquiry?.id === enquiry.id
                          }
                          onOpenChange={(o) => !o && setViewDialogOpen(false)}>
                          <DialogTrigger asChild>
                            <button
                              onClick={() => onViewEnquiry(enquiry)}
                              className="p-1 hover:bg-gray-100 rounded">
                              <Eye className="w-4 h-4 text-gray-500" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Enquiry Details</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              <p>
                                <strong>Name:</strong> {selectedEnquiry?.name}
                              </p>
                              <p>
                                <strong>Email:</strong> {selectedEnquiry?.email}
                              </p>
                              <p>
                                <strong>Phone:</strong>{" "}
                                {selectedEnquiry?.phone || "N/A"}
                              </p>
                              <p>
                                <strong>Message:</strong>{" "}
                                {selectedEnquiry?.message}
                              </p>
                              <p>
                                <strong>Status:</strong>{" "}
                                {selectedEnquiry?.status}
                              </p>
                              <p>
                                <strong>Date:</strong>{" "}
                                {selectedEnquiry &&
                                  formatDate(selectedEnquiry.createdAt)}
                              </p>
                            </DialogDescription>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button>Close</Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        {/* Edit Status Dialog */}
                        <Dialog
                          open={
                            editDialogOpen && selectedEnquiry?.id === enquiry.id
                          }
                          onOpenChange={(o) => !o && setEditDialogOpen(false)}>
                          <DialogTrigger asChild>
                            <button
                              onClick={() => onEditEnquiry(enquiry)}
                              className="p-1 hover:bg-gray-100 rounded">
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Update Status</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              <Label htmlFor="status">Status</Label>
                              <select
                                id="status"
                                value={statusValue}
                                onChange={(e) =>
                                  setStatusValue(
                                    e.target.value as EnquiryStatus
                                  )
                                }
                                className="w-full border rounded p-2 mt-2">
                                <option value="NEW">NEW</option>
                                <option value="IN_PROGRESS">IN PROGRESS</option>
                                <option value="RESOLVED">QUALIFIED</option>
                                <option value="CLOSED">CLOSED</option>
                              </select>
                            </DialogDescription>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button onClick={handleStatusUpdate}>Save</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        {/* Delete Dialog */}
                        <Dialog
                          open={
                            deleteDialogOpen &&
                            selectedEnquiry?.id === enquiry.id
                          }
                          onOpenChange={(o) =>
                            !o && setDeleteDialogOpen(false)
                          }>
                          <DialogTrigger asChild>
                            <button
                              onClick={() => onDeleteEnquiry(enquiry)}
                              className="p-1 hover:bg-gray-100 rounded">
                              <Trash2 className="w-4 h-4 text-gray-500" />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Delete</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                              Are you sure you want to delete this enquiry?
                            </DialogDescription>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  handleDeleteConfirm(enquiry.id);
                                }}>
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
