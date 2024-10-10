import React, { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const Time = ({ onNext, onTimeSelected, onQuestion, answer }) => {
  const [timeId, setTimeId] = useState(null);
  const [time, setTime] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const vist_id = sessionStorage.getItem("visitor_id");

  const handleOptionClick = async (option, e) => {
    console.log(option);
    e.preventDefault();
    setTimeId(option.id);
    setTime(option.id);
    onTimeSelected(option.id);
    onNext(2);
    onQuestion(3);
    setShowOkButton(true); // Hide the OK button after successful click
    setError("");
    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "1725993564",
          visitor_token: vist_id,
          qtion_id: "66f6529450490",
          qtion_num: "2",
          qtion_option: option.id,
          option_val: option.value,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Failed to push data to API");
      }
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
    //e.preventDefault();
    if (time) {
      console.log("Selected Option:", time);
      onNext(2);
      onQuestion(3);
      // Proceed with the next steps
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after successful click
    }
  };

  const options = [
    { id: "A", value: "66ed1e0468ff6", label: "In less than 24 hours" },
    { id: "B", value: "66ed1e2bc8090", label: "Between 24 hours to 48 hours" },
    { id: "C", value: "66ed1e4820de2", label: "Between 48 hours to 72 hours" },
    { id: "D", value: "66ed1e62ab153", label: "Above 72 hours" },
  ];

  return (
    <div  className="question">
      <div>
        <div>
          <h2>When did you lost the amount? </h2>
          <div className="options-container">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  timeId === option.id ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        timeId === option.id ? "#000" : "#fff",
                      color: timeId === option.id ? "#fff" : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {timeId === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
            <div>
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
              {answer[1] && (
                <p className="alert-box">
                  Please answer the current question before moving to the next.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Time;
