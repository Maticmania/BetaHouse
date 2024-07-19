// src/components/FilterBar.js
import React from 'react';
import { MdSettingsInputComposite } from "react-icons/md";


const FilterBar = () => {
  return (
    <div className="flex justify-between items-left py-4 px-8 bg-white flex-col  md:flex-row">
      <div className='flex  flex-col md:flex-row text-xl font-Medium gap-2 md:gap-4'>
        <button className="flex items-center gap-2"><MdSettingsInputComposite className='font-bold rotate-90'/>More Filter</button>
        <span className="">Showing 1-10 of 15 results</span>
      </div>
      <div className='text-xl font-medium'>
        <label className="mr-2 text-[#717171]">Sort by:</label>
        <select className="">
          <option>Default</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
