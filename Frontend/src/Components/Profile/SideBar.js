import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaThLarge, FaUserCircle, FaHandsHelping, FaCrown, FaHistory, FaBell, FaHeadset } from "react-icons/fa";

const SliderProfile = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

    const menuItems = [
        { to: "/acount/dashboard", icon: <FaThLarge />, label: "Dashboard" },
        { to: "/account/profile", icon: <FaUserCircle />, label: "Profile" },
        { to: "/account/help", icon: <FaHandsHelping />, label: "Your Help" },
        { to: "/account/prime", icon: <FaCrown />, label: "Prime" },
        { to: "/account/history", icon: <FaHistory />, label: "Help History" },
        { to: "/account/notifications", icon: <FaBell />, label: "Notification" },
        { to: "/account/support", icon: <FaHeadset />, label: "Support" }
    ];

    return (
        <div>
            {/* Mobile Toggle Button */}
            <button
                className="md:hidden fixed top-4 left-4 bg-[var(--dark-blue)] text-white p-2 rounded-full shadow-lg z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-[var(--light-blue)] text-black p-5 w-64 z-30 md:relative md:z-auto transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out sidebar-container`}
            >
                {/* Profile Section */}
                <div className="flex flex-col items-center mb-5 relative z-10">
                    <div className="w-20 h-20 rounded-full border-2 border-white overflow-hidden">
                        <img src="https://via.placeholder.com/80" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="mt-2 text-lg font-semibold">Meena Ji</h2>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center gap-3 p-2 border rounded transition-all duration-200 
                                ${location.pathname === item.to ? "bg-[var(--dark-blue)] text-white" : "hover:bg-[var(--dark-blue)] hover:text-white"}`}
                            onClick={() => setIsOpen(false)} // Close sidebar on link click
                        >
                            {item.icon} {item.label}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Overlay (for mobile) */}
            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default SliderProfile;
