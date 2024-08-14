import React, { useState } from "react";

const SuspectSpeak = ({ onNext }) => {
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
    { id: "B", label: "Assamese" },
    { id: "C", label: "Bengali" },
    { id: "D", label: "Bodo" },
    { id: "E", label: "Dogri" },
    { id: "F", label: "English" },
    { id: "G", label: "Gujarati" },
    { id: "H", label: "Hindi" },
    { id: "I", label: "Kannada" },
    { id: "J", label: "Jammu and Kashmir" },
    { id: "K", label: "konkani" },
    { id: "L", label: "Malayalam" },
    { id: "M", label: "Manipuri" },
    { id: "N", label: "Marathi" },
    { id: "O", label: "Nepali" },
    { id: "P", label: "Odia" },
    { id: "Q", label: "Punjabi" },
    { id: "R", label: "Sanskrit" },
    { id: "S", label: "Santali" },
    { id: "T", label: "Sindhi" },
    { id: "U", label: "Tamil" },
    { id: "V", label: "Telugu" },
    { id: "W", label: "Urdu" },



    

   
  ];

  return (
    <div className="question">
      <h3>What language did the suspect speak? *</h3>
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

export default SuspectSpeak;
