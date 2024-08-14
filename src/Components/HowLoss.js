import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const HowLoss = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    // Add your submit logic here
    console.log('Submitted value:', value);
  };

  return (
    <div className="question">
      <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h4 style={{marginTop:'0px'}}>5</h4>
            <FaLongArrowAltRight style={{marginTop:'0px'}} />
            </div>
            <div>
      <label htmlFor="lose-money">How did you lose money?</label>
      <p>Write in detail about how you lost the money.</p>
      <input
        className='text-input'
        value={value}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="lose-money"
      />
      <button type="button" className="ok-btn" onClick={handleSubmit}>
        ok
      </button>
    </div>
    </div>
    </div>
  );
};

export default HowLoss;
