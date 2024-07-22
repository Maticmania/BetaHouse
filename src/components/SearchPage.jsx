import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./Header";
import PropertyCard from "./PropertyCard";

const SearchPage = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const loadingMessages = [
    "Wait a moment...",
    "Fetching properties...",
    "Loading data...",
    "Please hold on...",
    "Almost there...",
    "Just a few seconds more...",
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get("location");
    const propertyType = searchParams.get("propertyType");
    const bedrooms = searchParams.get("bedrooms");

    // Set up a message interval for loading
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 3000);

    // Fetch search results
    axios
      .get(
        `/product/search?location=${locationParam}&propertyType=${propertyType}&bedrooms=${bedrooms}`
      )
      .then((response) => {
        if (response.data.success) {
          setResults(response.data.products);
        } else {
          // If no matching products are found, fetch the latest products for suggestions
          axios
            .get("/product/all")
            .then((allProductsResponse) => {
              setSuggestedProducts(allProductsResponse.data.products);
            })
            .catch((error) => {
              toast.error("Error fetching suggested products");
              console.error("Error fetching suggested products:", error);
            });
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching search results");
        console.error("Error fetching search results:", error);
        setLoading(false);
      });

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [location.search]);

  return (
    <>
      <Header />
      <div className="pt-[120px] xl:px-20 md:px-8 py-8">
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
          <div>
            <h1 className="text-3xl font-bold mb-4">Search Results</h1>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                {results.map((result, index) => (
                  <PropertyCard property={result} />
                ))}
              </div>
            ) : (
              <div>
                <p className="font-medium">
                  No matching properties found. Here are some other properties
                  you might like:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {suggestedProducts.map((product, index) => (
                    <PropertyCard property={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
