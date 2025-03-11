import React from "react";
import { FaShoppingCart, FaBoxOpen, FaDollarSign, FaChartLine, FaBoxes, FaTag } from "react-icons/fa";

const dashboardData = [
    { title: "Total Sales", value: "$45,678", growth: "+12.5% growth", icon: <FaDollarSign />, bg: "bg-green-100 text-green-700", iconBg: "bg-green-600 text-white" },
    { title: "Items Sold", value: "1,234", growth: "↑ Trending Up", icon: <FaShoppingCart />, bg: "bg-blue-100 text-blue-700", iconBg: "bg-blue-600 text-white" },
    { title: "Purchased Products", value: "2,456", growth: "+15% this month", icon: <FaBoxOpen />, bg: "bg-yellow-100 text-yellow-700", iconBg: "bg-yellow-600 text-white" },
    { title: "Orders", value: "856", growth: "Active Orders", icon: <FaTag />, bg: "bg-purple-100 text-purple-700", iconBg: "bg-purple-600 text-white" },
    { title: "Stock Level", value: "156", growth: "Items Available", icon: <FaBoxes />, bg: "bg-red-100 text-red-700", iconBg: "bg-red-600 text-white" },
    { title: "Growth Rate", value: "23.4%", growth: "Year over Year", icon: <FaChartLine />, bg: "bg-gray-100 text-gray-800", iconBg: "bg-gray-700 text-white" },
];

const Dashboard = () => {
    return (
        <div className="flex-1 p-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardData.map((card, index) => (
                    <div
                        key={index}
                        className={`p-5 rounded-lg shadow-md transition-transform transform hover:scale-105 ${card.bg}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full text-2xl ${card.iconBg}`}>
                                {card.icon}
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{card.title}</p>
                                <h2 className="text-2xl font-bold">{card.value}</h2>
                                <p className="text-xs opacity-80">{card.growth}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
