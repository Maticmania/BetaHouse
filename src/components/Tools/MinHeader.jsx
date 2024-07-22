import React from 'react';
import { Link, useNavigate } from "react-router-dom";


const MinHeader = () => {
  return (
    <div className='h-[100px] flex justify-between items-center px-4 md:px-8 fixed z-50 container mx-auto w-full bg-white'>
      <div className="flex items-center gap-2 cursor-pointer">
        <h1 className="logo">BH</h1>
      </div>
      
      <div className="flex gap-4">
        <Link to='/' className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Login
        </Link>
        <Link to='/register' className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default MinHeader;
