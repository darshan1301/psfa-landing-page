"use client";

import { Edit, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../Loader";

type EnquiryStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CLOSED";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
  status: EnquiryStatus;
}

export default function LeadsTab() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleMessage = (id: string) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  // Fetch enquiries data
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/panel-api/enquiries");

        if (!response.ok) {
          throw new Error("Failed to fetch enquiries");
        }

        const data = await response.json();
        setEnquiries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  // Filter enquiries based on search term
  const filteredEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enquiry.phone && enquiry.phone.includes(searchTerm))
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status styling
  const getStatusStyle = (status: EnquiryStatus) => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-800";
      case "CONTACTED":
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Leads Enquiry</h2>
          <p className="text-gray-600 mt-1">
            Manage and track your lead inquiries ({enquiries.length} total)
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Add Lead</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-400" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <Loading message="Loading Enquiries" className="m-20" />
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <p className="text-red-600 mb-2">Error: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-blue-600 hover:text-blue-800 underline">
                  Try again
                </button>
              </div>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <p className="text-gray-600 mb-2">
                  {searchTerm
                    ? "No enquiries found matching your search."
                    : "No enquiries found."}
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="text-blue-600 hover:text-blue-800 underline">
                    Clear search
                  </button>
                )}
              </div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEnquiries.map((enquiry) => (
                  <tr key={enquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {enquiry.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {enquiry.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {enquiry.phone || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs cursor-pointer">
                      <div onClick={() => toggleMessage(enquiry.id)}>
                        {expandedRow === enquiry.id ? (
                          <span className="whitespace-pre-wrap">
                            {enquiry.message}
                          </span>
                        ) : (
                          <span
                            className="truncate block"
                            title="Click to view full message">
                            {enquiry.message.length > 60
                              ? enquiry.message.slice(0, 60) + "..."
                              : enquiry.message}
                          </span>
                        )}
                        <span className="text-blue-500 text-xs mt-1 inline-block">
                          {expandedRow === enquiry.id ? "Hide" : "Read more"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(
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
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          title="View details">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Edit enquiry">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Delete enquiry">
                          <Trash2 className="w-4 h-4 text-gray-500" />
                        </button>
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
