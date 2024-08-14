import { useState } from "react";
//import "./phoneNumber.css";

const PhoneNumber = (onOtpSent) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSendOtp = () => {
    fetch("http://localhost:3001/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          onOtpSent(phoneNumber);
        } else {
          alert("Failed to send OTP");
        }
      })
      .catch((error) => {
        console.error("Error during OTP sending:", error);
      });
  };
  return (
    <div className="container">
      <h1>OTP Verification</h1>
      <p>Please enter your phone number to receive a One-Time Password (OTP).</p>      <input
        type="tel"
        className="phone_number_input"
        placeholder="Enter The Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button className="phone_number_btn" onClick={handleSendOtp}>
        Send OTP
      </button>
    </div>
  );
};

export default PhoneNumber;
