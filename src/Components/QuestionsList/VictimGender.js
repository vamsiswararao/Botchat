import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const VictimGender = ({ onNext,onVictimGenderSelected }) => {
  const [gender, setGender] = useState(null);

  const handleOptionClick = (option,e) => {
    e.preventDefault();
    setGender(option.label);
    // Notify parent component about the selection
  };

  const handleOkClick = (e) => {
    e.preventDefault()
    onVictimGenderSelected(gender)
      onNext(); // Notify parent component to move to the next question
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
          <h2 className='num'>7 d</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictimGender;
