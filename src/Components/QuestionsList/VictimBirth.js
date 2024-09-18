import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimBirth = ({onNext,onVictimBirthSelected}) => {
  const [victimAge, setAgeName] = useState('');
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setAgeName(event.target.value);
    if (event.target.checked) {
      return; // Ignore clicks on disabled options
    }
    setAgeName(event.target.value);
    onVictimBirthSelected(event.target.value);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
  };
 
  const handleOkClick = (e) => {
  e.preventDefault();
    // Combine the day, month, and year values into a full date
    console.log('Date of Birth:', victimAge);

    if (victimAge) {
      onNext(7);
    } else {
      setError("Please Enter age before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  
  };

  return (
    <div className="question">
            <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className='num'>4 c/10</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
      <h2 htmlFor="lose-money">what is your (Victim) age?</h2>
      <div style={{ display: 'flex', marginRight: '20px' }}>
      <input
      className='text-input'
        value={victimAge}
        onChange={handleInputChange}
        placeholder="Type your age here..."
        id="victim-name"
        type='number'
      />
      </div>
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

export default VictimBirth;
