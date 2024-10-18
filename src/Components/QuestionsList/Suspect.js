import React from "react";

const Suspect = ({ onNext, onQuestion }) => {
  const handleContinue = () => {
    // Call the onNext function passed as a prop to move to the next step
    onNext(11);
    onQuestion("12")
    localStorage.setItem('support', JSON.stringify('support'));
  };

  return (
    <div className="question">
      <div style={{ display: "flex",justifyContent:'center' }}>
        <div >
          <h2 htmlFor="lose-money">Fraudster Information</h2>
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
