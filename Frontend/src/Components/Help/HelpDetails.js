import "../../App.css";
import HelpImage from "./HelpImage";
import HelpInfo from "./HelpInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const HelpDetails = () => {
    const { id } = useParams();
    console.log("Fetched ID:", id);

    const [HelpData, setHelpdata] = useState([]);

    useEffect(() => {
        if (!id) return;
        const fetchHelp = async () => {
            try {
                const response = await axios.get(`http://localhost:3200/help/find-help/${id}`);
                console.log("Server Response:", response.data);

                if (response.status === 200) {
                    setHelpdata(response.data.result || []); 
                } else {
                    toast.error("Failed to fetch data!");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchHelp();
    }, [id]);

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 p-4">
                <div className="col-span-3">
                    <HelpImage HelpData={HelpData} />
                </div>

                <div className="col-span-2">
                    <HelpInfo HelpData={HelpData} />
                </div>
            </div>
        </>
    );
};

export default HelpDetails;
