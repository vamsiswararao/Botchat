import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SuspectCall = ({ onNext , onSuspectCallSelected}) => {
  const [suspectCall, setSuspectCall] = useState(null);

  const handleOptionClick = (option,e) => {
    e.preventDefault();
    setSuspectCall(option.label);
    // Notify parent component about the selection
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onSuspectCallSelected(suspectCall)
      onNext(); // Notify parent component to move to the next question
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
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">8 a</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>How did the suspect call you? </h2>
          <div>
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  suspectCall === option.label ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option,e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                      suspectCall === option.label
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: suspectCall === option.label ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {suspectCall === option.label && (
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

export default SuspectCall;
