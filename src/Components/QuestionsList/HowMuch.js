import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const HowMuch = ({ onNext, onHowMuchSelected, onQuestion, answer, apiKey, botToken, vist_id, app_ver }) => {
  const [showOkButton, setShowOkButton] = useState(true); // To control visibility of the OK button
  const [error, setError] = useState(null); // To handle and display error messages
  const [howMuch, setHowMuch] = useState(""); // To store the amount entered by the user
  // Fetch the previously saved amount from localStorage, if available

  
  useEffect(() => {
    const storedData = localStorage.getItem('howMuch');
    if (storedData) {
      setHowMuch(JSON.parse(storedData));
      onHowMuchSelected(JSON.parse(storedData)); // Pre-fill the input with stored value
    }
  }, []);

  // Helper function to format numbers in Indian style with commas
  const formatNumberWithCommas = (number) => {
    // console.log(number)
    const [integerPart, decimalPart] = number.split(".");
    // console.log(decimalPart)
    let lastThreeDigits = integerPart.slice(-3);
    let restDigits = integerPart.slice(0, -3);
    if (restDigits !== "") {
      restDigits = restDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
      // console.log(restDigits)
      lastThreeDigits = restDigits + "," + lastThreeDigits;
    }

    return  decimalPart!==undefined ? lastThreeDigits + "." + decimalPart.slice(0, 2) : lastThreeDigits;
    
  };

  // Remove commas before parsing back to the original number string
  const removeCommas = (numberString) => {
    return numberString.replace(/,/g, ""); // Removes commas for correct number parsing
  };

  // Handle changes in the amount input field and format the value with commas and dots
  const handleChange = (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    // console.log(inputValue)
    // Only allow numeric values (including decimal points)
    if (/^\d*\.?\d*$/.test(removeCommas(inputValue))) {
      const formattedValue = formatNumberWithCommas(removeCommas(inputValue));
      setHowMuch(formattedValue);
      onHowMuchSelected(removeCommas(formattedValue)); // Pass the input value without commas to the parent component
      setShowOkButton(true); // Ensure OK button is visible after successful input
      setError(""); // Clear any previous error messages
    }
  };

  // Handle the OK button click event and submit the amount to the backend API
  const handleOkClick = async (e) => {
    e.preventDefault();

    // Validate if the user has entered an amount
    if (howMuch) {
      try {
        // API call to submit the data
        const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_text`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            visitor_token: vist_id,
            qtion_id: "66f652b6e0c73",
            qtion_num: "2",
            option_val: removeCommas(howMuch), // Send the amount without commas to the API
            lac_token: botToken,
            app_ver: app_ver
          }),
        });

        // Handle unsuccessful response
        if (!response.ok) {
          throw new Error("Failed to save amount");
        }

        const data = await response.json();
        // console.log(data)
        // Check if API response was successful
        if (data.resp.error_code === "0") {
          setError(""); // Clear any previous error messages
          onNext(3, howMuch); // Move to the next question
          onQuestion(4); // Load the next question
          localStorage.setItem('howMuch', JSON.stringify(howMuch)); // Save the amount to localStorage
        } else {
          setError("Failed to push data to API"); // Handle API errors
        }
      } catch (error) {
        console.error("Error saving data:", error);
        setError("Failed to save amount"); // Display error message
      }
    } else {
      setError("Please Enter the amount before proceeding."); // Show error if no amount is entered
      setShowOkButton(false); // Hide OK button if validation fails
    }
  };

  return (
    <div className="question" >
      <div >
        <div style={{ display: "flex",flexDirection:'column', alignItems: "center" }}>
          <h2>How much money have you lost?<span style={{ color: "red" }}>*</span></h2>
          <div className="options-container">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="rupee-symbol">₹</span> {/* Display rupee symbol */}
              <input
                className="text-money-input"
                value={howMuch}
                onChange={handleChange}
                placeholder="Type your amount here..."
                id="lose-money"
                type="text"
                min="1"
                autoComplete="off"
                inputMode="numeric"
              />
            </div>

          </div>
          <div style={{ display: "flex", alignItems: "center",zIndex:'9' }}>
              {showOkButton && (
                <>
                  <button
                    type="button"
                    className="ok-btn"
                    onClick={handleOkClick} // Trigger OK button click
                  >
                    OK
                  </button>
                </>
              )}
            </div>
            {error && <div className="error-message" style={{ position: 'relative', zIndex: '1000' }}>{error}</div>} {/* Display error messages */}
            {answer[2] && (
              <p className="alert-box">
                Please answer the current question before moving to the next.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default HowMuch;
