import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const VictimGender = ({ onNext,onVictimGenderSelected }) => {
  const [gender, setGender] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  

  const handleOptionClick = async(option,e) => {
    e.preventDefault();
    setGender(option.label);// Notify parent component about the selection
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    } 
    setGender(option.label)
    handleOkClick()
    onVictimGenderSelected(option.label);
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

      console.log("Data pushed to RequestBin:", option.id);
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
    onNext(11);
      if (gender) {
        onNext(11);
      } else {
        setError("Please select an option before proceeding.");
        setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
      }
  };
 
  const options = [
    {
      id: "A",
      label: " Male",
    },
    { id: "B", label: "Female" },
    { id: "C", label: "Others" },
  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex"  }}>
          <h2 className='num'>6 d/10</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
          <h2>What is your (victim) gender? </h2>
          <div>
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  gender === option.label ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option,e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        gender === option.label
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: gender === option.label ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className='option-label'>{option.label}</div>
                </div>
                {gender === option.label && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
          </div>

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
  );
};

export default VictimGender;
