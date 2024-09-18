import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Help = ({ onNext, onHelpSelected }) => {
  const [help, setHelp] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);


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
      const response = await fetch("https://enrbgth6q54c8.x.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOption: option.label }),
      });

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
        onNext(1);
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
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">1/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>How may I help you? *</h2>
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
              {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
