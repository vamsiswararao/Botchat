import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Victim = ({ onNext }) => {
  // const handleSubmit = () => {
  //   // Call the onNext function passed as a prop to move to the next step
  //   onNext();
  // };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">6</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2 htmlFor="lose-money">Your (Victim)?</h2>
          <p>Answer the set of questions about yourself.</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="continue-btn">
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

export default Victim;
