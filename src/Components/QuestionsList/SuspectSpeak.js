import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SuspectSpeak = ({ onNext, onSuspectSpeakSelected }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleOptionClick = (label, e) => {
    e.preventDefault();
    if (selectedOptions.disabled) {
      return; // Ignore clicks on disabled options
    } 
    //setHelp(option.id);
    //onHelpSelected(option.id);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
    // Toggle selection
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(label)
        ? prevSelected.filter((option) => option !== label)
        : [...prevSelected, label]
    );
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onSuspectSpeakSelected(selectedOptions);
    if (selectedOptions.length > 0) {
      onNext(15);
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  const options = [
    { id: "A", label: "Telugu" },
    { id: "B", label: "English" },
    { id: "C", label: "Hindi" },
    { id: "D", label: "Tamil" },
    { id: "E", label: "Bengali" },
    { id: "F", label: "Gujarati" },
    { id: "G", label: "Bodo" },
    { id: "H", label: "Kannada" },
    { id: "I", label: "Jammu and Kashmir" },
    { id: "J", label: "Konkani" },
    { id: "K", label: "Malayalam" },
    { id: "L", label: "Manipuri" },
    { id: "M", label: "Marathi" },
    { id: "N", label: "Nepali" },
    { id: "O", label: "Odia" },
    { id: "P", label: "Punjabi" },
    { id: "Q", label: "Sanskrit" },
    { id: "R", label: "Santali" },
    { id: "S", label: "Sindhi" },
    { id: "T", label: "Dogri" },
    { id: "U", label: "Assamese" },
    { id: "V", label: "Urdu" },
  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">7b/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>What language did the suspect speak? *</h2>
          <div className="option-list">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  selectedOptions.includes(option.label) ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option.label, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: selectedOptions.includes(option.label)
                        ? "rgb(62, 87, 255)"
                        : "#fff",
                      color: selectedOptions.includes(option.label)
                        ? "#fff"
                        : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {selectedOptions.includes(option.label) && (
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

export default SuspectSpeak;
