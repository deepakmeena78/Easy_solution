import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";


function CreateHelp() {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [initialData, setinitialData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();

  const FetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3200/help/find-help/${id}`);
      console.log("Fetch Data", response.data);

      if (response.status === 200) {
        setinitialData(response.data.result || []);
        if (response.data.result) {
          titleRef.current.value = response.data.result.title || "";
          descriptionRef.current.value = response.data.result.description || "";
          categoryRef.current.value = response.data.result.category || "";
          locationRef.current.value = response.data.result.location || "";
          pincodeRef.current.value = response.data.result.pincode || "";
          statusRef.current.value = response.data.result.status || "";
          helpDateRef.current.value = response.data.result.help_date || "";
        }
        toast.success("Help requests fetched successfully!");
      } else {
        toast.error("Failed to fetch help requests!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching help requests.");
    }
  }

  useEffect(() => {
    if (id) {
      FetchData();
      setIsEditMode(true);
    }
  }, []);

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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!titleRef.current.value.trim()) newErrors.title = "Title is required";
    if (!descriptionRef.current.value.trim()) newErrors.description = "Description is required";
    if (!categoryRef.current.value.trim()) newErrors.category = "Category is required";
    if (!locationRef.current.value.trim()) newErrors.location = "Location is required";
    if (!pincodeRef.current.value.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(pincodeRef.current.value.trim())) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    if (!statusRef.current.value.trim()) newErrors.status = "Status is required";
    if (!helpDateRef.current.value.trim()) newErrors.helpDate = "Help Date is required";
    if (!galleryRef.current.value.trim()) newErrors.gallery = "Gallery is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validateForm()) {
      toast.success("Help request created successfully!");
      navigate("/account/help");
    } else {
      toast.error("Please fix the errors!");
    }

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("location", locationRef.current.value);
    formData.append("pincode", pincodeRef.current.value);
    formData.append("status", statusRef.current.value);
    formData.append("help_seeker", userId);
    formData.append("help_date", helpDateRef.current.value);

    Array.from(galleryRef.current.files).forEach((file) => {
      formData.append("gallery", file);
    });

    try {
      if (isEditMode) {
        const response = await axios.post(`http://localhost:3200/help/update-help/${id}`, formData);
        if (response.status === 200) {
          setIsModalOpen(true);
          toast.success("Help Edit Successfully");
        } else {
          toast.error("Help Edition Failed");
        }
      } else {
        const response = await axios.post("http://localhost:3200/help/create-help", formData);
        if (response.status === 200) {
          setIsModalOpen(true);
          toast.success("Help Created Successfully");
        } else {
          toast.error("Help Creation Failed");
        }
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
              {errors[label.toLowerCase()] && <p className="text-red-500 text-sm">{errors[label.toLowerCase()]}</p>}
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
            {errors.helpDate && <p className="text-red-500 text-sm">{errors.helpDate}</p>}
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
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
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
            {errors.gallery && <p className="text-red-500 text-sm">{errors.gallery}</p>}
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
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
              {isEditMode ? "Save Help" : "Create Help"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateHelp;
