import React, { useState } from "react";

const VictimBank = ({ onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    platform: null,
    contactMethod: null,
  });
  const [textAnswers, setTextAnswers] = useState({
    contactDetails: "",
    suspectName: "",
  });

  const handleOptionClick = (questionId, optionId) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleTextChange = (questionId, value) => {
    setTextAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleOkClick = () => {
    if (selectedOptions.platform && selectedOptions.contactMethod && textAnswers.contactDetails && textAnswers.suspectName) {
      onNext(); // Notify parent component to move to the next step
    }
  };

  const platformOptions = [
    { id: "A", label: "Bank Name" },
    { id: "B", label: "UPI" },
    { id: "C", label: "Credit Card" },
  ];

  const contactMethodOptions = [
    { id: "A", label: "SBI" },
    { id: "B", label: "HDFC" },
  ];

  return (
    <div className="question">
      <h3>Share the Victim (Deditors) bank Details? *</h3>
      <p className="bank-para">Category of account:</p>
      <div>
        {platformOptions.map((option) => (
          <button
            key={option.id}
            className={`option-button ${selectedOptions.platform === option.id ? "selected" : ""}`}
            onClick={() => handleOptionClick("platform", option.id)}
          >
            <div className="answer-container">
              <div
                className="option"
                style={{
                  backgroundColor: selectedOptions.platform === option.id ? "rgb(62, 87, 255)" : "#fff",
                  color: selectedOptions.platform === option.id ? "#fff" : "#3E57FF",
                }}
              >
                {option.id}
              </div>
              <div>{option.label}</div>
            </div>
            {selectedOptions.platform === option.id && (
              <span className="checkmark">&#10003;</span>
            )}
          </button>
        ))}
      </div>

      <p className="bank-para">Bank Name:</p>
      <div>
        {contactMethodOptions.map((option) => (
          <button
            key={option.id}
            className={`option-button ${selectedOptions.contactMethod === option.id ? "selected" : ""}`}
            onClick={() => handleOptionClick("contactMethod", option.id)}
          >
            <div className="answer-container">
              <div
                className="option"
                style={{
                  backgroundColor: selectedOptions.contactMethod === option.id ? "rgb(62, 87, 255)" : "#fff",
                  color: selectedOptions.contactMethod === option.id ? "#fff" : "#3E57FF",
                }}
              >
                {option.id}
              </div>
              <div>{option.label}</div>
            </div>
            {selectedOptions.contactMethod === option.id && (
              <span className="checkmark">&#10003;</span>
            )}
          </button>
        ))}
      </div>

      <p className="bank-para">Account NO/ Wallet No/ UPI NO:</p>
      <input
        type="text"
        value={textAnswers.contactDetails}
        onChange={(e) => handleTextChange("contactDetails", e.target.value)}
        placeholder="Type tour answer here..."
        className='text-input'
      />

      <p className="bank-para">Transaction/ RRN number:</p>
      <input
        type="text"
        value={textAnswers.suspectName}
        onChange={(e) => handleTextChange("suspectName", e.target.value)}
        placeholder="Type your answer here..."
        className="text-input"
      />

      <button
        type="button"
        className="ok-btn"
        onClick={handleOkClick}
        disabled={!selectedOptions.platform || !selectedOptions.contactMethod || !textAnswers.contactDetails || !textAnswers.suspectName}
      >
        OK
      </button>
    </div>
  );
};

export default VictimBank;
