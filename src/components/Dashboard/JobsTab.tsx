import { Plus, Briefcase } from "lucide-react";

export default function JobsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Job Applications</h2>
          <p className="text-gray-600 mt-1">
            Review and manage job applications
          </p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Post New Job</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Job Applications Yet
          </h3>
          <p className="text-gray-600">
            Job applications will appear here once candidates start applying.
          </p>
        </div>
      </div>
    </div>
  );
}
