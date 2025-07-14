import { Star } from "lucide-react";
import { AddTestimonialForm } from "../AddTestimonialForm";
import { useEffect, useState } from "react";
import Image from "next/image";
import DeleteDialog from "../DeleteDialog";

export interface Testimonial {
  id?: string;
  name: string;
  membership: string;
  comment: string;
  image: string;
}

export default function TestimonialsTab() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(`/api/panel-api/testimonials`);
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  const handleAddTestimonial = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/panel-api/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonial),
      });

      if (!res.ok) throw new Error("Failed to add testimonial");

      const newTestimonial = await res.json();
      setTestimonials((prev) => [...prev, newTestimonial]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleUpdateTestimonial = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/panel-api/testimonials`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testimonial),
      });

      if (!res.ok) throw new Error("Failed to update testimonial");

      const updatedTestimonial = await res.json();
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === updatedTestimonial.id ? updatedTestimonial : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      const res = await fetch(`/api/panel-api/testimonials`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete testimonial");

      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (loading) {
    return (
      <div className="text-center text-gray-500">Loading testimonials...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Testimonials</h2>
          <p className="text-gray-600 mt-1">
            Manage customer testimonials and reviews
          </p>
        </div>
        <AddTestimonialForm
          triggerLabel="Add Testimonial"
          onSubmit={handleAddTestimonial}
        />
      </div>

      {testimonials.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <Image
                height={300}
                width={300}
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-80 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-600">{testimonial.membership}</p>
              <p className="text-gray-700">{testimonial.comment}</p>
              <div className="flex justify-between items-center mt-4">
                <AddTestimonialForm
                  initialData={testimonial}
                  onSubmit={handleUpdateTestimonial}
                />
                <DeleteDialog
                  triggerLabel="Delete Testimonial"
                  description="Are you sure you want to delete this testimonial?"
                  onConfirm={() => handleDeleteTestimonial(testimonial.id!)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
