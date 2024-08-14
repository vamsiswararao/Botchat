import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const PaymentMethod = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
  };

  const options = [
    {
      id: "A",
      label: "UPI-related fraud (Attach all banks names list to drop down)",
    },
    { id: "B", label: "E-Wallet related fraud" },
    { id: "C", label: "Debit/credit fraud/ Sim swap fraud" },
    { id: "D", label: "internet banking-related fraud" },
    { id: "E", label: "Demat / depository fraud" },
    { id: "F", label: "Business email compromise/email takeover " },
    { id: "G", label: "Aadhar enable payment system [AEPS] " },
  ];

  return (
    <div className="question" >
         <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h4 style={{marginTop:'35px'}}>4</h4>
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

export default PaymentMethod;
