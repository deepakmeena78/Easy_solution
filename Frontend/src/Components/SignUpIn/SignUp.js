import { React, useRef, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Google from "./Google";
import axios from "axios";
import OtpModal from "../Authentication/OtpModal";


const SignUp = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile:'',
  });

  const [errors, setErrors] = useState({});
  
  const validate = (field, value) => {
    let errorMsg = "";

    if (field === "name" && value.trim() === "") {
      errorMsg = "Name is required!";
    }
    if (field === "email" && (!value.includes("@") || !value.includes("."))) {
      errorMsg = "Enter a valid email!";
    }
    if (field === "password" && (value.length < 6 || value.length > 10)) {
      errorMsg = "Password must be 6-10 characters long!";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMsg }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate(name, value);
  };

  const [passwordType, setPasswordType] = useState("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
    setPasswordVisible(!passwordVisible);
  };

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const mobileRef = useRef(null);


  const handleOtpVerification = () => {
    toast.success("Otp varification success");
    setIsModalOpen(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value,
      mobile:mobileRef.current.value,
    };

    Object.keys(formData).forEach((field) => validate(field, formData[field]));

    if (!Object.values(errors).some((err) => err !== "")) {
      console.log("Form Data:", formData);
    }

    try {
      const response = await axios.post("http://localhost:3200/customer/sign-up", formData);
      if (response.status === 200) {
        setIsModalOpen(true)
        toast.success("Verify Your Email");
      } else {
        toast.error("Sign up failed!");
      }
    } catch (error) {
      toast.error("Sign up failed!");
      console.error("Error:", error);
    }
  };

  return (<>
    <div className="flex items-center justify-center min-h-screen bg-relatedWhite py-10 px-2">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-relatedWhite border border-darkColor rounded-lg shadow-[0px_3px_8px_rgba(0,0,0,0.24)] py-2">
        {/* Left Side (Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Easy Solution Sign Up Now!
          </h2>
          <hr className="sm:w-48 lg:w-48 border-1 border-darkColor justify-self-center" />
          <form onSubmit={handleSubmit}>
            <div className="relative w-full mt-4">
              <input ref={nameRef} type="text" id="name" name="name" onChange={handleChange}
                className="peer w-full px-3 pt-3.5 pb-0.2 border-b border-gray-300 placeholder-transparent focus:outline-none focus:ring-0 focus:border-darkColor text-mutedColor"
                placeholder="name" />
              <p style={{ color: "red" }}>{errors.name}</p>
              <label htmlFor="name"
                className="absolute left-3 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-darkColor peer-focus:text-sm">
                Name
              </label>
              <span className="text-red-400 text-sm"></span>
            </div>

            <div className="relative w-full mt-4">
              <input ref={emailRef} type="email" id="email" name="email" onChange={handleChange}
                className="peer w-full px-3 pt-3.5 pb-0.2 border-b border-gray-300 placeholder-transparent focus:outline-none focus:ring-0 focus:border-darkColor text-black"
                placeholder="email" />
              <p style={{ color: "red" }}>{errors.email}</p>
              <label htmlFor="email"
                className="absolute left-3 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-darkColor peer-focus:text-sm">
                Email
              </label>
              <span className="text-red-400 text-sm"></span>
            </div>
            <div className="relative w-full mt-4">
              <input ref={mobileRef} type="text" id="mobile" name="mobile" onChange={handleChange}
                className="peer w-full px-3 pt-3.5 pb-0.2 border-b border-gray-300 placeholder-transparent focus:outline-none focus:ring-0 focus:border-darkColor text-black"
                placeholder="mobile" />
              <p style={{ color: "red" }}>{errors.mobile}</p>
              <label htmlFor="mobile"
                className="absolute left-3 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-darkColor peer-focus:text-sm">
                Mobile
              </label>
              <span className="text-red-400 text-sm"></span>
            </div>

            <div className="relative w-full mt-4">
              <input ref={passwordRef} type={passwordType} id="password" name="password" onChange={handleChange}
                className="peer w-full px-3 pt-3.5 pb-0.2 border-b border-gray-300 placeholder-transparent focus:outline-none focus:ring-0 focus:border-darkColor text-mutedColor"
                placeholder="Password" />
              <p style={{ color: "red" }}>{errors.password}</p>
              <label htmlFor="password"
                className="absolute left-3 top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-darkColor peer-focus:text-sm" >
                Password
              </label>
              <button type="button" id="togglePassword" onClick={togglePassword}
                className="absolute right-3 top-4 text-gray-500 hover:text-[var(--mid-green)] transition focus:outline-none"
              >
                {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <div className="text-center mt-8">
              <button
                type="submit"
                className="w-full py-3 bg-[var(--mid-green)] text-white rounded-lg hover:bg-mutedColor transition duration-200"
              >
                Sign Up
              </button>
              <div className="mt-5 flex items-center justify-center">
                <Google />
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="text-gray-700">
                Already have an account?
                <Link to="/login" className="text-[var(--link-blue)] hover:underline transition duration-200 ml-2">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url('/Images/sign_up.jpg')` }}>
        </div>
      </div>
    </div>
    <OtpModal data={formData} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onVerify={handleOtpVerification} />
  </>
  );
};
 
export default SignUp;