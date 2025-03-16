import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBell, FaUserPlus, FaCheck, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";


const ApplyRequestNotification = () => {
    const user = useSelector((state) => state.auth.user);
    const userId = user?._id || user?.id;

    const [requests, setRequests] = useState([]);
    const [accept, setAccept] = useState("");
    const [reject, setReject] = useState("");
    console.log(accept);
    console.log(reject);


    useEffect(() => {
        if (!userId) return;
        const fetchHelp = async () => {
            try {
                const response = await axios.get(`http://localhost:3200/help-provider/help-request/${userId}`);
                console.log("Server Response:", response.data);

                if (response.status === 200) {
                    setRequests(response.data.result || []);
                } else {
                    toast.error("Failed to fetch data!");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchHelp();
    }, [userId]);

    return (

        <div className="flex-1 p-5">
            <div className="w-full h-screen bg-white shadow-md flex flex-col">
                {/* Notification Header */}
                <div className="flex items-center justify-between p-4 bg-gray-200">
                    <div className="flex items-center gap-2">
                        <FaBell className="text-2xl text-gray-700" />
                        <span className="font-semibold text-gray-800 text-lg">Apply Requests</span>
                        {requests.length > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {requests.length}
                            </span>
                        )}
                    </div>
                    <button className="text-sm text-blue-600 hover:underline" onClick={() => setRequests([])}>Clear All</button>
                </div>

                {/* Requests Container */}
                <div className="flex-grow overflow-y-auto p-4">
                    {requests.length > 0 ? (
                        requests.map((data, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md mb-3">
                                <div className="flex items-center gap-3">
                                    <FaUserPlus className="text-blue-500 text-xl" />
                                    <div>
                                        <p className="text-lg font-semibold">Help: {data.help.title}</p>
                                        <p className="text-sm text-gray-600">Provider: {data.offerd_by.name}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setAccept("accept")}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-1">
                                        <FaCheck /> Accept
                                    </button>
                                    <button
                                        onClick={() => setReject("reject")}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-1">
                                        <FaTimes /> Reject
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="p-4 text-lg text-gray-500 text-center">No new requests</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplyRequestNotification;
