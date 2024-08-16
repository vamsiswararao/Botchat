import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const VictimGender = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (id) => {
    setSelectedOption(id);
    // Notify parent component about the selection
  };

  const handleOkClick = () => {
    if (selectedOption) {
      onNext(); // Notify parent component to move to the next question
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
          <h2 className='num'>6 d</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
          <h2>What is your (victim) gender? </h2>
          <div>
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  selectedOption === option.id ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option.id)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        selectedOption === option.id
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: selectedOption === option.id ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className='option-label'>{option.label}</div>
                </div>
                {selectedOption === option.id && (
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
            disabled={!selectedOption} // Disable the button if no option is selected
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
