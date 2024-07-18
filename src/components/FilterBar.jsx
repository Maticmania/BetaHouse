// src/components/FilterBar.js
import React from 'react';

const FilterBar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-8 bg-white  mt-20">
      <div>
        <button className="text-blue-500">More Filter</button>
        <span className="ml-4 text-gray-600">Showing 1-10 of 15 results</span>
      </div>
      <div>
        <label className="mr-2">Sort by:</label>
        <select className="border border-gray-300 rounded-md">
          <option>Default</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
