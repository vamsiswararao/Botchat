import React from "react";

const Victim = ({ onNext,onQuestion }) => {


  const handleOkClick = (e) => {
    e.preventDefault();
    onNext(4);
    onQuestion("5")
    };


  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div>
          <h2 htmlFor="lose-money">Basic information of victim</h2>
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
