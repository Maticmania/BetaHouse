// src/components/PropertyCard.js
import React from 'react';
import { FaHeart, FaBath, FaBed } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={property.image} alt={property.title} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>
        <p className="mt-2 text-xl font-bold">{property.price}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <FaBed className="text-gray-600" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaBath className="text-gray-600" />
            <span>{property.bathrooms}</span>
          </div>
          <FaHeart className="text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
