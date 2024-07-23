import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import PropertyCard from "../components/PropertyCard";
import Pagination from "../components/Pagination";
import axios from "axios";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(15);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [sortParams, setSortParams] = useState(
    JSON.parse(localStorage.getItem("sortParams")) || { sortBy: "title", order: "asc" }
  );
  const propertiesPerPage = 12;
  const loadingMessages = [
    "Wait a moment...",
    "Fetching properties...",
    "Loading data...",
    "Please hold on...",
    "Almost there...",
    "Just a few seconds more...",
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://betahouse-api.onrender.com/api/product/all`, {
          params: {
            page: currentPage,
            limit: propertiesPerPage,
            sortBy: sortParams.sortBy,
            order: sortParams.order,
          },
        });

        const { products, pagination } = response.data;
        setProperties(products);
        setTotalPages(pagination.totalPages);
        setTotal(pagination.totalCount);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage, sortParams]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortParams) => {
    setSortParams(sortParams);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const interval = setInterval(() => {
    setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
  }, 5000);

  return (
    <div id="properties">
      <div className="mt-[40px] xl:px-20">
        <FilterBar totalPages={totalPages} total={total} limit={propertiesPerPage} onSortChange={handleSortChange} />
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="mt-4">
                <svg
                  className="animate-spin h-10 w-10 text-green-600 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C6.476 0 0 6.476 0 12h4z"
                  ></path>
                </svg>
              </div>
              <div className="text-xl font-semibold text-gray-700">
                {loadingMessages[currentMessage]}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(395px,_1fr)] md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {properties.map((property, index) => (
              <PropertyCard key={index} property={property} />
            ))}
          </div>
        )}
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
