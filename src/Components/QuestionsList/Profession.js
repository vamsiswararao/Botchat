import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Profession = ({ onNext,onVictimProfessionSelected }) => {
  const [Profession, setProfession] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  

  const handleOptionClick = async(option,e) => {
    e.preventDefault();
    setProfession(option.label);// Notify parent component about the selection
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    } 
    setProfession(option.label)
    handleOkClick()
    onVictimProfessionSelected(option.label);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
    onNext(9);
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
      if (Profession) {
        onNext(9);
      } else {
        setError("Please select an option before proceeding.");
        setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
      }
  };
 
  const options = [
    {
      id: "A",
      label: "Business",
    },
    { id: "B", label: "Farmer" },
    { id: "C", label: "Govt Employee" },
    {
        id: "D",
        label: "House Wife",
      },
      { id: "E", label: "Private Employee" },
      { id: "F", label: "Self Employee" },
      { id: "G", label: "Senior Citizen" },
      { id: "H", label: "Software/IT Corporate Employee" },
      { id: "I", label: "Student" },
      { id: "I", label: "Un-Employee" },


    ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex"  }}>
          <h2 className='num'>4 e/10</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
          <h2>What is your (victim) Profession? </h2>
          <div className="option-list">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                    Profession === option.label ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option,e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                      Profession === option.label
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: Profession === option.label ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className='option-label'>{option.label}</div>
                </div>
                {Profession === option.label && (
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

export default Profession;
