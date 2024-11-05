import React from "react";

const Victim = ({ onNext,onQuestion }) => {


  const handleOkClick = (e) => {
    e.preventDefault();
    onNext(6);
    onQuestion(7)
    localStorage.setItem('victim', JSON.stringify('victim'));
    };


  return (
    <div className="question">
      <div style={{ display: "flex",justifyContent:'center' }}>
        <div style={{ display: "flex",flexDirection:'column', alignItems: "center" }}>
          <h2 htmlFor="lose-money">Basic information of the victim</h2>
          <p className="victim-para">Answer the set of questions about the victim.</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="continue-btn" onClick={handleOkClick}>
              Continue
            </button>
            {/* <p className="enter-text">
              press <strong>Enter ↵</strong>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Victim;
