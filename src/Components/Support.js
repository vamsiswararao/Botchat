import React, { useState } from 'react';

const Support = ({onNext}) => {
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
      <label htmlFor="victim-name">Upload supporting evidence?</label>
      <p>Upload screenshots of all the fraudulent transactions, suspect websites, suspect call </p>
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
  );
};

export default Support;
