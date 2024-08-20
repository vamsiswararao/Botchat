import React, { useEffect, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { FaLongArrowAltRight } from "react-icons/fa";

const Number = ({onPhoneValid,onNext}) => {
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
        onPhoneValid(false, '');
      } else {
        setError('');
        onPhoneValid(true,value)
      }
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !error) {
        console.log('Enter key pressed' + event.key)
        handleSubmit();
      }
    };

    useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [phone]);
  
    const handleSubmit = () => {
      if (error) {
        alert("Fix errors before submitting.");
        return;
      }
  
      if (!phone) {
        setError('Phone number is required');
        return;
      }
      if (!error) {
        onNext(); // Move to the next question
      }

    };

    return (
        <div className="question">
           <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h2 className='num'>1</h2>
            <FaLongArrowAltRight className='num'/>
            </div>
            <div>
            <h2  htmlFor="phone-number">Please verify your phone number:</h2>
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
