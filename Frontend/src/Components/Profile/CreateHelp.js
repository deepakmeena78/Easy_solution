import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaChevronDown } from "react-icons/fa";


function CreateHelp() {
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); // Max 3 images
    const filePaths = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview(filePaths);
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
      <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-2 gap-6 text-left">
          {[
            { label: "Title", ref: titleRef },
            { label: "Description", ref: descriptionRef },
            { label: "Location", ref: locationRef },
            { label: "Pincode", ref: pincodeRef },
            { label: "Status", ref: statusRef },
          ].map(({ label, ref }) => (
            <div key={label} className="relative w-full">
              <input
                type="text"
                ref={ref}
                required
                className="w-full p-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none peer"
                placeholder=" "
              />
              <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
                {label}
              </label>
            </div>
          ))}

          {/* Help Date Field */}
          <div className="relative w-full">
            <input
              type="date"
              ref={helpDateRef}
              required
              className="w-full p-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none peer"
            />
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500">
              Help Date
            </label>
          </div>

          <div className="relative w-full">
            <select
              ref={categoryRef}
              required
              defaultValue=""
              className="w-full p-3 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none appearance-none peer"
            >
              <option value="" disabled >
                Select Category
              </option>
              {categoryData.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.category}
                </option>
              ))}
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 peer-focus:text-blue-500" />
          </div>

          {/* Image Upload */}
          <div className="col-span-2 w-full">
            <label className="text-gray-600">Upload Images (Max 5)</label>
            <input
              type="file"
              ref={galleryRef}
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            />
            <div className="flex mt-2 space-x-2">
              {galleryPreview.map((src, index) => (
                <img key={index} src={src} alt="Uploaded" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 text-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              Create Help
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateHelp;
