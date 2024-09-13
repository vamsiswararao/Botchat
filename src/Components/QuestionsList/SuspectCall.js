import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SuspectCall = ({ onNext, onSuspectCallSelected }) => {
  const [selectedCalls, setSelectedCalls] = useState([]);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    }
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");

    setSelectedCalls((prevSelectedCalls) => {
      const updatedCalls = prevSelectedCalls.includes(option.label)
        ? prevSelectedCalls.filter((call) => call !== option.label)
        : [...prevSelectedCalls, option.label];

      // Save data after state update
      saveDataToAPI(updatedCalls);
      return updatedCalls;
    });
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    if (selectedCalls.length > 0) {
      onSuspectCallSelected(selectedCalls);
      onNext(14);
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  // Function to save data to RequestBin API
  const saveDataToAPI = async (calls) => {
    const payload = {
      Calls: calls,
    };

    try {
      const response = await fetch("https://enrbgth6q54c8.x.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const options = [
    { id: "A", label: "Normal Call-Number" },
    { id: "B", label: "WhatsApp Call-Number" },
    { id: "C", label: "Telegram Call-Number" },
    { id: "D", label: "Instagram Call-Number" },
    { id: "E", label: "Facebook Call-Number" },
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
          <h2 className="num">7 a/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>How did the suspect call you?</h2>
          <div className="option-list">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  selectedCalls.includes(option.label) ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: selectedCalls.includes(option.label)
                        ? "rgb(62, 87, 255)"
                        : "#fff",
                      color: selectedCalls.includes(option.label)
                        ? "#fff"
                        : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {selectedCalls.includes(option.label) && (
                  <span className="checkmark">&#10003;</span> // Unicode character for checkmark
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

export default SuspectCall;
