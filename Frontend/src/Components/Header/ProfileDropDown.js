import React, { useState, useRef } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaThLarge, FaUserCircle, FaHandsHelping, FaCrown, FaHistory, FaBell, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom"; // React Router Link import
import { LogOut } from "./AuthButton";
import { useSelector } from "react-redux";

const sideBarData = [
  { to: "/acount/dashboard", icon: <FaThLarge />, label: "Dashboard" },
  { to: "/account/profile", icon: <FaUserCircle />, label: "Profile" },
  { to: "/account/help", icon: <FaHandsHelping />, label: "Your Help" },
  { to: "/account/prime", icon: <FaCrown />, label: "Prime" },
  { to: "/history", icon: <FaHistory />, label: "Help History" },
  { to: "/account/notifications", icon: <FaBell />, label: "Notification" },
  { to: "/support", icon: <FaHeadset />, label: "Support" }
];


const ProfileDropdown = () => {
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleMouseEnter = (event) => {
    if (!dropdownRef.current?.contains(event.relatedTarget)) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = (event) => {
    if (!dropdownRef.current?.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="relative z-[100]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        onClick={toggleDropdown}
        src={"/Images/No_Image_Available.jpg"} // Add profile image URL here
        alt="Profile"
        className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:shadow-lg transition-shadow"
      />

      <div
        className={`absolute right-0 w-56 bg-white rounded-lg shadow-lg py-2 
                      transform transition-all duration-200 origin-top-right
                      ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>

        <div className="py-1">
          {sideBarData.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
            >
              <span className="w-5 h-5 text-gray-500">{item.icon}</span>
              <span className="ml-3">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="border-t py-1">
          <div className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
            <BiLogOut className="w-5 h-5 mr-3" />
            <LogOut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
