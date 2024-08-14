import React, { useState } from "react";

const SuspectContact = ({ onNext }) => {
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
      label: "WhatsApp",
    },
    { id: "B", label: "Telegram" },
    { id: "C", label: "Instagram" },
    { id: "D", label: "Facebook" },
    { id: "E", label: "Skype" },
    { id: "F", label: "Snap Chat" },
 
    
  ];

  return (
    <div className="question">
      <h3>Which platform did the Suspect use to contact you? *</h3>
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

export default SuspectContact;
