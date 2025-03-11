import React, { useEffect, useState } from "react";
import "../../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProviderExample = () => {
  const [provider, setProvide] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("http://localhost:3200/customer/get-customer");
        console.log("Server Response:", response.data);

        if (response.data) {
          setProvide(response.data.result);
          toast.success("Good Yaar successfully!");
        } else {
          setProvide([]); // Ensure state is updated
          toast.error("No providers found!");
        }
      } catch (error) {
        console.error("Error fetching:", error);
        toast.error("Error");
      }
    };

    fetchProviders();
  }, []);


  return (
    <>
      <Toaster />
      <h2 className="flex justify-center text-2xl font-bold text-[var(--dark-blue)]">
        Good Provider
      </h2>

      {/* Desktop View - Grid */}
      <div className="hidden md:flex flex-wrap justify-center gap-8 p-12">
        {provider.map((helpdata, index) => (
          <div
            key={index}
            className="w-64 max-w-sm border shadow-lg border-gray-200 rounded-lg p-6 bg-white transition-all duration-300 hover:border-blue-500 hover:scale-105"
          >
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={helpdata.image}
                alt={helpdata.name}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900">
                {helpdata.name}
              </h5>
              <span className="text-sm text-gray-500">{helpdata.email}</span>
              <div className="flex mt-4">
                <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 shadow-lg">
                  Rating
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - Swiper Slider */}
      <div className="md:hidden px-6 py-4">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
        >
          {provider.map((helpdata, index) => (
            <SwiperSlide key={index}>
              <div className="w-full border shadow-lg border-gray-200 rounded-lg p-6 bg-white text-center">
                <img
                  className="w-24 h-24 mx-auto mb-3 rounded-full shadow-lg"
                  src={helpdata.image}
                  alt={helpdata.name}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900">
                  {helpdata.name}
                </h5>
                <span className="text-sm text-gray-500">{helpdata.email}</span>
                <div className="mt-4">
                  <button className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 shadow-lg">
                    Rating
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default ProviderExample;
