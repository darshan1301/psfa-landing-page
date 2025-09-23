// FacilitiesCarousel.tsx

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

type Sport = {
  id: number;
  name: string;
  image: string;
};
//accept sports as a prop
const FacilitiesCarousel = ({ sports }: { sports: Sport[] }) => {
  return (
    <div className="lg:max-w-fit bg-white lg:rounded-4xl lg:mx-4 px-6 py-4 pt-10 lg:px-16 lg:py-4 my-4">
      {/* Header / Search / View All */}
      <div className="flex lg:flex-row justify-between md:justify-center lg:justify-between mb-6 items-center md:my-10 gap-4">
        <div className="md:flex w-full md:gap-4 lg:items-center ">
          <span className="px-3 md:block hidden py-1 border border-gray-300 rounded-full tracking-tight text-gray-900">
            Sports
          </span>
          <h2 className="text-black text-xl max-w-fit md:max-w-full lg:px-4 leading-tight lg:font-normal tracking-tighter md:text-2xl lg:text-3xl">
            Sports:
          </h2>
        </div>
      </div>

      {/* Carousel */}
      <div className=" grid lg:grid-cols-4 md:grid-cols-3 md:gap-4 gap-2 lg:gap-6 grid-cols-2">
        {sports.map((facility) => (
          <div key={facility.id} className="px-1">
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src={facility.image}
                alt={facility.name}
                height={1080}
                width={1920}
                className="w-full transition-all hover:h-100 overflow-hidden h-44 md:h-96 object-cover"
              />
              {/* Tag Pill */}
              <div className="absolute left-2 bottom-4 md:left-4 lg:font backdrop-blur-lg text-white font-medium tracking-tight px-3 py-1 rounded-full">
                {facility.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesCarousel;
