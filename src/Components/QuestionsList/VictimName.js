import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimName = ({onNext,onVictimNameSelected}) => {
  const [victimName, setVictimName] = useState('');
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setVictimName(event.target.value);
    if (event.target.checked) {
      return; // Ignore clicks on disabled options
    }
    setVictimName(event.target.value);
    onVictimNameSelected(event.target.value);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onVictimNameSelected(victimName)
    console.log("Selected Option:", victimName);
   
    if (victimName) {
      onNext(7);
    } else {
      setError("Please Enter victim name before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
    };


  return (
    <div className="question">
                  <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h2 className='num'>6a/10</h2>
            <FaLongArrowAltRight className='num'/>
            </div>
            <div style={{display:"flex",flexDirection:'column'}}>
      <h2 htmlFor="victim-name">What is your (Victim) name?</h2>
      <input
      className='text-input'
        value={victimName}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
        id="victim-name"
      />
            <div style={{ display: "flex", alignItems: "center" }}>
              {showOkButton && (
                <>
                  <button
                    type="button"
                    className="ok-btn"
                    onClick={handleOkClick}
                  >
                    OK
                  </button>
                  <p className="enter-text">
                    press <strong>Enter ↵</strong>
                  </p>
                </>
              )}
              {error && <div className="error-message">{error}</div>}
            </div>
    </div>
    </div>
    </div>
  );
};

export default VictimName;
