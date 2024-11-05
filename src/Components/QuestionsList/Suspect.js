import React from "react";

const Suspect = ({ onNext, onQuestion }) => {
  const handleContinue = () => {
    // Call the onNext function passed as a prop to move to the next step
    onNext(12);
    onQuestion(13)
    localStorage.setItem('support', JSON.stringify('support'));
  };

  return (
    <div className="question">
      <div style={{ display: "flex",justifyContent:'center' }}>
        <div style={{ display: "flex",flexDirection:'column', alignItems: "center" }}>
          <h2 htmlFor="lose-money">Fraudster’s Information</h2>
          <p className="suspect-para">Answer the set of questions about Fraudster/Suspect.</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="continue-btn" onClick={handleContinue}>
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

export default Suspect;
