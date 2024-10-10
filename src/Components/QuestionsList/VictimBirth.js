import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";

const VictimBirth = ({ onNext, onVictimBirthSelected }) => {
  const [victimAge, setVictimAge] = useState('');
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 110) {
      setError("Please enter a valid age between 1 and 110.");
      setShowOkButton(false);
      return;
    }

    setVictimAge(value);
    onVictimBirthSelected(value);
    setError("");
    setShowOkButton(true);
  };

  const handleOkClick = (e) => {
    e.preventDefault();

    if (victimAge) {
      console.log('Date of Birth:', victimAge);
      onNext(7); // Proceed to the next step
    } else {
      setError("Please enter age before proceeding.");
      setShowOkButton(false);
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
          <h2>What is your (Victim) age?</h2>
          <div style={{ display: 'flex', marginRight: '20px' }}>
            <input
              className='text-input'
              value={victimAge}
              onChange={handleInputChange}
              placeholder="Type your age here..."
              id="victim-age"
              type='number'
              min="1"
              max="110"
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
                  Press <strong>Enter ↵</strong>
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
