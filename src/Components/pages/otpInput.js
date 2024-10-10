import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const OtpInput = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true); // To disable resend button initially
  const [countdown, setCountdown] = useState(20); // Countdown for resend button
  const navigate = useNavigate();

  const otp_id = sessionStorage.getItem("otp_id");
  const vist_id = sessionStorage.getItem("visitor_id");

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
      const response = await fetch(`${apiUrl}/ccrim_bot_otp_verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "1725993564",
          otp_code: otp,
          otp_id: otp_id,
          visitor_token: vist_id,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.resp.error_code === "0" ) {
        navigate("/questions", { replace: true }); // Navigate on success
      } else {
        setErrorMessage("Invalid OTP"); // Display error message
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  // Function to handle OTP resend
  const handleResendOtp = async () => {
    try {
      setResendDisabled(true); // Disable the resend button
      setCountdown(20); // Reset countdown timer

      const response = await fetch(`${apiUrl}/ccrim_otp_resend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "1725993564",
          otp_id: otp_id,
          visitor_token: vist_id,
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.resp.error_code);
      sessionStorage.setItem("otp_id", data.resp.otp_id);
      if (data.resp.error_code === "0") {
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
      <header>
        <div
          style={{
            display: "flex",
            flexDirection: "colum",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src="\images\LOGO-TS.jpg" alt="csb-ts" className="cst-logo" />
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
        <h1>Enter OTP</h1>
        <p>
          We have sent an OTP to your phone number. Please enter it below to
          verify.
        </p>
        <input
          className="otp-input"
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Display error message */}
        <button onClick={handleVerifyOtp} className="otp-btn">
          Verify OTP
        </button>
        <button
          onClick={handleResendOtp}
          className="resend-btn"
          disabled={resendDisabled} // Disable button if countdown is active
        >
          {countdown <= 0 ? (
  <>
    <span>Resend OTP | </span> 
    <span>OTP via Call</span>
  </>
) : (
  <span>00:{countdown}s</span>
)}
        </button>
      </div>
    </div>
  );
};

export default OtpInput;
