"use client";
import { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropDown";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Authentication/AuthSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
const TOKEN_KEY = process.env.REACT_APP_COOKIE_PREFIX || "easy_solution";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  useEffect(() => {
    const savedToken = Cookies.get(TOKEN_KEY);
    if (savedToken) {
      dispatch(setUser(jwtDecode(savedToken)));
    }
  }, [dispatch]);

  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-[var(--light-blue)] shadow-md relative">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/Images/logo_name.png"
                alt="Logo"
                className="w-[150px] h-16 "
              />
            </Link>
          </div>
         
          <SearchBar />
          <div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleMenu}
              className="block md:hidden focus:outline-none"
              aria-label="Toggle menu"
            >
              
              <svg
                className="w-8 h-8 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {user ? <ProfileDropdown /> : <button onClick={login} className="mr-5 bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded-full">
              Login
            </button>}
          </div>
        </div>

        <nav className="text-white overflow-hidden hidden md:flex justify-start bg-[var(--dark-blue)] border-1 border-b-[#e8b237] sticky   top-0 z-10">
          <ul className="flex space-x-8 py-4 px-12">
            <li>
              <Link
                to="/"
                className="hover:bg-white hover:text-[var(--dark-blue)] py-2 font-semibold border rounded-md text-relatedWhite border-transparent active:text-darkColor active:border-b-darkColor transition-all duration-300 ease-in-out px-4"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className="hover:bg-white hover:text-[var(--dark-blue)] p-2 font-semibold border rounded-md text-relatedWhite border-transparent active:text-darkColor active:border-b-darkColor transition-all duration-300 ease-in-out px-4"
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className="hover:bg-white hover:text-[var(--dark-blue)] p-2 font-semibold border rounded-md text-relatedWhite border-transparent active:text-darkColor active:border-b-darkColor transition-all duration-300 ease-in-out px-4"
              >
                Help
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:bg-white hover:text-[var(--dark-blue)] p-2 font-semibold border rounded-md text-relatedWhite border-transparent active:text-darkColor active:border-b-darkColor transition-all duration-300 ease-in-out px-4"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:bg-white hover:text-[var(--dark-blue)] p-2 font-semibold border rounded-md text-relatedWhite border-transparent active:text-darkColor active:border-b-darkColor transition-all duration-300 ease-in-out px-4"
              >
                Contact us
              </Link>
            </li>
          </ul>

          <div className="ml-auto flex items-center justify-center">
            <div className=" mr-20 bg-darkColor h-full w-80 text-relatedWhite transform md:-rotate-[47deg] transition-transform duration-500 ease-in-out flex items-center justify-center overflow-hidden">
              <span className="text-xs"></span>
            </div>
          </div>
        </nav>
      </header>

      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleMenu}
      ></div>

      {/* Off-Canvas Menu (Mobile) */}
      <div
        id="offcanvas-menu"
        className={`rounded-r-lg fixed top-0 left-0 z-50 w-1/2 h-full bg-white transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } menu-transition md:hidden`}
      >
        <nav className="flex flex-col space-y-4 p-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-relatedWhite border-2 border-transparent hover:bg-darkColor   rounded-lg transition-all duration-300 ease-in-out px-4 py-1"
          >
            Home
          </Link>
          <Link
            to="/pages/aboutus"
            className="text-gray-700 hover:text-relatedWhite border-2 border-transparent hover:bg-darkColor rounded-lg transition-all duration-300 ease-in-out px-4 py-1"
          >
            About Us
          </Link>
          <Link
            to="/pages/category"
            className="text-gray-700 hover:text-relatedWhite border-2 border-transparent hover:bg-darkColor rounded-lg transition-all duration-300 ease-in-out px-4 py-1"
          >
            Category
          </Link>
          <Link
            to="/pages/contactus"
            className="text-gray-700 hover:text-relatedWhite border-2 border-transparent hover:bg-darkColor  rounded-lg transition-all duration-300 ease-in-out px-4 py-1"
          >
            Contact Us
          </Link>
          <Link
            to="/pages/products"
            className="text-gray-700 hover:text-relatedWhite border-2 border-transparent hover:bg-darkColor  rounded-lg transition-all duration-300 ease-in-out px-4 py-1"
          >
            Product 
          </Link>

          <div className="flex items-center ml-3">
            {"5" == "5" && "<Login />"}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
