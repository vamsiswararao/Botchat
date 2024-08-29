import React, { useEffect, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { FaLongArrowAltRight } from "react-icons/fa";

const Number = ({ onNext, onPhone }) => {
  const storedPhone = localStorage.getItem('phoneNumber');
  const [phone, setPhone] = useState(storedPhone ? `${storedPhone.replace(/\D/g, '').slice(-10)}` : '');

  // Attach keydown event listener to the input
  useEffect(() => {
    const inputField = document.querySelector('.custom-input');

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    if (inputField) {
      inputField.addEventListener('keydown', handleKeyPress);
    }

    // Clean up event listener on component unmount
    return () => {
      if (inputField) {
        inputField.removeEventListener('keydown', handleKeyPress);
      }
    };
  }, [phone]);

  const handleSubmit = () => {
    onNext(); // Move to the next question
    onPhone(phone);
  };

  return (
    <div className="question">
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex' }}>
          <h2 className='num'>1</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
          <h2>Please verify your phone number:</h2>
          <div className="phone-input-container">
            <PhoneInput
              defaultCountry="in"
              value={phone}
              disabled
              buttonClass="custom-dropdown"
              inputClass="custom-input"
              enableSearch={true}
              readOnly  // Make the input read-only
              disableCountryCode={true}  // Disable country code change
              disableDropdown={true}
            />
            <div style={{ display: "flex", alignItems: 'center' }}>
              <button type="button" className="ok-btn" onClick={handleSubmit}>
                OK
              </button>
              <p className="enter-text">press <strong>Enter ↵</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Number;
