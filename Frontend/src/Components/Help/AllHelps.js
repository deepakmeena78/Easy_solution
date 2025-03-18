import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import HelpCardComp from "./HelpCardComp";

const AllHelps = () => {

  const user = useSelector((state) => state.auth.user);
  const userId = user?._id || user?.id; // User ki ID

  const navigate = useNavigate();
  const [Allhelp, setAllhelp] = useState([]);


  const fetchhelp = async () => {
    try {
      const response = await axios.get(`http://localhost:3200/help/get-help/${userId}`)
      console.log("Server Response:", response.data);

      if (response.status === 200) {
        setAllhelp(response.data.result || []); // Ensure result exists
        toast.success("Categories fetched successfully!");
      } else {
        toast.error("Failed to fetch categories!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching categories.");
    }
  };
  useEffect(() => {
    if(user){
      fetchhelp();
    }
  }, [user]);



  return (
    <>
      <Toaster />
      <div className="container mx-auto p-6 flex flex-col gap-6">
        {Allhelp.length > 0 ? (
          Allhelp.map((help, index) => (
        <>
         <HelpCardComp key={help._id} help={help} />
        </>
          ))
        ) : (
          <h2 className="text-center text-gray-600 w-full">No Help Requests Available</h2>
        )}
      </div>
    </>
  );
};

export default AllHelps;
