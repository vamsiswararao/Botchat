import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SuspectSpeak = ({ onNext,onSuspectSpeakSelected }) => {
  const [suspectSpeak, setSuspectSpeck] = useState(null);

  const handleOptionClick = (label,e) => {
    e.preventDefault();
    setSuspectSpeck(label);
    // Notify parent component about the selection
  };

  const handleOkClick = (e) => {
      e.preventDefault();
      onSuspectSpeakSelected(suspectSpeak)
      onNext(); // Notify parent component to move to the next question

  };

  const options = [
    { id: "A", label: "Assamese" },
    { id: "B", label: "Bengali" },
    { id: "C", label: "Bodo" },
    { id: "D", label: "Dogri" },
    { id: "E", label: "English" },
    { id: "F", label: "Gujarati" },
    { id: "G", label: "Hindi" },
    { id: "H", label: "Kannada" },
    { id: "I", label: "Jammu and Kashmir" },
    { id: "J", label: "konkani" },
    { id: "K", label: "Malayalam" },
    { id: "L", label: "Manipuri" },
    { id: "M", label: "Marathi" },
    { id: "N", label: "Nepali" },
    { id: "O", label: "Odia" },
    { id: "P", label: "Punjabi" },
    { id: "Q", label: "Sanskrit" },
    { id: "R", label: "Santali" },
    { id: "S", label: "Sindhi" },
    { id: "T", label: "Tamil" },
    { id: "U", label: "Telugu" },
    { id: "V", label: "Urdu" },
  ];

  return (
    <div className="question">
      <div style={{display:"flex"}}>
        <div style={{ display: "flex" }}>
          <h2 className="num">7a</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div >
          <h2 >What language did the suspect speak? *</h2>
          <div className="option-list">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  suspectSpeak === option.id ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option.label,e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                      suspectSpeak === option.label
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: suspectSpeak === option.label ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {suspectSpeak === option.label && (
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

export default SuspectSpeak;
