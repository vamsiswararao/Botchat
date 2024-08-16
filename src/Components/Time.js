import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Time = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
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
          <h2 className="num">3</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>How can we help you? </h2>
          <div className="options-container">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  selectedOption === option.id ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
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
                  <div className="option-label">{option.label}</div>
                </div>
                {selectedOption === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
            <div style={{ display: "flex", alignItems: "center" }}>
              <button type="button" className="ok-btn">
                ok
              </button>
              <p className="enter-text">
                press <strong>Enter ↵</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Time;