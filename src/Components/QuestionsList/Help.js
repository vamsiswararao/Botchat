import React, {  useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";

const Help = ({ onNext, onHelpSelected}) => {
  const [help, setHelp] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleHelpOptionClick = (option, e) => {
    e.preventDefault();
    setHelp(option.id);
    onHelpSelected(option.id)
    onNext();
    setShowOkButton(true); // Hide the OK button after successful click
    setError("");
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    console.log("Selected Option:", help);
    if (help) {
      console.log("Selected Option:", help);
      // Proceed with the next steps
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after successful click

    }
    };

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handleOkClick(event);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyPress);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyPress);
  //   };
  // }, [selectedOption]);

  const helpOptions = [
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
            {helpOptions.map((option) => (
              <button
                key={option.id}
                className={`option-button ${help === option.id ? "selected" : ""}`}
                onClick={(e) => handleHelpOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: help === option.id ? "rgb(62, 87, 255)" : "#fff",
                      color: help === option.id ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className='option-label'>{option.label}</div>
                </div>
                {help === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
            <div style={{display:"flex",alignItems:'center'}}>
            {showOkButton && (
                <button type="button" className="ok-btn" onClick={handleOkClick}>
                  OK
                </button>
              )}
               {error && <p className="error-message">{error}</p>}
              <p className="enter-text">press <strong>Enter ↵</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
