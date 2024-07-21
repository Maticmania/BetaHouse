import React, { useState } from "react";
import Header from "./Header";
import "../App.css";
import image from "../assets/images/Hero.jpeg";

const Hero = () => {
  const [bedroomCount, setBedroomCount] = useState(0);

  const increment = () => setBedroomCount(bedroomCount + 1);
  const decrement = () => {
    if (bedroomCount > 0) {
      setBedroomCount(bedroomCount - 1);
    }
  };

  return (
    <div className="min-h-screen xl:min-h-[680px] w-full hero bg-cover relative">
      <div className="absolute bg-black bg-opacity-50 h-full w-full text-white">
        <Header />
        <div className="flex flex-col justify-center items-center h-full gap-16">
          <div className="w-full  text-center flex justify-center flex-col items-center gap-8 mt-8">
            <h1 className="text-6xl font-bold ">Browse Our Properties</h1>
            <p className="text-[26px] font-light w-[95%] md:w-[55%]">
              Find your perfect home among our curated properties. Start
              browsing now!
            </p>
          </div>
          <form className="h-[80px] hidden md:block w-4/5  no-radius-outline text-black">
            <div className="grid grid-cols-4 justify-between items-center h-full w-full bg-white rounded-lg">
              {/* Location */}
              <div className="flex flex-col items-center border-r border-[#CAD4DE]">
                <p className="font-semibold">LOCATION</p>
                <input
                  type="text"
                  placeholder="eg. Gbagada"
                  className="ml-4 w-32"
                />
              </div>

              {/* Property Type */}
              <div className="flex flex-col items-center border-r border-[#CAD4DE]">
                <p className="font-semibold">PROPERTY TYPE</p>
                <input
                  type="text"
                  placeholder="eg. Duplex, Bedroom Flat"
                  className="ml-4 w-auto"
                />
              </div>

              {/* Bedroom */}
              <div className="flex flex-col items-center ">
                <p className="font-semibold">BEDROOM</p>
                <span className="flex gap-8 items-center">
                  <button
                    className="h-7 w-7 flex items-center justify-center border rounded-full"
                    onClick={decrement}
                  >
                    -
                  </button>
                  <p>{bedroomCount}</p>
                  <button
                    className="h-7 w-7 flex items-center justify-center border rounded-full"
                    onClick={increment}
                  >
                    +
                  </button>
                </span>
              </div>
              <button type="submit" className="h-full bg-[#3D9970] place-content-center rounded-r-lg text-white text-xl text-center hover:bg-green-700">
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
