import React, { useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const VictimGender = ({ onNext,onVictimGenderSelected,onQuestion,answer }) => {
  const [gender, setGender] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const vist_id = sessionStorage.getItem("visitor_id");
  
  // const translateOptionIdToEnglish = (id) => {
  //   const translations = {
  //    "66d31c12457c3489795485": "A",
  //   "66d31c2486272638130560": "B" ,
  //   "66d31c42bd15f000864236": "C" }

  //   return translations[id] || id; // Return the English equivalent, or the id if no match is found
  // };

  const handleOptionClick = async(option,e) => {
    e.preventDefault();
    setGender(option.label);// Notify parent component about the selection
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    } 
    setGender(option.label)
    handleOkClick()
    onVictimGenderSelected(option.label);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
    onNext(6);
    onQuestion("7")
    //const translatedId = translateOptionIdToEnglish(option.value);
    console.log(option)
    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_add_choice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "api_key":"1725993564",
         "visitor_token":vist_id,
         "qtion_id":"66f65326d886a",
         "qtion_num":"6",
         "qtion_option":option.id,
         "option_val":option.value
   } 
   ),
      });

      if (!response.ok) {
        throw new Error("Failed to push data to API");
      }

      const data = await response.json()
      console.log(data)

      console.log("Data pushed to RequestBin:", option.id);
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
      if (gender) {
        onNext(6);
        onQuestion("7")
      } else {
        setError("Please select an option before proceeding.");
        setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
      }
  };
 
  const options = [
    {
      id: "A",
      value :"66d31c12457c3489795485", label: " Male",
    },
    { id: "B", value :"66d31c2486272638130560", label: "Female" },
    { id: "C", value :"66d31c42bd15f000864236", label: "Others" },
  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div>
          <h2>What is your (victim) gender? </h2>
          <div>
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  gender === option.label ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option,e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        gender === option.label
                          ? "#000"
                          : "#fff",
                      color: gender === option.label ? "#fff" : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className='option-label'>{option.label}</div>
                </div>
                {gender === option.label && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
          </div>

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
            {answer[5] && (
                <p className="alert-box">
                  Please answer the current question before moving to the next.
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default VictimGender;
