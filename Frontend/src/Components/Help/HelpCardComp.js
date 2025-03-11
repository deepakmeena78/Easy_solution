import { FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaCheckCircle, FaTags } from "react-icons/fa";

function HelpCardComp({ help }) {
    return (
        <div className="flex flex-col sm:flex-row items-center border border-green-700 rounded-lg p-6 mb-6 transition-all hover:bg-gray-100 hover:shadow-md">
            {/* Help Image */}
            <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-400">
                <img src={help.image} alt="Help Request" className="w-full h-full object-cover" />
            </div> 

            {/* Help Details */}
            <div className="flex-1 sm:ml-8 text-left">
                <h4 className="text-xl font-semibold text-gray-900">{help.title}</h4>
                <p className="flex items-center text-sm text-gray-700 mt-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" /> {help.date}
                </p>
                <p className="flex items-center text-sm text-gray-700 mt-2">
                    <FaMapMarkerAlt className="mr-2 text-red-500" /> {help.location}
                </p>
                <p className="flex items-center text-sm text-gray-700 mt-2">
                    <FaTags className="mr-2 text-green-500" /> {help.category}
                </p>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col items-start sm:items-end">
                <span
                    className={`text-sm px-3 py-1 rounded-md font-semibold ${
                        help.status === "Completed"
                            ? "bg-green-100 text-green-700 border border-green-500"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-500"
                    }`}
                >
                    {help.status}
                </span>

                {/* Buttons */}
                <div className="mt-4 flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2 text-sm border border-blue-500 text-blue-600 rounded-md transition-colors hover:bg-blue-100">
                        <FaEdit /> Edit
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 text-sm border border-green-500 text-green-600 rounded-md transition-colors hover:bg-green-100">
                        <FaCheckCircle /> Approve
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HelpCardComp;
