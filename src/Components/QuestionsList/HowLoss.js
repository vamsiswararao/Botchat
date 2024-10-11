import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;


const HowLoss = ({ onNext, onHowLossSelected,answer }) => {
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [howLoss, setHowLoss] = useState("");
  const navigate = useNavigate()
  const vist_id = sessionStorage.getItem("visitor_id");
  
  const handleKeyDown = (event) => {
    if (event.altKey && event.key === 'Enter') {
      event.preventDefault();
      setHowLoss((prevValue) => prevValue + '\n');
    } else if (event.key === 'Enter') {
      event.preventDefault();
      handleOkClick(event); // Call the submit function when Enter is pressed
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setHowLoss(event.target.value);
    if (event.target.checked) {
      return; // Ignore clicks on disabled options
    }
    setHowLoss(event.target.value);
    onHowLossSelected(event.target.value);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
  };

  const handleOkClick = async(e) => {
    e.preventDefault(); 
    onHowLossSelected(howLoss);
    console.log("Submitted value:", howLoss);
    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_add_text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "api_key": "1725993564",
          "visitor_token": vist_id,
          "qtion_id":"66f655a76d2d0",
          "qtion_num": "18",
          "option_val": howLoss,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save address");
      }

      const result = await response.json();
      console.log("Saved data:", result);
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save amount");
    }
    if (howLoss) {
      navigate("/success");
      sessionStorage.removeItem("visitor_id");
      sessionStorage.removeItem("otp_id");
    } else {
      setError("Please answer before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div >
          <h2 htmlFor="lose-money">Can you explain  how you lose money?</h2>
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
          />
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
