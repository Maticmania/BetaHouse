
import React from 'react';

const PopularCard = ({ property }) => {
  return (
    <div className="p-4">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img className="w-full h-48 object-cover" src={property.image} alt={property.name} />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          <h3 className="text-lg font-bold">{property.name}</h3>
          <p className="text-sm">{property.price}</p>
          <p className="text-sm">{property.details}</p>
          <p className="text-sm">{property.location}</p>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;