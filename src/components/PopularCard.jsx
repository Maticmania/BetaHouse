import React from "react";
import { MdLocationOn } from "react-icons/md";

const PopularCard = ({ property }) => {
  return (
    <div className="p-4">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          className="w-full h-[410px] object-cover"
          src={property.image}
          alt={property.name}
        />
        <div className="absolute bottom-0 left-0 right-0 top-[60%] backdrop-blur-[2px] bg-black bg-opacity-50 text-white p-4 flex flex-col justify-between">
          <h3 className="text-lg font-semibold">{property.name}</h3>
          <p className="text-lg font-semibold">{property.price}</p>
          <p className="text-sm">
            <span>{property.bedrooms} Bed | </span>
            <span>{property.bathrooms} Bath </span>
            <span> | 720 sq ft</span>
          </p>
          <p className="text-sm flex items-center gap-2">
            <MdLocationOn />
            {property.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
