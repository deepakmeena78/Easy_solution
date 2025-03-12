
import { useState } from "react";
import HelpCardComp from "../Help/HelpCardComp";
import { useNavigate } from "react-router-dom";

function HelpList() {
    const [activeTab, setActiveTab] = useState("Pending");
    const navigate = useNavigate();

    const helpRequests = [
        {
            id: 1,
            title: "Food Donation Drive",
            date: "Feb 15, 2025",
            location: "New York, USA",
            category: "Charity",
            status: "Pending",
            image: "https://via.placeholder.com/200",
        },
        {
            id: 2,
            title: "Car Breakdown Assistance",
            date: "Jan 28, 2025",
            location: "Los Angeles, USA",
            category: "Emergency",
            status: "Completed",
            image: "https://via.placeholder.com/200",
        },
        {
            id: 3,
            title: "Blood Donation Camp",
            date: "March 10, 2025",
            location: "Chicago, USA",
            category: "Health",
            status: "Pending",
            image: "https://via.placeholder.com/200",
        },
        {
            id: 4,
            title: "Blood Donation Camp",
            date: "March 10, 2025",
            location: "Chicago, USA",
            category: "Health",
            status: "Completed",
            image: "https://via.placeholder.com/200",
        },

        {
            id: 5,
            title: "Blood Donation Camp",
            date: "March 10, 2025",
            location: "Chicago, USA",
            category: "Health",
            status: "Completed",
            image: "https://via.placeholder.com/200",
        },
    ];

    return (
        <div className="flex-1 p-5">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-left">Your Help Requests</h2>

            {/* Tabs for Completed & Pending */}
            <div className="flex gap-3 mb-6">
                <button
                    className={`px-5 py-2 rounded-md font-semibold ${activeTab === "Completed"
                        ? "bg-green-600 text-white"
                        : "border border-gray-400 text-gray-600"
                        }`}
                    onClick={() => setActiveTab("Completed")}
                >
                    Completed
                </button>
                <button
                    className={`px-5 py-2 rounded-md font-semibold ${activeTab === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "border border-gray-400 text-gray-600"
                        }`}
                    onClick={() => setActiveTab("Pending")}
                >
                    Pending
                </button>
                <button
                    className={`px-5 py-2 rounded-md font-semibold bg-green-500 text-white`}
                    onClick={() => navigate("/account/create-help")}
                >
                    Create Help
                </button>
            </div>
            {/* Help Cards - Filtering based on Active Tab */}
            <div className="space-y-4">
                {helpRequests.filter((help) => help.status === activeTab).length > 0 ? (
                    helpRequests
                        .filter((help) => help.status === activeTab)
                        .map((help) => <HelpCardComp key={help.id} help={help} />)
                ) : (
                    <p className="text-gray-500 text-center">No {activeTab} helps available.</p>
                )}

            </div>
        </div>
    );
}

export default HelpList;
