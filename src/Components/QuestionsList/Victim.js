import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Victim = ({ onNext }) => {


  const handleOkClick = (e) => {
    e.preventDefault();
    onNext(6);
    };


  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">6/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2 htmlFor="lose-money">Victim details</h2>
          <p>Answer the set of questions about victim.</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="continue-btn" onClick={handleOkClick}>
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
