"use client";

import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const emailNumber = formData.get("emailNumber") as string;

    if (!emailNumber) {
      alert("Please enter your email or phone number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/subscriber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailNumber }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          alert("You are already subscribed.");
        } else {
          alert(result?.message || "An error occurred while subscribing.");
        }
        return;
      }

      alert("Subscription successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while subscribing.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lg:mx-4 mx-auto md:max-w-3xl lg:max-w-full max-w-88 bg-black text-white rounded-4xl p-8 lg:p-4 md:grid md:grid-cols-2 lg:grid-cols-4">
      <div className="md:w-80 h-88 rounded-2xl overflow-hidden">
        <Image
          alt="sports"
          src={
            "https://res.cloudinary.com/hotel-booking-1301/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1749104766/psfa-landing-page/wwkdqhs4pig5yww8iq2j.jpg"
          }
          width={500}
          height={400}
          className=" w-80 h-88 object-cover"
        />
      </div>
      <div className="lg:col-span-3 lg:mt-4 mt-8 gap-6 flex flex-col justify-center">
        <div className="flex gap-4">
          <p className="px-3 text tracking-tight py-1 border border-gray-300 rounded-full">
            Subscribe
          </p>
          <p className="px-3 text-black bg-gray-300 tracking-tight py-1 border border-gray-300 rounded-full">
            Sports News
          </p>
        </div>
        <div className="">
          <h3 className=" text-4xl lg:text-6xl leading">
            Get the Latest Sports News, Special Offers and Exclusive Event
            Invitations!
          </h3>
        </div>
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 flex items-center justify-between bg-gray-900 border border-gray-700 rounded-full lg:w-2xl">
          <input
            className=" w-full font-thin outline-0"
            type="text"
            name="emailNumber"
            placeholder="Enter your emai "
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-2 hover:cursor-pointer"
            disabled={isLoading}>
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <SendHorizontal className="w-6 h-6" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
