import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimName = ({onNext}) => {
  const [value, setValue] = useState('');

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const submit = () => {
    // Handle submit action here
    console.log('Submitted name:', value);
    onNext();
  };

  return (
    <div className="question">
                  <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h2 className='num'>6a</h2>
            <FaLongArrowAltRight className='num'/>
            </div>
            <div style={{display:"flex",flexDirection:'column'}}>
      <h2 htmlFor="victim-name">What is your (Victim) name?</h2>
      <input
      className='text-input'
        value={value}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
        id="victim-name"
      />
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="ok-btn">
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
