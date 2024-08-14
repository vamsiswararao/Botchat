import React, { useState } from "react";

const SuspectCall = ({ onNext }) => {
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
      label: " Normal Call-Number",
    },
    { id: "B", label: "WhatsApp Call-Number" },
    { id: "C", label: "Telegram Call-NUmber" },
    { id: "D", label: "instagram Call-Number" },
    { id: "E", label: "FaceBook Call-Number" },
    { id: "F", label: "Skype Call-Number" },
    { id: "G", label: "Zoom Call-Number" },
    { id: "H", label: "Snap Call-Number" },
    { id: "I", label: "Webex Call-Number" },
    { id: "J", label: "Duos Call-Number" },
    { id: "K", label: "Microsoft Call-Number" },
    

   
  ];

  return (
    <div className="question">
      <h3>How did the suspect call you? *</h3>
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

export default SuspectCall;
