import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Time = ({onNext,onTimeSelected}) => {
  const [timeId, setTimeId] = useState(null);
  const [time, setTime] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleOptionClick = (option,e) => {
    e.preventDefault();
    setTimeId(option.id);
    setTime(option.label);
    onTimeSelected(time)
    onNext() 
    setShowOkButton(true); // Hide the OK button after successful click
    setError("")
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onTimeSelected(time)
    if (time) {
      console.log("Selected Option:", time);
      onNext();
      // Proceed with the next steps
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after successful click
        
    }
    };

  const options = [
    { id: "A", label: "In less than 24 hours" },
    { id: "B", label: "Between 24 hours to 48 hours" },
    { id: "C", label: "Between 48 hours to 72 hours" },
    { id: "D", label: "Above 72 hours" },
  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">4</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>When did you lost the amount? </h2>
          <div className="options-container">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  timeId === option.id ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option,e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        timeId === option.id
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: timeId === option.id ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {timeId === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
            <div>
            {showOkButton && (
              <>
                <button type="button" className="ok-btn" onClick={handleOkClick}>
                  OK
                </button>
                <p className="enter-text">press <strong>Enter ↵</strong></p>
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

export default Time;