// src/pages/Properties.js
import React, { useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import { properties } from "../db/data";

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
    <div id="properties">
      <div className="mt-[40px] xl:px-20">
        <FilterBar />
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(395px,_1fr)] md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
          {currentProperties.map((property, index) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Properties;
