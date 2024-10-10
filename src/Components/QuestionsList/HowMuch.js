import React, { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const HowMuch = ({ onNext, onHowMuchSelected, onQuestion, answer }) => {
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const [howMuch, setHowMuch] = useState("");
  const vist_id = sessionStorage.getItem("visitor_id");

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
    if (event.target.checked) {
      return; // Ignore clicks on disabled options
    }
    setHowMuch(event.target.value);
    onHowMuchSelected(event.target.value);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
  };

  const handleOkClick = async (e) => {
    e.preventDefault();

    if (howMuch) {
      setError("");
      onNext(3, howMuch);
      onQuestion(4);
      console.log(howMuch)
      try {
        const response = await fetch(`${apiUrl}/ccrim_bot_add_text`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "api_key": "1725993564",
            "visitor_token": vist_id,
            "qtion_id":"66f652b6e0c73",
            "qtion_num": "3",
            "option_val": howMuch,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save address");
        }

        const result = await response.json();
        console.log("Saved data:", result);
      } catch (error) {
        console.error("Error saving data:", error);
        setError("Failed to save amount");
      }
    } else {
      setError("Please Enter the amount before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
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

  return (
    <div className="question">
      <div >
        <div>
          <h2>How much amount did you lost?</h2>
          <div className="options-container">
          <span className="rupee-symbol">₹</span>
            <input
              className="text-input"
              value={howMuch}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your amount here..."
              id="lose-money"
              type="number"
              min="1"
              autoComplete="off"
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
            </div>
            {error && <div className="error-message">{error}</div>}
            {answer[2] && (
              <p className="alert-box">
                Please answer the current question before moving to the next.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowMuch;
