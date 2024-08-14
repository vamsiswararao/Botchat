import React, { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { FaLongArrowAltRight } from "react-icons/fa";

const Number = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
  
    const handleInputChange = (value) => {
      setPhone(value);
      validatePhone(value);
    };
  
    const validatePhone = (value) => {
      // Example validation: Ensure phone number is at least 10 digits long
      if (value.replace(/\D/g, '').length < 10) {
        setError('Please enter a valid phone number');
      } else {
        setError('');
      }
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !error) {
        handleSubmit();
      }
    };
  
    const handleSubmit = () => {
      if (error) {
        alert("Fix errors before submitting.");
        return;
      }
  
      if (!phone) {
        setError('Phone number is required');
        return;
      }
  
      alert(`Phone number submitted: ${phone}`);
    };

    return (
        <div className="question">
           <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h4>1</h4>
            <FaLongArrowAltRight />
            </div>
            <div>

            <label htmlFor="phone-number">Please verify your phone number:</label>
            <div className="phone-input-container">
            <PhoneInput
                defaultCountry="in"
                value={phone}
                onKeyPress={handleKeyPress}
                onChange={handleInputChange}
                buttonClass="custom-dropdown"
                inputClass={`custom-input ${error ? 'error-border' : ''}`}
                enableSearch={true}
                />
            <div style={{display:"flex",alignItems:'center'}}>

            <button  disabled={!!error} type="button" className="ok-btn" onClick={handleSubmit}>
                OK
            </button>
            {error && <p className="error-message">{error}</p>}
            <p className="enter-text">press <strong>Enter ↵</strong></p>
            </div>
            </div>
            </div>
                </div>
        </div>
    );
};

export default Number;
