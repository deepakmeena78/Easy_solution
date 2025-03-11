import React from "react";

const Profile = () => {
    return (
        <div className="flex-1 p-5">
            <div className="w-full max-w-2xl mx-auto p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Profile Details</h2>

                {/* Profile Image Upload Section */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full border border-gray-300 overflow-hidden">
                        <img src="https://via.placeholder.com/100" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <label className="mt-3 cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition">
                        Upload Image
                        <input type="file" accept="image/*" className="hidden" />
                    </label>
                </div>

                {/* Profile Form */}
                <form className="space-y-5">
                    {/* Name and Mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                name="name" 
                                defaultValue="Ankit"
                                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder=" " 
                            />
                            <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                                Name
                            </label>
                        </div>

                        <div className="relative">
                            <input 
                                type="text" 
                                name="mobile" 
                                defaultValue="9111948802"
                                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder=" " 
                            />
                            <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                                Mobile
                            </label>
                        </div>
                    </div>

                    {/* Email and Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <input 
                                type="email" 
                                name="email" 
                                defaultValue="ankitmeena@gmail.com"
                                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder=" " 
                            />
                            <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                                Email
                            </label>
                        </div>

                        <div className="relative">
                            <select 
                                name="gender" 
                                defaultValue="Male"
                                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500 bg-white"
                            >
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                                Gender
                            </label>
                        </div>
                    </div>

                    {/* Location and Pincode */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                name="location" 
                                defaultValue="Indore"
                                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder=" " 
                            />
                            <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                                Location
                            </label>
                        </div>

                        <div className="relative">
                            <input 
                                type="text" 
                                name="pincode" 
                                defaultValue="455336"
                                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500" 
                                placeholder=" " 
                            />
                            <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                                Pincode
                            </label>
                        </div>
                    </div>

                    {/* Update Button */}
                    <div className="text-center mt-6">
                        <button 
                            type="submit" 
                            className="px-6 py-2 bg-green-600 text-white text-lg font-medium rounded-md hover:bg-green-700 transition"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
