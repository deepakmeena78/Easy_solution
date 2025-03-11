import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import GoogleSignin from "./GoogleSignin";
import { useDispatch } from "react-redux";
import { login } from "../Authentication/AuthSlice"; // Import login action
import { loginUser } from "../Authentication/AuthServise"; // Import API function

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validate = (field, value) => {
    let errorMsg = "";

    if (field === "email" && (!value.includes("@") || !value.includes("."))) {
      errorMsg = "Enter a valid email!";
    }
    if (field === "password" && (value.length < 6 || value.length > 10)) {
      errorMsg = "Password must be 6-10 characters long!";
    }

    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  const togglePassword = () => {
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: validate("email", formData.email),
      password: validate("password", formData.password),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((err) => err !== "")) {
      return;
    }

    try {
      const data = await loginUser(formData.email, formData.password);
      dispatch(login({ token: data.token }));
      toast.success("Login successful!");
      if (data) {
        navigate("/");
      }
    } catch (err) {
      console.log('===========',err);
      
      toast.error("Login failed! Please check your credentials.",err);
    }
  };


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-relatedWhite py-10 px-2">
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-relatedWhite border border-darkColor rounded-lg shadow-[0px_3px_8px_rgba(0,0,0,0.24)] py-2">
          {/* Left Side (Form) */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
              Easy Solution Login Now!
            </h2>
            <hr className="sm:w-48 lg:w-48 border-1 border-darkColor justify-self-center" />

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="relative w-full mt-4">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full px-3 pt-3.5 pb-0.2 border-b border-gray-300 placeholder-transparent focus:outline-none focus:ring-0 focus:border-darkColor text-black"
                  placeholder="Email"
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                <label
                  htmlFor="email"
                  className="absolute left-3 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-darkColor peer-focus:text-sm"
                >
                  Email
                </label>
              </div>

              {/* Password Input */}
              <div className="relative w-full mt-4">
                <input
                  type={passwordType}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="peer w-full px-3 pt-3.5 pb-0.2 border-b border-gray-300 placeholder-transparent focus:outline-none focus:ring-0 focus:border-darkColor text-mutedColor"
                  placeholder="Password"
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                <label
                  htmlFor="password"
                  className="absolute left-3 top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-darkColor peer-focus:text-sm"
                >
                  Password
                </label>
                <button
                  type="button"
                  id="togglePassword"
                  onClick={togglePassword}
                  className="absolute right-3 top-4 text-gray-500 hover:text-[var(--mid-green)] transition focus:outline-none"
                >
                  {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>

              <div className="text-center mt-8">
                <button
                  type="submit"
                  className="w-full py-3 bg-[var(--mid-purple)] text-white rounded-lg hover:bg-mutedColor transition duration-200"
                >
                  Login
                </button>
                <div className="mt-5 flex items-center justify-center">
                  <GoogleSignin />
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="text-gray-700">
                  Already have an account?
                  <Link
                    to="/sign-up"
                    className="text-[var(--link-blue)] hover:underline transition duration-200 ml-2"
                  >
                    Sign-Up
                  </Link>
                </p>
              </div>
            </form> 
          </div>

          {/* Right Side (Image) */}
          <div
            className="hidden md:block w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url('/Images/sign_in.jpg')` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
