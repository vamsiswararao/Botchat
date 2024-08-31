import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const HowMuch = ({ onNext, onHowMuchSelected }) => {
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const [howMuch, setHowMuch] = useState("");

  const handleKeyDown = (event) => {
    if (event.altKey && event.key === "Enter") {
      event.preventDefault();
      setHowMuch((prevValue) => prevValue + "\n");
    } else if (event.key === "Enter") {
      event.preventDefault();
      handleOkClick(event); // Call the submit function when Enter is pressed
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setHowMuch(event.target.value);
  };



  const handleOkClick = (e) => {
    e.preventDefault();
      onNext(3);
      // Proceed with the next steps
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



  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">3</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>How much amount Lost?</h2>
          <div className="options-container">
            <input
              className="text-input"
              value={howMuch}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your amount here..."
              id="lose-money"
              rows="5"
              cols="50"
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              {showOkButton && (
                <>
                  <button
                    type="button"
                    className="ok-btn"
                    onClick={handleOkClick}
                  >
                    OK
                  </button>
                  <p className="enter-text">
                    press <strong>Enter ↵</strong>
                  </p>
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
