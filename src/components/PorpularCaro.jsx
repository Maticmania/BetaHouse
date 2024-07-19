// src/components/PropertyCarousel.js
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PopularCard from "./PopularCard";

const PropertyCarousel = ({ properties }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-bold text-center my-8">Discover Our Popular Properties</h2>
      <div className="relative flex items-center">
        <button
          className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md"
          onClick={scrollLeft}
        >
          <FaChevronLeft />
        </button>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-4 py-4 mx-8"
          style={{ scrollBehavior: "smooth" }}
        >
          {properties.map((property, index) => (
            <PopularCard key={index} property={property} />
          ))}
        </div>
        <button
          className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md"
          onClick={scrollRight}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PropertyCarousel;
