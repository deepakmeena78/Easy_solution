import axios from "axios";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user); // Redux state se user data
  const [userProfile, setUserProfile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        [name]: files[0],
      }));
    } else {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3200/customer/show/${user._id}`
      );
      if (response.status === 200) {
        setUserProfile({
          name: response?.data?.data?.name,
          mobile: response?.data?.data?.mobile,
          email: response?.data?.data?.email,
          gender: response?.data?.data?.gender,
          location: response?.data?.data?.location,
          pincode: response?.data?.data?.pincode,
          image: response?.data?.data?.image,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", userProfile.name);
      formData.append("mobile", userProfile.mobile);
      formData.append("email", userProfile.email);
      formData.append("gender", userProfile.gender);
      formData.append("location", userProfile.location);
      formData.append("pincode", userProfile.pincode);
      formData.append("image", userProfile.image);

      const response = await axios.post(
        `http://localhost:3200/customer/update-profile/${user._id}`,
        formData
      );

      if (response.status === 200) {
        toast.success("User data updated successfully!");
      } else {
        console.error("Failed to update user data:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  console.log("-=-==--userProfile-=-=-",userProfile);
  

  return (
    <div className="flex-1 p-5">
      <div className="w-full max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Profile Details
        </h2>

        {/* Profile Image Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full border border-gray-300 overflow-hidden">
            <img
              className="w-[150px] h-[150px] object-cover rounded-full border-2 border-darkColor overflow-hidden"
              src={
                userProfile?.image instanceof File
                  ? URL.createObjectURL(userProfile?.image)
                  : userProfile?.image
                  ? `http://localhost:3200/uploads/${userProfile?.image}`
                  : "/images/noimage.png"
              }
              alt="Profile"
            />
          </div>
          <label className="mt-3 cursor-pointer bg-blue-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition">
            Upload Image
            <input
              name="image"
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Profile Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={userProfile?.name}
                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder=" "
                onChange={handleChange}
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                Name
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                name="mobile"
                value={userProfile?.mobile}
                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder=" "
                onChange={handleChange}
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
                value={userProfile?.email}
                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder=" "
                onChange={handleChange}
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                Email
              </label>
            </div>

            <div className="relative">
              <select
                name="gender"
                value={userProfile?.gender}
                onChange={handleChange}
                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500 bg-white"
              >
                <option>select gender</option>
                <option value={"male"}>Male</option>
                <option value={"female"}>Female</option>
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
                value={userProfile?.location}
                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder=" "
                onChange={handleChange}
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all">
                Location
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                name="pincode"
                value={userProfile?.pincode}
                className="peer w-full px-3 pt-5 pb-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder=" "
                onChange={handleChange}
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
