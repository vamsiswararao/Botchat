import React, { useState } from "react";


const OtpInput = ({ phoneNumber, onOtpVerified }) => {
  const [otp, setOtp] = useState("");

  // Function to handle OTP verification
  const handleVerifyOtp = () => {
    fetch('http://localhost:3001/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, otp }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        onOtpVerified();
      } else {
        alert("Invalid OTP");
      }
    })
    .catch(error => {
      console.error("Error during OTP verification:", error);
    });
  };

  return (
    <div className="container">
      <h1>Enter OTP</h1>
      <p>We have sent an OTP to your phone number. Please enter it below to verify.</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
};

export default OtpInput;
