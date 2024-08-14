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
            <h4 style={{marginTop:'0px'}}>6 a</h4>
            <FaLongArrowAltRight style={{marginTop:'0px'}} />
            </div>
            <div style={{display:"flex",flexDirection:'column'}}>
      <label htmlFor="victim-name">What is your (Victim) name?</label>
      <input
      className='text-input'
        value={value}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
        id="victim-name"
      />
      <button type="button" className="ok-btn" onClick={submit}>
        ok
      </button>
    </div>
    </div>
    </div>
  );
};

export default VictimName;
