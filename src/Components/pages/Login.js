import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Cookies from 'js-cookie';
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_AUTH_TOKEN;
//import "./phoneNumber.css";

const Login = (onOtpSent) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Allow only digits and limit to 10 characters
    if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
      setPhoneNumber(inputValue);
    }
  };

  const handleSendOtp = async () => {
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

    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ api_key: apiKey, mob: phoneNumber }),
      });

      const data = await response.json();

      if (data.resp.error_code === "0") {

        // Store visitor_id in session storage
        sessionStorage.setItem("visitor_id", data.resp.visitor_id);
        sessionStorage.setItem("otp_id", data.resp.otp_id);
        // const expirationDate = new Date();
        // expirationDate.setMinutes(expirationDate.getMinutes() + 15); 
        // Cookies.set('visitor_id', data.resp.visitor_id, { path: '/', sameSite: 'Strict', expires: expirationDate });
        // Cookies.set('otp_id', data.resp.otp_id, { path: '/', sameSite: 'Strict', expires: expirationDate });
        console.log("Visitor ID:", data.resp.visitor_id);
        console.log("otp_id", data.resp.otp_id);

        // Navigate to OTP page
        navigate("/otp");
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error during OTP sending:", error);
    }
  };

  return (
    <div className="login-container">
      <header>
        <div
          style={{
            display: "flex",
            flexDirection: "colum",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src="\images\LOGO-TS2.jpg" alt="csb-ts" className="cst-logo" />
          <h1
            className="header-title"
            style={{ padding: 20, textAlign: "center" }}
          >
            1930-Cyber Bot
          </h1>
          <img src="\images\LOGO-INDIA.png" alt="csb-ts" className="csi-logo" />
        </div>
      </header>
      <div className="container">
        <h1>Login</h1>
        <p>
          Please enter your phone number to receive a One-Time Password (OTP).
        </p>
        <input
          type="text"
          className="phone_number_input"
          placeholder="Enter The Phone Number"
          value={phoneNumber}
          onChange={handleChange}
          autoComplete="off"
          name="number"
          maxLength="10"
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
