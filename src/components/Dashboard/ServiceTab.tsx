import { Plus, Settings } from "lucide-react";

export default function ServicesTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Services</h2>
          <p className="text-gray-600 mt-1">Manage your service offerings</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Settings className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Services Listed
          </h3>
          <p className="text-gray-600">
            Your service offerings will be displayed and managed here.
          </p>
        </div>
      </div>
    </div>
  );
}
