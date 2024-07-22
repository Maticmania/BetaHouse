// src/components/Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center py-4">
      {pages.map(page => (
        <button
          key={page}
          className={`mx-2 px-4 py-2 border rounded ${currentPage === page ? 'bg-[#3D9970] text-white' : ' text-gray-700'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
