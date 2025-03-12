import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


function CreateHelp() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:3200/category/category-get");
        console.log("Server Response:", response.data);

        if (response.status === 200) {
          setCategoryData(response.data.result || []); // Ensure result exists
          toast.success("Categories fetched successfully!");
        } else {
          toast.error("Failed to fetch categories!");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while fetching categories.");
      }
    };
    fetchCategory();
  }, []);

  const user = useSelector((state) => state.auth.user); // Redux state se user data
  const userId = user?._id || user?.id; // User ki ID

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const categoryRef = useRef(null);
  const locationRef = useRef(null);
  const pincodeRef = useRef(null);
  const statusRef = useRef(null);
  const helpDateRef = useRef(null);
  const galleryRef = useRef(null);

  const [galleryPreview, setGalleryPreview] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Image Upload Handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const filePaths = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview((prev) => [...prev, ...filePaths]);
  };

  // Remove Image
  const removeImage = (index) => {
    setGalleryPreview((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("location", locationRef.current.value);
    formData.append("pincode", pincodeRef.current.value);
    formData.append("status", statusRef.current.value);
    formData.append("help_seeker", userId);
    formData.append("help_date", helpDateRef.current.value);

    // Append files
    Array.from(galleryRef.current.files).forEach((file) => {
      formData.append("gallery", file);
    });

    try {
      const response = await axios.post("http://localhost:3200/help/create-help", formData);

      if (response.status === 200) {
        setIsModalOpen(true);
        toast.success("Help Created Successfully");
      } else {
        toast.error("Help Creation Failed");
      }
    } catch (error) {
      toast.error("Error occurred while creating help");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="w-full mx-auto p-6 bg-white rounded-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700">Create Help Request</h2>
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-6">
          {[
            { label: "Title", ref: titleRef },
            { label: "Description", ref: descriptionRef },
            { label: "Location", ref: locationRef },
            { label: "Pincode", ref: pincodeRef },
            { label: "Status", ref: statusRef },
          ].map(({ label, ref }) => (
            <div key={label} className="w-full">
              <label className="text-gray-600 font-medium">{label}</label>
              <input
                type="text"
                ref={ref}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
                placeholder={label}
              />
            </div>
          ))}

          {/* Help Date Field */}
          <div className="w-full">
            <label className="text-gray-600 font-medium">Help Date</label>
            <input
              type="date"
              ref={helpDateRef}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="w-full">
            <label className="text-gray-600 font-medium">Category</label>
            <div className="relative">
              <select
                ref={categoryRef}
                required
                defaultValue=""
                className="w-full p-3 border border-gray-300 rounded-md focus:border-blue-500 outline-none appearance-none"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoryData.map((data) => (
                  <option key={data._id} value={data._id}>
                    {data.category}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Image Upload (Full Width) */}
          <div className="col-span-2">
            <label className="text-gray-600 font-medium">Upload Images (Max 5)</label>
            <input
              type="file"
              ref={galleryRef}
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />

            {/* Custom Upload Button */}
            <label
              htmlFor="fileUpload"
              className="flex items-center justify-center gap-2 w-full p-3 border border-gray-300 rounded-md 
               bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200 transition"
            >
              <FiUpload className="text-blue-600 text-xl" /> {/* Upload Icon */}
              <span>Click to Upload</span>
            </label>
            {/* Image Preview with Remove Option */}
            <div className="flex flex-wrap mt-3 gap-3">
              {galleryPreview.map((src, index) => (
                <div key={index} className="relative">
                  <img src={src} alt="Uploaded" className="w-20 h-20 object-cover rounded shadow" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-700 transition"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button (Full Width) */}
          <div className="col-span-2 text-center">
            <button onClick={() => navigate("/account/help")} type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
              Create Help
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateHelp;
