import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./../App.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CategoryPage = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:3200/category/category-get");
                console.log("Server Response:", response.data);

                if (response.status === 200) {
                    setCategories(response.data.result || []); // Ensure result exists
                    toast.success("Categories fetched successfully!");
                } else {
                    toast.error("Failed to fetch categories!");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("An error occurred while fetching categories.");
            }
            finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <Toaster />
            <div className="w-full mx-auto p-6 text-center overflow-hidden bg-white">
                <h2 className="text-2xl font-bold text-[var(--dark-blue)]">
                    CATEGORIES
                </h2>
                <div className="border-b-2 w-16 mx-auto mt-2 mb-6 border-[var(--dark-blue)]"></div>

                <div className="block md:hidden">
                    {loading ? (
                        <p className="text-gray-500">Loading datas...</p>
                    ) : (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={10}
                            slidesPerView={2}
                            navigation
                            pagination={{ clickable: true }}
                        >
                            {categories.map((data, index) => (
                                <SwiperSlide key={index}>
                                    <div className="bg-white shadow-lg rounded-lg p-4 text-center border border-gray-300 transition-all duration-300 hover:border-[var(--dark-blue)] hover:scale-105 hover:shadow-lg">
                                        <img
                                            src={data.gallery}
                                            alt={`${data.category}`}
                                            className="w-24 h-24 object-contain mx-auto rounded-md"
                                        />
                                        <h3 className="mt-2 text-lg font-semibold">
                                            {data.category}
                                        </h3>
                                        <button className="mt-2 px-4 py-1 text-[var(--dark-blue)] border border-[var(--dark-blue)] rounded-full transition-all duration-200 hover:bg-[var(--dark-blue)] hover:text-white">
                                            Search
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>

                {/* ✅ Desktop View - Grid */}
                <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-12">
                    {loading ? (
                        <p className="text-gray-500">Loading datas...</p>
                    ) : (
                        categories.map((data, index) => (
                            <div key={index}
                                className="bg-white shadow-lg rounded-lg p-4 text-center border border-gray-300 transition-all duration-300 hover:border-[var(--dark-blue)] hover:scale-105 hover:shadow-lg"
                            >
                                <img
                                    src={data.gallery}
                                    alt={`${data.category}`}
                                    className="w-24 h-24 object-contain mx-auto rounded-md"
                                />
                                <h3 className="mt-2 text-lg font-semibold">
                                    {data.category}
                                </h3>
                                <button className="mt-2 px-4 py-1 text-[var(--dark-blue)] border border-[var(--dark-blue)] rounded-full transition-all duration-200 hover:bg-[var(--dark-blue)] hover:text-white">
                                    Search
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoryPage;
