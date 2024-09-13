import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const HowLoss = ({ onNext, onHowLossSelected }) => {
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [howLoss, setHowLoss] = useState("");

  const handleKeyDown = (event) => {
    if (event.altKey && event.key === 'Enter') {
      event.preventDefault();
      setHowLoss((prevValue) => prevValue + '\n');
    } else if (event.key === 'Enter') {
      event.preventDefault();
      handleOkClick(event); // Call the submit function when Enter is pressed
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setHowLoss(event.target.value);
    if (event.target.checked) {
      return; // Ignore clicks on disabled options
    }
    setHowLoss(event.target.value);
    onHowLossSelected(event.target.value);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onHowLossSelected(howLoss);
    console.log("Submitted value:", howLoss);
    if (howLoss) {
      onNext(5);
    } else {
      setError("Please answer before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">5/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2 htmlFor="lose-money">How did you lose money?</h2>
          <p>Write in detail about how you lost the money.</p>
          <textarea
            value={howLoss}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            id="lose-money"
            rows="8"
            cols="80"
            className="responsive-textarea"
          />
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

export default HowLoss;
