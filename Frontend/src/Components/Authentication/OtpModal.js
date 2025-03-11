import axios from "axios";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "./AuthSlice";

const OtpModal = ({ isOpen, onClose, onVerify,data }) => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
        const otpValue = otp.join("");
         const response = await axios.post("http://localhost:3200/customer/verify", {email:data.email,otp:otpValue});
         if (response.status === 200) {
            console.log('===sign up====response==========',response);
            dispatch(login({ token: response.data.token }));
            onVerify(4);
          } else {
            setOtp(["", "", "", ""])
            toast.error("invalid otp!");
          }
    } catch (error) {
        console.log('======Error while otp Varification',error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleBackspace(index, e)}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Verify OTP
        </button>
        <button onClick={onClose} className="block mt-3 text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
