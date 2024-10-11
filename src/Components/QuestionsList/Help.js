import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const Help = ({ onNext, onHelpSelected,onQuestion,answer }) => {
  const [help, setHelp] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const vist_id = sessionStorage.getItem("visitor_id");
  const handleHelpOptionClick = async(option, e) => {
    e.preventDefault();
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    } 
    setHelp(option.id);
    onHelpSelected(option.id);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");

    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_help_request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "api_key":"1725993564",
          "visitor_token":vist_id,
          "qtion_id":"66f6524562171",
          "qtion_num":"1",
          "qtion_option":option.id,
          "option_val":"1725993564"
         }),
      });
      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        throw new Error("Failed to push data to API");
      }

      //console.log("Data pushed to RequestBin:", option.id);
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    console.log("Selected Option:", help);
    if (help) {
      if(help==="A"){
        navigate("/login");
      }else if (help === "B") {
        window.location.href = "https://www.cybercrime.gov.in/"; // Redirect to external URL
      }
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  const helpOptions = [
    { id: "A", label: "Did you lose an amount in Cybercrimes?" },
    {
      id: "B",
      label: "Have you faced Cybercrime in Non-financial cyber fraud?",
    },
    { id: "C", label: " Do you want to know the status of the complaint?", disabled: true }, // Option C is disabled
  ];

  return (
    <div className="help">
      <div style={{ display: "flex" }}>
        <div>
          <h2>How may i help you? </h2>
          <div className="options-container">
            {helpOptions.map((option) => (
              <button
                style={{
                  opacity: option.disabled ? 0.5 : 1, // Make the disabled option semi-transparent
                  cursor: option.disabled ? "not-allowed" : "pointer", //
                }}
                key={option.id}
                className={`option-button ${
                  help === option.id ? "selected" : ""
                } ${option.disabled ? "disabled" : ""}`}
                onClick={(e) => handleHelpOptionClick(option, e)}
                disabled={option.disabled} // Disable the button if the option is disabled
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                      help === option.id ? "#000" : "#fff",
                      color:help === option.id ? "#fff" : "#000",
                    }}

                  >
                    {option.id}
                  </div>
                  <div

                    className="option-label"
                  >
                    {option.label}
                  </div>
                </div>
                {help === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
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
            </div>
            {error && <div className="error-message">{error}</div>}
              {answer[0] && (
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

export default Help;
