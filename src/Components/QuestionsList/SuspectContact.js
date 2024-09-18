import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SuspectContact = ({ onNext, onSuspectContactSelected }) => {
  const [suspectContacts, setSuspectContacts] = useState([]);

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    if (suspectContacts.includes(option.label)) {
      setSuspectContacts(suspectContacts.filter((contact) => contact !== option.label));
    } else {
      setSuspectContacts([...suspectContacts, option.label]);
    }
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onSuspectContactSelected(suspectContacts);
    onNext(15); // Notify parent component to move to the next question
  };

  const options = [
    { id: "A", label: "WhatsApp" },
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
          <h2 className="num">5c/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>Through Which platform(s) did the Suspect communicate with you?</h2>
          <div>
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  suspectContacts.includes(option.label) ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: suspectContacts.includes(option.label)
                        ? "rgb(62, 87, 255)"
                        : "#fff",
                      color: suspectContacts.includes(option.label) ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {suspectContacts.includes(option.label) && (
                  <span className="checkmark">&#10003;</span>
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
