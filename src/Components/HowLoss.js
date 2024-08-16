import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const HowLoss = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log("Submitted value:", value);
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">5</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2 htmlFor="lose-money">How did you lose money?</h2>
          <p>Write in detail about how you lost the money.</p>
          <input
            className="text-input"
            value={value}
            onChange={handleChange}
            placeholder="Type your answer here..."
            id="lose-money"
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="ok-btn">
              ok
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

export default HowLoss;
