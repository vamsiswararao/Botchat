import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SuspectContact = ({ onNext,onSuspectContactSelected }) => {
  const [suspectContact, setSuspectContact] = useState(null);

  const handleOptionClick = (option,e) => {
    e.preventDefault();
    setSuspectContact(option.label);
    // Notify parent component about the selection
  };

  const handleOkClick = (e) => {
      e.preventDefault()
      onSuspectContactSelected(suspectContact)
      onNext(); // Notify parent component to move to the next question

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
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">8c</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>Which platform did the Suspect use to contact you?</h2>
          <div>
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  suspectContact === option.label ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option,e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                      suspectContact === option.label
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: suspectContact === option.label ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {suspectContact === option.label && (
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

export default SuspectContact;
