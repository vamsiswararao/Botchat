import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimPhone=({onNext,    onVictimPhoneSelected})=>{
    const [victimPhone, setVictimPhone] = useState('');
    const [showOkButton, setShowOkButton] = useState(true);
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
      setVictimPhone(event.target.value);
      if (event.target.checked) {
        return; // Ignore clicks on disabled options
      }
      setVictimPhone(event.target.value);
      onVictimPhoneSelected(event.target.value);
      setShowOkButton(true); // Show the OK button after a successful click
      setError("");
    };
    
    const handleOkClick = (e) => {
      e.preventDefault();
      onVictimPhoneSelected(victimPhone)
      console.log("Selected Option:", victimPhone);
      if (victimPhone) {
        onNext(6);
      } else {
        setError("Please Enter number before proceeding.");
        setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
      }
      };
      
    return(
        <div className="question">
                      <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h2 className='num'>4b/10</h2>
            <FaLongArrowAltRight className='num' />
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
      <h2 htmlFor="victim-name">What is your (Victim) phone number? </h2>
      <input
      className='text-input'
        value={victimPhone}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
        id="victim-name"
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
    )
}

export default VictimPhone