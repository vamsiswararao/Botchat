import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./phoneNumber.css";

const Login = (onOtpSent) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust regex as needed for your format
    if (!phoneNumber) {
      setError("Phone number is required.");
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    localStorage.setItem("phoneNumber", phoneNumber);
    // fetch("http://localhost:3001/send-otp", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ phoneNumber }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       onOtpSent(phoneNumber);
    //navigate("/otp", { state: { phoneNumber } });
    //     } else {
    //       alert("Failed to send OTP");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error during OTP sending:", error);
    //   });
    navigate("/otp");
  };
  return (
    <div className="login-container">
    <div className="container">
      <h1>Login</h1>
      <p>Please enter your phone number to receive a One-Time Password (OTP).</p>      <input
        type="tel"
        className="phone_number_input"
        placeholder="Enter The Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <button className="phone_number_btn" onClick={handleSendOtp}>
        Send OTP
      </button>
    </div>
    </div>
  );
};

export default Login;