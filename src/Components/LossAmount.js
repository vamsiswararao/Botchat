import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const LossAmount = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
  };

  const options = [
    { id: "A", label: "Did you lose an amount in Cybercrimes?" },
    { id: "B", label: "Have you faced Cybercrime in Non-financial cyber fraud?" },
    { id: "C", label: "To know the status of the complaint?" },
  ];

  return (
    <div  className="question">
       <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h4 style={{marginTop:'35px'}}>2</h4>
            <FaLongArrowAltRight style={{marginTop:'35px'}} />
            </div>
            <div>
      <h2>How can we help you? *</h2>
      <div  className="options-container">
        {options.map((option) => (
          <button
            key={option.id}
            className={`option-button ${selectedOption === option.id ? "selected" : ""}`}
            onClick={() => handleOptionClick(option)}
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
              <div>{option.label}</div>
            </div>
            {selectedOption === option.id && (
              <span className="checkmark">
                &#10003; {/* Unicode character for checkmark */}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default LossAmount;
