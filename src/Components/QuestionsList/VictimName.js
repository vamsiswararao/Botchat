import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimName = ({onNext,onVictimNameSelected}) => {
  const [victimName, setVictimName] = useState('');

  const handleInputChange = (event) => {
    setVictimName(event.target.value);
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onVictimNameSelected(victimName)
    console.log("Selected Option:", victimName);
    onNext();
    };


  return (
    <div className="question">
                  <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h2 className='num'>7a</h2>
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
            <button type="button" className="ok-btn" onClick={handleOkClick}>
              ok
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

export default VictimName;
