import React, {  useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";

const HowMuch = ({ onNext,onHowMuchSelected}) => {
  const [moneyId, setMoneyId] = useState(null);
  const [money, setMoney] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);


  const handleOptionClick = (option, e) => {
    e.preventDefault();
    setMoneyId(option.id);
    setMoney(option.label);
    onNext();
    setShowOkButton(true); // Hide the OK button after successful click
    setError("");
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    console.log("Selected Option:", money);
    if (money) {
      console.log("Selected Option:",money);
      onNext();
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

  const options = [
    { id: "A", label: "Below 25,000/-" },
    { id: "B", label: "Between 25,000/- to 1,00,000/-" },
    { id: "C", label: "1, 00,000/- and above" },
  ];

  return (
    <div className="question">
      <div style={{display:'flex'}}>
        <div style={{display:'flex'}}>
          <h2 className='num'>3</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
          <h2>How much amount Lost?</h2>
          <div className="options-container">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${moneyId === option.id ? "selected" : ""}`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: moneyId === option.id ? "rgb(62, 87, 255)" : "#fff",
                      color: moneyId === option.id ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className='option-label'>{option.label}</div>
                </div>
                {moneyId === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
            <div style={{display:"flex",alignItems:'center'}}>
            {showOkButton && (
              <>
                <button type="button" className="ok-btn" onClick={handleOkClick}>
                  OK
                </button>
                <p className="enter-text">press <strong>Enter ↵</strong></p>
                </>
              )}
               {error && <div className="error-message">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowMuch;
