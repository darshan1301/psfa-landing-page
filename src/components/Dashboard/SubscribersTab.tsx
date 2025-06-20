"use client";

import { Mail, MoreVertical, Plus, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "../Loader";

type Subscriber = {
  id: number;
  email?: string | null;
  phone?: string | null;
  isActive: boolean;
  createdAt: string; // ISO date string
};
export default function NewsletterTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/panel-api/subscribers");

        if (!response.ok) {
          throw new Error("Failed to fetch subscribers");
        }

        const data = await response.json();
        setSubscribers(data);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Newsletter Subscribers
          </h2>
          <p className="text-gray-600 mt-1">
            Manage your newsletter subscriber list
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
            <Mail className="w-5 h-5" />
            <span>Send Newsletter</span>
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
            <Plus className="w-5 h-5" />
            <span>Add Subscriber</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">1,234</p>
              <p className="text-sm text-gray-600">Total Subscribers</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">1,180</p>
              <p className="text-sm text-gray-600">Active Subscribers</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">95.6%</p>
              <p className="text-sm text-gray-600">Open Rate</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex my-48 justify-center items-center h-full">
          <Loading
            message="Loading Subscribers"
            variant="spinner"
            color="blue"
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Subscribed
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50">
                    {/* Email or Phone */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {subscriber.email || subscriber.phone || "N/A"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          subscriber.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                        {subscriber.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Created At */}
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(subscriber.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        title="More options">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
