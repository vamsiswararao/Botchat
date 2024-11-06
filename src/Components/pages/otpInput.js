import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import appVersion from "../../version";
import CloudComponent from "../CloudComponent";
import Cloud from "../Cloud";
import Header from "./Header";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_AUTH_TOKEN;

const OtpInput = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true); // To disable resend button initially
  const [countdown, setCountdown] = useState(30); // Countdown for resend button
  const navigate = useNavigate();
  const app_ver = appVersion.app_ver;


  const otp_id = sessionStorage.getItem("otp_id");
  // const vist_id = sessionStorage.getItem("visitor_id");

  const vist_id = Cookies.get("visitor_id");

  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Allow only digits and limit to 10 characters
    if (/^\d*$/.test(inputValue) && inputValue.length <= 6) {
      setOtp(inputValue);
    }
  };

  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Clean up the timer
    } else {
      setResendDisabled(false); // Enable the resend button after 20 seconds
    }
  }, [resendDisabled, countdown]);

  // Function to handle OTP verification
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_otp_verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          otp_code: otp,
          otp_id: otp_id,
          visitor_token: vist_id,
          app_ver: app_ver,
        }),
      });

      const data = await response.json();
      if (data.resp.error_code === "0") {
        //setError("")
        // Store visitor_id in session storage
        //sessionStorage.setItem("visitor_id", data.resp.visitor_id);
        sessionStorage.setItem("otp_id", data.resp.otp_id);
        // const expirationDate = new Date();
        // expirationDate.setMinutes(expirationDate.getMinutes() + 15);
        // Cookies.set('visitor_id', data.resp.visitor_id, { path: '/', sameSite: 'Strict', expires: expirationDate });
        Cookies.set("bot_token", data.resp.bot_token, {
          path: "/",
          sameSite: "Strict",
          expires: 7,
        });
        //console.log("Visitor ID:", data.resp.visitor_id);
        //console.log("otp_id", data.resp.bot_token)
        navigate("/questions", { replace: true }); // Navigate on success
      } else {
        setErrorMessage("Invalid OTP"); // Display error message
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  // Function to handle OTP resend
  const handleResendOtp = async (type) => {
    try {
      setResendDisabled(true); // Disable the resend button
      setCountdown(20); // Reset countdown timer

      const response = await fetch(`${apiUrl}/v1/ccrim_otp_resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          otp_id: otp_id,
          visitor_token: vist_id,
          type: type,
          app_ver: app_ver,
        }),
      });

      const data = await response.json();
      //console.log(data.resp.error_code);
      if (data.resp.error_code === "0") {
        sessionStorage.setItem("otp_id", data.resp.otp_id);
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to resend OTP");
      }
    } catch (error) {
      console.error("Error during OTP resend:", error);
    }
  };

  return (
    <div className="otp-container">
  <Header />
      <div className="container">
        <h1>Verify OTP</h1>
        <p>
          We have sent an OTP to your phone number. Please enter it below to
          verify.
        </p>
        <input
          className="otp-input"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={handleChange}
          maxLength="6"
          name="otp"
        />

        {errorMessage ? (
          <p className="error-message">{errorMessage}</p>
        ) : (
          <p></p>
        )}
        {/* Display error message */}
        <button
          onClick={handleVerifyOtp}
          className="otp-btn"
          disabled={otp.length !== 6}
          style={{
            opacity: otp.length !== 6 ? 0.5 : 1, // Make the disabled option semi-transparent
            cursor: otp.length !== 6 ? "not-allowed" : "pointer", //
          }}
        >
          Verify OTP
        </button>

        {countdown <= 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => handleResendOtp("SMS")}
              className="resend-btn"
              disabled={resendDisabled} // Disable button if countdown is active
            >
              Resend OTP
            </button>
            <p style={{ color: "blue", marginTop: "30px" }}> | </p>
            <button
              onClick={() => handleResendOtp("Call")}
              className="resend-btn"
              disabled={resendDisabled} // Disable button if countdown is active
            >
              OTP via Call
            </button>
          </div>
        ) : (
          <p style={{ color: "rgb(0, 106, 255)" }}>
            00:{String(countdown).padStart(2, "0")}s
          </p>
        )}
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "0",
          left: "0",
        }}
      >
        <CloudComponent />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
        }}
      >
        <Cloud />
      </div>
    </div>
  );
};

export default OtpInput;
