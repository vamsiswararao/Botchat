import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimBirth = ({onNext,onVictimBirthSelected}) => {
  const [victimAge, setAgeName] = useState('');

  const handleInputChange = (event) => {
    setAgeName(event.target.value);
  };

  const handleOkClick = (e) => {
  e.preventDefault();
    // Combine the day, month, and year values into a full date
    console.log('Date of Birth:', victimAge);
    onNext(10)
  
  };

  return (
    <div className="question">
            <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className='num'>7 c</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
      <h2 htmlFor="lose-money">How much your(Victim) age?</h2>
      <div style={{ display: 'flex', marginRight: '20px' }}>
      <input
      className='text-input'
        value={victimAge}
        onChange={handleInputChange}
        placeholder="Type your age here..."
        id="victim-name"
      />
      </div>
      <div style={{display:"flex",alignItems:'center'}}>
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                ok
              </button>
              <p className="enter-text">press <strong>Enter ↵</strong></p>
            </div>
    </div>
    </div>
    </div>
  );
};

export default VictimBirth;
