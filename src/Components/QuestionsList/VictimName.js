import React, { useState } from 'react';
const apiUrl = process.env.REACT_APP_API_URL;

const VictimName = ({ onNext, onVictimNameSelected,onVictimAgeSelected, onQuestion,answer }) => {
  const [victimName, setVictimName] = useState('');
  const [victimAge, setVictimAge] = useState('');
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState({ name: null, age: null }); // Updated error state
  const vist_id = sessionStorage.getItem("visitor_id");

  const handleNameChange = (event) => {
    setVictimName(event.target.value);
    onVictimNameSelected(event.target.value);
    setShowOkButton(true);
    setError({ ...error, name: null }); // Reset name error on change
  };

  const handleAgeChange = (event) => {
    setVictimAge(event.target.value);
    onVictimAgeSelected(event.target.value);
    setShowOkButton(true);
    setError({ ...error, age: null }); // Reset age error on change
  };

  const handleOkClick = async(e) => {
    e.preventDefault();
    console.log("Selected Name:", victimName);
    
    const age = parseInt(victimAge, 10);
    let valid = true;

    // Reset all errors initially
    let newError = { name: null, age: null };

    // Validate name
    if (!victimName) {
      newError.name = "Please enter the victim's name.";
      valid = false;
    }

    // Validate age
    if (isNaN(age) || age < 5 || age > 110) {
      newError.age = "Please enter a valid age (5-110).";
      valid = false;
    }

    setError(newError); // Update the error state

    if (valid) {
      onNext(5);
      onQuestion("6");
      setShowOkButton(true);
      try {
        const response = await fetch(`${apiUrl}/ccrim_bot_add_victim_data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "api_key":"1725993564",
            "visitor_token":vist_id,
            "qtion_id":"66f652eaeaef8",
            "qtion_num":"4a",
            "vict_nm":victimName,
            "vict_age":victimAge
         } 
         ),
        });
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
          throw new Error("Failed to push data to API");
        }
      } catch (err) {
        console.error("Error sending data to API:", err);
      }
    } else {
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  return (
    <div className="question">
      <div style={{ display: 'flex' }}>
        <div style={{ display: "flex", flexDirection: 'column' }}>
          <h2 htmlFor="victim-name">What is your (victim) name?</h2>
          <input
            type="text"
            className='text-input'
            value={victimName}
            onChange={handleNameChange}
            placeholder="Type your answer here..."
            id="victim-name"
            autoComplete="off" 
          />
          {error.name && <div className="error-message">{error.name}</div>} {/* Individual name error message */}
          
          <div>
            <h2 htmlFor="victim-age">What is your (victim) age?</h2>
            <div style={{ display: 'flex', flexDirection:'column', marginRight: '20px' }}>
              <input
                className='text-input'
                value={victimAge}
                onChange={handleAgeChange}
                placeholder="Type your age here..."
                id="victim-age"
                type='number'
                min="5"
                max="110"
                autoComplete="off" 
              />
              {error.age && <div className="error-message">{error.age}</div>} {/* Individual age error message */}
            </div>
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
          </div>
          {(answer[4] || answer[5]) && (
  <p className="alert-box">
    Please answer the current question before moving to the next.
  </p>
)}
        </div>
      </div>
    </div>
  );
};

export default VictimName;
