import { Plus, Map } from "lucide-react";

export default function JourneyTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Journey Cards</h2>
          <p className="text-gray-600 mt-1">
            Create and manage journey timeline cards
          </p>
        </div>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Add Journey Card</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Map className="w-16 h-16 text-teal-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Journey Cards
          </h3>
          <p className="text-gray-600">
            Journey timeline cards and milestones will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
