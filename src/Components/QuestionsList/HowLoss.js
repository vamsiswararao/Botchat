import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const HowLoss = ({ onNext, onHowLossSelected }) => {
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
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onHowLossSelected(howLoss);
    console.log("Submitted value:", howLoss);
    onNext();
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">6</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2 htmlFor="lose-money">How did you lose money?</h2>
          <p>Write in detail about how you lost the money.</p>
          <textarea
            className="text-input"
            value={howLoss}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            id="lose-money"
            rows="5"
            cols="50"
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="ok-btn" onClick={handleOkClick}>
              ok
            </button>
            <p className="enter-text">
              press <strong>Alt + Enter</strong> to add a new line, <br/>
              or <strong>Enter ↵</strong> to Ok
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowLoss;
