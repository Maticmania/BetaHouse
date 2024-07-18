// src/pages/Properties.js
import React, { useState } from 'react';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';

const properties = [
  {
    title: 'Real House Luxury Villa',
    location: 'Victoria Island, Lagos',
    price: 'N3,340,000,000',
    bedrooms: 5,
    bathrooms: 3,
    image: '/path_to_image1.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  {
    title: 'Exquisite Haven Villa',
    location: 'Lekki, Lagos',
    price: 'N4,000,000/Year',
    bedrooms: 6,
    bathrooms: 4,
    image: '/path_to_image2.jpg',
  },
  // Add more property objects as needed
];

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 10;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const currentProperties = properties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="mt-[120px]">
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {currentProperties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Properties;
