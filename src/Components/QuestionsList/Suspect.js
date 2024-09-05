import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Suspect = ({ onNext }) => {
  const handleContinue = () => {
    // Call the onNext function passed as a prop to move to the next step
    onNext(15);
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">7/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2 htmlFor="lose-money">Suspect Details</h2>
          <p>Answer the set of questions about Suspect/Fraudster.</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="continue-btn" onClick={handleContinue}>
              Continue
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

export default Suspect;
