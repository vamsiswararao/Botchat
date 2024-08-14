import React, { useState } from "react";

const MultipleChoiceQuestion = ({ question, options, onSelect, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (id) => {
    setSelectedOption(id);
    onSelect(id); // Notify parent component about the selection
  };

  const handleOkClick = () => {
    if (selectedOption) {
      onNext(); // Notify parent component to move to the next question
    }
  };

  return (
    <div className="question">

      <h3>{question} *</h3>
      <div>
        {options.map((option) => (
          <button
            key={option.id}
            className={`option-button ${selectedOption === option.id ? "selected" : ""}`}
            onClick={() => handleOptionClick(option.id)}
          >
            <div className="answer-container">
              <div
                className="option"
                style={{
                  backgroundColor: selectedOption === option.id ? "rgb(62, 87, 255)" : "#fff",
                  color: selectedOption === option.id ? "#fff" : "#3E57FF",
                }}
              >
                {option.id}
              </div>
              <div>{option.label}</div>
            </div>
            {selectedOption === option.id && (
              <span className="checkmark">
                &#10003; {/* Unicode character for checkmark */}
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="ok-btn"
        onClick={handleOkClick}
        disabled={!selectedOption} // Disable the button if no option is selected
      >
        OK
      </button>
    </div>
  );
};

export default MultipleChoiceQuestion;
