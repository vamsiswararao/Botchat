import React from 'react';

const Suspect = ({ onNext }) => {
  const handleSubmit = () => {
    // Call the onNext function passed as a prop to move to the next step
    onNext();
  };

  return (
    <div className="question">
      <label htmlFor="lose-money">Suspect Details</label>
      <p>Answer the set of questions about Suspect/Fraudster.</p>
      <button type="button" className="continue-btn" onClick={handleSubmit}>
        Continue
      </button>
    </div>
  );
};

export default Suspect;
