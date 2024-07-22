import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../App.css";

const propertyTypes = [
  "Bungalow",
  "Duplex",
  "Terrace",
  "Penthouse",
  "Detached house",
  "Mansion",
  "Apartment",
  "Traditional houses",
  "Apartments or flats",
  "Duplex design",
  "Townhouse",
  "Detached",
  "Maisonette",
];

const Hero = () => {
  const [bedroomCount, setBedroomCount] = useState(0);
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const navigate = useNavigate();

  const increment = () => setBedroomCount(bedroomCount + 1);
  const decrement = () => {
    if (bedroomCount > 0) {
      setBedroomCount(bedroomCount - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?location=${location}&propertyType=${propertyType}&bedrooms=${bedroomCount}`);
  };

  return (
    <div className="min-h-screen xl:min-h-[680px] w-full hero bg-cover relative">
      <div className="absolute bg-black bg-opacity-50 h-full w-full text-white">
        <Header />
        <div className="flex flex-col justify-center items-center h-full gap-16">
          <div className="w-full text-center flex justify-center flex-col items-center gap-8 mt-8">
            <h1 className="text-6xl font-bold">Browse Our Properties</h1>
            <p className="text-[26px] font-light w-[95%] md:w-[55%]">
              Find your perfect home among our curated properties. Start
              browsing now!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="h-[80px] hidden md:block w-4/5 no-radius-outline text-black">
            <div className="grid grid-cols-4 justify-between items-center h-full w-full bg-white rounded-lg">
              <div className="flex flex-col items-center border-r border-[#CAD4DE]">
                <p className="font-semibold">LOCATION</p>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Gbagada"
                  className="ml-4 w-32"
                />
              </div>
              <div className="flex flex-col items-center border-r border-[#CAD4DE]">
                <p className="font-semibold">PROPERTY TYPE</p>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="ml-4 w-auto cursor-pointer p-2 rounded-lg"
                >
                  <option value="">Select Property Type</option>
                  {propertyTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">BEDROOM</p>
                <span className="flex gap-8 items-center">
                  <button
                    type="button"
                    className="h-7 w-7 flex items-center justify-center border rounded-full"
                    onClick={decrement}
                  >
                    -
                  </button>
                  <p>{bedroomCount}</p>
                  <button
                    type="button"
                    className="h-7 w-7 flex items-center justify-center border rounded-full"
                    onClick={increment}
                  >
                    +
                  </button>
                </span>
              </div>
              <button
                type="submit"
                className="h-full bg-[#3D9970] place-content-center rounded-r-lg text-white text-xl text-center hover:bg-green-700"
              >
                Find Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
