import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const OtpInput = ({ phoneNumber, onOtpVerified }) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Function to handle OTP verification
  const handleVerifyOtp = () => {
    // fetch('http://localhost:3001/verify-otp', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ phoneNumber, otp }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     onOtpVerified();
    //   } else {
    //     alert("Invalid OTP");
    //   }
    // })
    // .catch(error => {
    //   console.error("Error during OTP verification:", error);
    // });
    navigate("/questions");
  };

  return (
    <div className="otp-container">

    <div className="container">
      <h1>Enter OTP</h1>
      <p>We have sent an OTP to your phone number. Please enter it below to verify.</p>
      <input
      className="otp-input"
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp} className="otp-btn">Verify OTP</button>
    </div>
      </div>
  );
};

export default OtpInput;
