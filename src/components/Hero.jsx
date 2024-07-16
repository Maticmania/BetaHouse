import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import profile from '../assets/image.png'

const Hero = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

  return (
    <div className='min-h-screen xl:min-h-[680px] w-full bg-cover hero relative'>
      <div className='absolute bg-black bg-opacity-50 h-full w-full text-white'>
        <header className='h-[120px] w-full flex justify-evenly items-center backdrop-blur-sm '>
        <div className='flex items-center gap-2 cursor-pointer'>        
                <h1 className='logo'>BH</h1>
                <p className='logo-text'>
                    BetaHouse
                </p>
        </div> 
        <ul className='flex gap-8 font-medium text-xl'>
            <li className='h-[50px] place-content-center cursor-pointer'>Home</li>
            <li className='h-[50px] place-content-center border-b border-gray-200 cursor-pointer'>Properties</li>
            <li className='h-[50px] place-content-center cursor-pointer'>About Us</li>
            <li className='h-[50px] place-content-center cursor-pointer'>Blog</li>
            <li className='h-[50px] place-content-center cursor-pointer'>Contact Us</li>
        </ul>
        <div className="relative inline-block text-left">
      <div className='flex items-center'>
        <img src={profile} alt="name" className='h-[50px] object-fit rounded-full' />
        <button
          type="button"
          className="inline-flex justify-center items-center gap-2 w-full rounded-md  shadow-sm px-4 py-2 text-xl font-medium text-white"
          onClick={toggleDropdown}
        >
          Matic Mania
          {
            isOpen ? <FaChevronUp /> : <FaChevronDown />
          }
          </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Account settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Support</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">License</a>
            <form method="POST" action="#">
              <button type="submit" className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</button>
            </form>
          </div>
        </div>
      )}
         </div>
        </header>
      </div>
    </div>
  )
}

export default Hero
