import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useLocation } from "react-router-dom";
import appVersion from '../../version';
import CloudComponent from "../CloudComponent";
import Cloud from "../Cloud";
import Header from "./Header";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_AUTH_TOKEN;

const Login = (onOtpSent) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const vist_id = Cookies.get('visitor_id');
  const app_ver = appVersion.app_ver;

  const location = useLocation();
  const { number } = location.state || {};

  useEffect(() => {
    if (number) {
      setPhoneNumber(number);
    }
  }, [number]);

  const handleSendOtp = async () => {
    const phoneRegex = /^[0-9]{10}$/; 
    if (!phoneNumber) {
      setError("Phone number is required.");
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ api_key: apiKey, mob: phoneNumber, visitor_token: vist_id, "app_ver": app_ver }),
      });

      const data = await response.json();
      if (data.resp.error_code === "0") {
        sessionStorage.setItem("otp_id", data.resp.otp_id);
        setError("");
        navigate("/otp", { replace: true });
      } else {
        setError(data.resp.message);
      }
    } catch (error) {
      console.error("Error during OTP sending:", error);
    }
  };

  return (
    <div className="login-container">
      <Header />
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
          readOnly
          autoComplete="off"
          name="number"
          maxLength="10"
        />
        {error && <p className="error-message">{error}</p>}
        <button className="phone_number_btn" onClick={handleSendOtp}>
          Send OTP
        </button>
      </div>
      <div style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
           zIndex:'0'
        }} >
        <CloudComponent />
      </div>
      <div style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
           zIndex:'0'
        }} >
        <Cloud />
      </div>
    </div>
  );
};

export default Login;
