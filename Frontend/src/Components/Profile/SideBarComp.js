import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarComp = ({ children }) => {
  const location = useLocation();

  const user = {
    name: "John Doe",
    profileImage: "https://via.placeholder.com/100", // Replace with actual user image URL
  };

  const links = [
    { name: "Dashboard", path: "/account/dashboard" },
    { name: "Profile", path: "/account/profile" },
    { name: "Help Requests", path: "/account/help" },
    { name: "Notifications", path: "/account/notifications" },
    { name: "Prime Membership", path: "/account/prime" },
    { name: "Help History", path: "/account/history" },
    { name: "Support", path: "/account/support" },
    // { name: "Logout", path: "/account/logouot" },
  ];

  return (
    <div className="flex bg-gray-100 p-6">
      {/* Sidebar (Fixed Height) */}
      <aside className="w-64 h-screen bg-gray-800 text-white p-6 rounded-xl shadow-xl flex flex-col">
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
        <nav className="flex flex-col space-y-2 flex-grow">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`p-3 rounded-lg transition-all ${
                location.pathname === link.path
                  ? "bg-gray-700 border-l-4 border-green-400 text-green-300 font-semibold"
                  : "hover:bg-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content - Expands Based on Content */}
      <main className="flex-1 p-5 ml-6 bg-white rounded-2xl shadow-xl border border-gray-200 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default SidebarComp;
