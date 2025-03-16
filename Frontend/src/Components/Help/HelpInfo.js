import axios from "axios";
import "../../App.css";
import { useSelector } from 'react-redux';
import { MapPin, Calendar, Tag, ClipboardList, Hash, FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";


const HelpInfo = ({ HelpData }) => {
    const user = useSelector((state) => state.auth.user); // Redux state se user data
    const userId = user?._id || user?.id;

    const HelpApply = {
        help: HelpData._id,
        help_seeker: HelpData.help_seeker,
        offerd_by: userId
    };
    console.log(HelpApply);

    const Apply = async () => {
        try {
            const response = await axios.post("http://localhost:3200/help-provider/create", HelpApply);
            if (response.status === 201) {
                toast.success("Apply Successful");
            } else if (response.status == 400) {
                toast.error("Already applied");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Already applied");
        }
    };

    return (
        <>
            <Toaster />
            <div className="p-6 col-span-3 flex flex-col justify-center border border-black-400 rounded-lg bg-[var(--light-blue)] shadow-md">

                {[
                    { icon: FileText, label: "Title", value: HelpData.title || "No Title" },
                    { icon: ClipboardList, label: "Description", value: HelpData.description || "No Description" },
                    { icon: Tag, label: "Category", value: HelpData.category || "No Category" },
                    { icon: Hash, label: "Pincode", value: HelpData.pincode || "No Pincode" },
                    { icon: MapPin, label: "Location", value: HelpData.location || "No Location" },
                    { icon: Calendar, label: "Help Date", value: HelpData.help_date || "No Help Date" },
                ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 mb-3">
                        <item.icon className="w-6 h-6 text-gray-700" />
                        <h1 className="text-lg font-bold text-gray-900">{item.label}:</h1>
                        <span className="text-md text-gray-700 px-2 py-1 rounded-md shadow-sm">{item.value}</span>
                    </div>
                ))}

                <button onClick={Apply} className="mt-6 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition shadow-md">
                    Apply
                </button>
            </div>
        </>
    );
}

export default HelpInfo;
