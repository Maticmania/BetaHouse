// src/components/Footer.js
import React from "react";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#035A33] text-white py-8 px-4 xl:px-20">
      <div className="flex justify-between flex-wrap gap-8">
        {/* Logo and Description */}
        <div className="w-[390px]">
          <div className="flex items-center gap-2 mb-4 ">
            <span className="logo">BH</span>
            <span className="logo-text">BetaHouse</span>
          </div>
          <p className="mb-4">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>
          <div className="flex items-center mb-2">
            <MdLocationOn className="mr-2" />
            <span>95 Tinubu Estate, Lekki, Lagos</span>
          </div>
          <div className="flex items-center mb-2">
            <MdPhone className="mr-2" />
            <span>+234 675 8935 675</span>
          </div>
          <div className="flex items-center">
            <MdEmail className="mr-2" />
            <span>support@rentbetahouse.com</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Properties</li>
            <li>About</li>
            <li>Contact us</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* More */}
        <div>
          <h2 className="text-xl font-semibold mb-4">More</h2>
          <ul className="space-y-2">
            <li>Agents</li>
            <li>Affordable Houses</li>
            <li>FAQ's</li>
          </ul>
        </div>

        {/* Popular Search */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Popular Search</h2>
          <ul className="space-y-2">
            <li>Apartment for sale</li>
            <li>Apartment for rent</li>
            <li>3 bedroom flat</li>
            <li>Bungalow</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 xl:px-32 border-t border-green-700 pt-4 text-center md:text-left xl:flex justify-between">
        <p className="mb-2 md:mb-0">
          Copyright 2023 BetaHouse | Designed by Michael.fig
        </p>
        <p>Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
