import React, { useEffect, useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";

const LossAmount = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    setSelectedOption(option.id);
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    console.log("Selected Option:", selectedOption);
    // Additional logic to handle the selected option can be added here
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleOkClick(event);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const options = [
    { id: "A", label: "Did you lose an amount in Cybercrimes?" },
    { id: "B", label: "Have you faced Cybercrime in Non-financial cyber fraud?" },
    { id: "C", label: "To know the status of the complaint?" },
  ];

  return (
    <div className="question">
      <div style={{display:'flex'}}>
        <div style={{display:'flex'}}>
          <h2 className='num'>2</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
          <h2>How can we help you? *</h2>
          <div className="options-container">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${selectedOption === option.id ? "selected" : ""}`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: selectedOption === option.id ? "rgb(62, 87, 255)" : "#fff",
                      color: selectedOption === option.id ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className='option-label'>{option.label}</div>
                </div>
                {selectedOption === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
            <div style={{display:"flex",alignItems:'center'}}>
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                ok
              </button>
              <p className="enter-text">press <strong>Enter ↵</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LossAmount;
