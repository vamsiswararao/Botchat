import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL;

const HowLoss = ({ onNext, onHowLossSelected, answer,apiKey,botToken,vist_id,app_ver }) => {
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [howLoss, setHowLoss] = useState("");
  const navigate = useNavigate();
  //const vist_id = sessionStorage.getItem("visitor_id");
  //const vist_id = Cookies.get("visitor_id");

  const handleKeyDown = (event) => {
    if (event.altKey && event.key === "Enter") {
      event.preventDefault();
      setHowLoss((prevValue) => prevValue + "\n");
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleOkClick(event); // Call the submit function when Enter is pressed
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;

    // Regular expression to allow only alphanumeric characters and specific symbols
    const regex = /^[a-zA-Z0-9., _()&#@-]*$/;

    if (value.length <= 500 && regex.test(value)) {
      setHowLoss(value);
      onHowLossSelected(value);
      setShowOkButton(true); // Show the OK button after a successful click
      setError("");
      localStorage.setItem("des", JSON.stringify(value));
    } else if (value.length > 500) {
      setError("Please limit your input to 500 characters.");
    } else {
      setError(
        "Invalid characters detected. Only letters, numbers, ., _, -, space, (), #, and @ are allowed."
      );
    }
  };

  const handleOkClick = async (e) => {
    e.preventDefault();
    onHowLossSelected(howLoss);
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          visitor_token: vist_id,
          qtion_id: "66f655a76d2d0",
          qtion_num: "17",
          option_val: howLoss,
          lac_token: botToken,
          "app_ver":app_ver
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save address");
      }
      const data = await response.json();
     // console.log(data)
      if (data.resp.error_code === "0") {
        sessionStorage.setItem("comp_id", data.resp.complaint_num);
        // List of keys to remove from localStorage
        const keysToRemove = [
          "gender",
          "howMuch",
          "Profession",
          "policeStation",
          "qualification",
          "suspectCall",
          "suspectContact",
          "suspectSpeck",
          "time",
          "victimAge",
          "victimName",
          "zip",
          "file",
          "des",
          "address1",
          "city",
          "formData",
          "district",
          "phoneNumber",
          "formSuspectData",
          "formVictimData",
        ];

        // Loop through the keys and remove them from localStorage
        keysToRemove.forEach((key) => {
          localStorage.removeItem(key);
        });

        sessionStorage.removeItem("access_id");


        navigate("/success", { replace: true } );
        sessionStorage.removeItem("visitor_id");
        sessionStorage.removeItem("otp_id");
        setError("");
      } else {
        setError("Failed to push data to API");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save amount");
    }
    // if (howLoss) {
    //   navigate("/success");
    //   sessionStorage.removeItem("visitor_id");
    //   sessionStorage.removeItem("otp_id");
    // } else {
    //   setError("Please answer before proceeding.");
    //   setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    // }
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div>
          <h2 htmlFor="lose-money">Can you explain how you lost the money?</h2>
          <p>Write in detail about how you lost the money.</p>
          <textarea
            value={howLoss}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            id="lose-money"
            rows="8"
            cols="80"
            className="responsive-textarea"
            maxLength="500"
          />
          <p style={{ color: "red" }}>Maximum of 500 Characters</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            {showOkButton && (
              <>
                <button
                  type="button"
                  className="ok-btn"
                  onClick={handleOkClick}
                >
                  OK
                </button>
                <p className="enter-text">
                  press <strong>Enter ↵</strong>
                </p>
              </>
            )}
            {error && <div className="error-message">{error}</div>}

            {answer[16] && (
              <p className="alert-box">
                Please answer the current question before moving to the next.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowLoss;
