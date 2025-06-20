import { Plus, Star } from "lucide-react";

export default function TestimonialsTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
          <p className="text-gray-600 mt-1">
            Manage customer testimonials and reviews
          </p>
        </div>
        <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg">
          <Plus className="w-5 h-5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Testimonials Yet
          </h3>
          <p className="text-gray-600">
            Customer testimonials and reviews will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}
