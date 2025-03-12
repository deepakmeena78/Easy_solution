import { useEffect, useState } from "react";
import HelpCardComp from "../Help/HelpCardComp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

function HelpList() {
    const [activeTab, setActiveTab] = useState("Pending");
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user); // Redux state se user data
    const userId = user?._id || user?.id; // User ki ID

    const [Allhelp, setAllhelp] = useState([]);

    useEffect(() => {
        const fetchHelp = async () => {
            if (!userId) return; // Ensure userId exists before fetching

            try {
                const response = await axios.get(`http://localhost:3200/help/get-seekerhelp/${userId}`);
                console.log("Server Response:", response.data);

                if (response.status === 200) {
                    setAllhelp(response.data.result || []); // Ensure result exists
                    toast.success("Help requests fetched successfully!");
                } else {
                    toast.error("Failed to fetch help requests!");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("An error occurred while fetching help requests.");
            }
        };

        fetchHelp();
    }, [userId]); // Dependency on userId for re-fetching data

    return (
        <>
            <Toaster />
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
                        className="px-5 py-2 rounded-md font-semibold bg-green-500 text-white"
                        onClick={() => navigate("/account/create-help")}
                    >
                        Create Help
                    </button>
                </div>

                {/* Help Cards - Filtering based on Active Tab */}
                <div className="space-y-4">
                    {Allhelp.length > 0 ? (
                        Allhelp
                            .filter((help) => help.status.toLowerCase() === activeTab.toLowerCase()) // Ensure case matching
                            .map((help) => <HelpCardComp key={help._id} help={help} />)
                    ) : (
                        <p className="text-gray-500 text-center">No {activeTab} helps available.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default HelpList;
