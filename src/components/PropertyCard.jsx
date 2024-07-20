import React from "react";
import { FaHeart, FaBath } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoBedOutline, IoImageOutline, IoVideocam } from "react-icons/io5";
import { GiBathtub } from "react-icons/gi";
import { GoShareAndroid } from "react-icons/go";
import { BiTransfer } from "react-icons/bi";
import { IoIosHeartEmpty } from "react-icons/io";
import { GrLink } from "react-icons/gr";

const PropertyCard = ({ property }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg min-h-[540px]">
      <div
        className="relative w-full h-[297px] bg-cover bg-center"
        style={{ backgroundImage: `url(${property.image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <div className="relative h-full w-full flex flex-col justify-between p-4">
          <div className="flex justify-between">
            <button className="p-2 px-3 rounded-sm bg-[#3D9970] text-white">
              Featured
            </button>
            <button className="p-2 text-white bg-[#d3d3d3b2] rounded-sm">
              {property.availability}
            </button>
          </div>
          <div className="w-full text-right mb-4 flex gap-4 justify-end">
            <span className="p-4 bg-[#d3d3d3b2] text-white rounded-lg cursor-pointer">
              <GrLink />
            </span>
            <span className="p-4 bg-[#d3d3d3b2] text-white  rounded-lg cursor-pointer">
              <IoVideocam />
            </span>
            <span className="p-4 bg-[#d3d3d3b2] text-white rounded-lg cursor-pointer">
              <IoImageOutline />
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 px-6 space-y-4">
        <h3 className="text-xl font-semibold">{property.title}</h3>
        <p className="text-[#666666] flex items-center gap-2">
          <MdLocationOn /> {property.location}
        </p>
        <div className="flex gap-8 text-[#666666] items-center mt-4">
          <div className="flex items-center space-x-2">
            <IoBedOutline />
            <span>{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center space-x-2">
            <GiBathtub />
            <span>{property.bathrooms} Bathrooms</span>
          </div>
        </div>
        <div className="flex border-t h-[90px] items-center justify-between">
          <p className="mt-2 text-xl font-bold ">
            &#x20A6;{property.price.toLocaleString()}
            {property.availability === "For Rent" && "/1 Year"}
          </p>
          <BiTransfer className="text-2xl text-[#666666]" />
          <GoShareAndroid className="text-2xl text-[#666666]" />
          <IoIosHeartEmpty className="text-2xl text-[#666666]" />
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
