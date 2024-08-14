import React from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const Victim = ({ onNext }) => {
  const handleSubmit = () => {
    // Call the onNext function passed as a prop to move to the next step
    onNext();
  };

  return (
    <div className="question">
            <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h4 style={{marginTop:'0px'}}>6</h4>
            <FaLongArrowAltRight style={{marginTop:'0px'}} />
            </div>
            <div>
      <label htmlFor="lose-money">Your (Victim)?</label>
      <p>Answer the set of questions about yourself.</p>
      <button type="button" className="continue-btn" onClick={handleSubmit}>
        Continue
      </button>
    </div>
    </div>
    </div>
  );
};

export default Victim;
