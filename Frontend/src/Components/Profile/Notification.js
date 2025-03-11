import { useState } from "react";
import { FaBell, FaUserPlus, FaCheck, FaTimes } from "react-icons/fa";
import SliderProfile from "./SideBar";

const initialRequests = [
    { id: 1, name: "Rahul Sharma", message: "Applied for Web Developer help." },
    { id: 2, name: "Priya Verma", message: "Wants to assist in your project." },
    { id: 3, name: "Amit Kumar", message: "Applied for UI/UX consultation." },
    { id: 4, name: "Sneha Patel", message: "Requested to join as a helper." },
    { id: 5, name: "Vikas Singh", message: "Applied for content writing task." },
    { id: 1, name: "Rahul Sharma", message: "Applied for Web Developer help." },
    { id: 2, name: "Priya Verma", message: "Wants to assist in your project." },
    { id: 3, name: "Amit Kumar", message: "Applied for UI/UX consultation." },
    { id: 4, name: "Sneha Patel", message: "Requested to join as a helper." },
    { id: 5, name: "Vikas Singh", message: "Applied for content writing task." }
];

const ApplyRequestNotification = () => {
    const [requests, setRequests] = useState(initialRequests);

    const handleAction = (id, action) => {
        setRequests(requests.filter(request => request.id !== id));
        alert(`Request ${action}ed successfully!`);
    };

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
                            requests.map(({ id, name, message }) => (
                                <div key={id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md mb-3">
                                    <div className="flex items-center gap-3">
                                        <FaUserPlus className="text-blue-500 text-xl" />
                                        <div>
                                            <p className="text-lg font-semibold">{name}</p>
                                            <p className="text-sm text-gray-600">{message}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAction(id, "Accept")}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-1">
                                            <FaCheck /> Accept
                                        </button>
                                        <button
                                            onClick={() => handleAction(id, "Reject")}
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
