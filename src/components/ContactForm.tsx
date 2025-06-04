import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React from "react";

const ContactForm = () => {
  return (
    <div className="lg:mx-4 mx-auto lg:max-w-full max-w-88 bg-black text-white rounded-4xl p-8 lg:p-4  lg:grid lg:grid-cols-4">
      <div className="w-72 h-80 rounded-2xl overflow-hidden">
        <Image
          alt="sports"
          src={"/pexels-expressivestanley-3148452.jpg"}
          width={500}
          height={400}
          className="h-80 w-72 object-cover"
        />
      </div>
      <div className="col-span-3 lg:mt-4 mt-8 gap-6 flex flex-col justify-center">
        <div className="flex gap-4">
          <p className="px-3 text tracking-tight py-1 border border-gray-300 rounded-full">
            Subscribe
          </p>
          <p className="px-3 text-black bg-gray-300 tracking-tight py-1 border border-gray-300 rounded-full">
            Exclusive Offers!
          </p>
        </div>
        <div className="">
          <h3 className="text-5xl leading">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </h3>
        </div>
        <div className=" px-4 py-3 flex items-center justify-between bg-gray-900 border border-gray-700 rounded-full lg:w-2xl">
          <input
            className=" w-full font-thin outline-0"
            type="text"
            name="emailNumber"
            placeholder="Enter your email or number "
          />
          <button className="px-2 hover:cursor-pointer">
            <SendHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
