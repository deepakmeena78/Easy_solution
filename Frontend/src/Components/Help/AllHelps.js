import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const AllHelps = () => {
  const navigate = useNavigate();
  const [Allhelp, setAllhelp] = useState([]);

  useEffect(() => {
    const fetchhelp = async () => {
      try {
        const response = await axios.get("http://localhost:3200/help/get-help");
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

    fetchhelp();
  }, []);



  return (
    <>
      <Toaster />
      <div className="container mx-auto p-6 flex flex-col gap-6">
        {Allhelp.length > 0 ? (
          Allhelp.map((help, index) => (
            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
              key={index}
              className="bg-white shadow-lg rounded-lg p-5 flex w-full h-[200px] items-center"
            >
              <div className="w-1/4 h-full overflow-hidden rounded-lg" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <img
                  src={help.gallery[0]}
                  alt={help.description}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>

              <div className="w-2/4 p-4">
                <h5 className="text-lg font-semibold">{help.description}</h5>
                <p className="text-gray-600 mt-2">{help.location}</p>
              </div>

              <div className="w-1/4 flex justify-center">
                <button style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
                  onClick={() => navigate(`/help-details${help._id}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center text-gray-600 w-full">No Help Requests Available</h2>
        )}
      </div>
    </>
  );
};

export default AllHelps;
