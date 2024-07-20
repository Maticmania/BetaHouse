import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import axios from "axios";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [headerClass, setHeaderClass] = useState(
    "h-[120px] w-full flex justify-between items-center px-4 md:px-8 backdrop-blur-sm fixed z-50 container mx-auto"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const userId = auth?.user?._id;

  useEffect(() => {
    if (auth?.token) {
      setFirstName(auth?.user?.firstName);
      setLastName(auth?.user?.lastName);
      setImage(auth?.user?.image);
    }

    if (userId) {
      axios
        .get(`auth/user/${userId}`)
        .then((response) => {
          const user = response?.data?.user;
          setUserData(user);
          setFirstName(user?.firstName);
          setLastName(user?.lastName);
          setImage(user?.image);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
  }, [auth, userId]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setHeaderClass(
          "h-[120px] w-full flex justify-between items-center px-4 md:px-8 bg-white shadow-md text-black fixed z-50 container mx-auto"
        );
      } else {
        setHeaderClass(
          "h-[120px] w-full flex justify-between items-center px-4 md:px-8 backdrop-blur-[2px] fixed z-50 container mx-auto"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={headerClass}>
        <div className="flex items-center gap-2 cursor-pointer">
          <h1 className="logo">BH</h1>
          <p className="logo-text md:hidden xl:block">BetaHouse</p>
        </div>
        <ul className="hidden md:flex gap-8 md:gap-4 xl:gap-8 font-medium text-xl md:text-lg xl:text-xl">
          <a href="#">
            <li className="h-[50px] flex items-center cursor-pointer">Home</li>
          </a>
          <a href="#properties">
            <li className="h-[50px] flex items-center border-b border-gray-200 cursor-pointer">
              Properties
            </li>
          </a>
          <a href="#footer">
            <li className="h-[50px] flex items-center cursor-pointer">
              About Us
            </li>
          </a>
          <a href="#popular">
            <li className="h-[50px] flex items-center cursor-pointer">Blog</li>
          </a>
          <a href="#footer">
            <li className="h-[50px] flex items-center cursor-pointer">
              Contact Us
            </li>
          </a>
        </ul>
        <div className="flex items-center md:hidden">
          <button onClick={toggleSidebar} className="text-2xl">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <div className="relative hidden md:inline-block text-left">
          <div className="flex items-center">
            {image && (
              <img
                src={image}
                alt="Profile"
                className="h-[48px] object-fit rounded-full md:hidden xl:block"
              />
            )}
            <button
              type="button"
              className="inline-flex justify-center items-center gap-2 w-full px-4 py-2 text-xl font-medium"
              onClick={toggleDropdown}
            >
              {firstName} {lastName}
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {auth?.user ? (
                  <div>
                    <Link
                      to="/profile"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Account settings
                    </Link>
                    <Link
                      onClick={handleLogout}
                      to="/"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          <div className="fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-50">
            <ul className="flex flex-col gap-8 font-medium text-xl p-4">
              <li className="h-[50px] flex items-center cursor-pointer">
                Home
              </li>
              <li className="h-[50px] flex items-center border-b border-gray-200 cursor-pointer">
                Properties
              </li>
              <li className="h-[50px] flex items-center cursor-pointer">
                About Us
              </li>
              <li className="h-[50px] flex items-center cursor-pointer">
                Blog
              </li>
              <li className="h-[50px] flex items-center cursor-pointer">
                Contact Us
              </li>
            </ul>
            <div className="flex items-center p-4">
              {image && (
                <img
                  src={image}
                  alt="Profile"
                  className="h-[48px] object-fit rounded-full md:hidden xl:block"
                />
              )}
              <button
                type="button"
                className="inline-flex justify-center items-center gap-2 w-full rounded-md shadow-sm px-4 py-2 text-xl font-medium"
                onClick={toggleDropdown}
              >
                {firstName} {lastName}
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            {isOpen && (
              <div className="w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 mt-2">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {auth?.user ? (
                    <div>
                      <Link
                        to="/profile"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Account settings
                      </Link>
                      <Link
                        onClick={handleLogout}
                        to="/"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign out
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
