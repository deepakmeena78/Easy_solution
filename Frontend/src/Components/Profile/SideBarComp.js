import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaThLarge, FaUserCircle, FaHandsHelping, FaHistory, FaBell, FaHeadset } from "react-icons/fa";

const SideBarComp = ({ children }) => {
  const location = useLocation();

  const user = {
    name: "John Doe",
    profileImage: "https://via.placeholder.com/100",
  };

  const links = [
    { name: "Dashboard", path: "/account/dashboard", icon: <FaThLarge /> },
    { name: "Profile", path: "/account/profile", icon: <FaUserCircle /> },
    { name: "Help Requests", path: "/account/help", icon: <FaHandsHelping /> },
    { name: "Notifications", path: "/account/notifications", icon: <FaBell /> },
    { name: "Help History", path: "/account/history", icon: <FaHistory /> },
    { name: "Support", path: "/account/support", icon: <FaHeadset /> },
    // { name: "Prime", path: "/account/prime", icon: <FaCrown /> },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen m-5">
      {/* Sidebar - Only Visible on Laptop */}
      <aside className="w-64 bg-[var(--dark-blue)] text-white p-6 rounded-xl shadow-xl hidden md:block">
        {/* User Profile */}
        <div className="mb-6 flex flex-col items-center">
          <img
            src={user.profileImage}
            alt="User Profile"
            className="w-20 h-20 rounded-full border-2 border-white"
          />
          <h3 className="mt-3 text-lg font-semibold">{user.name}</h3>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`p-3 flex items-center gap-3 rounded-lg transition-all ${
                location.pathname === link.path
                  ? "bg-green-500 text-white font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              {link.icon} {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 ml-6 bg-white rounded-2xl shadow-xl border border-gray-200 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default SideBarComp;
