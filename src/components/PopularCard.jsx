// src/components/PropertyCard.js
import React from "react";
import { MdLocationOn } from "react-icons/md";

const PopularCard = ({ property }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg max-w-[290px] h-[410px]">
      <div
        className="w-full h-[60%] bg-cover bg-center"
        style={{ backgroundImage: `url(${property.image})` }}
      >
        <div className="h-full w-full flex flex-col justify-end bg-black bg-opacity-50 p-4">
          <p className="text-white text-lg font-semibold">{property.title}</p>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-lg font-bold">₦{property.price.toLocaleString()}</p>
        <div className="flex items-center text-gray-500 mb-2">
          <MdLocationOn />
          <p className="ml-2">{property.location}</p>
        </div>
        <div className="flex justify-between text-gray-500">
          <p>{property.bedrooms} Bed</p>
          <p>{property.bathrooms} Bath</p>
          <p>{property.size} sq ft</p>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
