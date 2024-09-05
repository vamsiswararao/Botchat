import React, { useState } from 'react';
import Select from 'react-select';
import { FaLongArrowAltRight } from "react-icons/fa";

const indianStates = [
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" }
];

const VictimAddress = ({ onNext, onVictimAddressSelected }) => {
  const [address, setAddress] = useState({
    address1: '',
    city: '',
    state: { value: 'Telangana', label: 'Telangana' },
    zip: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [id]: value
    }));
    setError(''); // Clear error when user inputs data
  };

  const handleStateChange = (selectedOption) => {
    setAddress(prevState => ({
      ...prevState,
      state: selectedOption
    }));
    setError(''); // Clear error when state is selected
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    
    // Validation: Display only one error at a time
    if (!address.address1) {
      setError('Please fill in the address.');
      return;
    }
    if (!address.city) {
      setError('Please fill in the village/city/town.');
      return;
    }
    if (!/^\d{6}$/.test(address.zip)) {
      setError('Please enter a valid 6-digit Zip/Post code.');
      return;
    }

    // Submit the address data
    onVictimAddressSelected({
      ...address,
      state: address.state.value
    });
    onNext(13);
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className='num'>6f/10</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Fill your (Victim) Full Address?</h2>
            <h6 style={{ margin: '10px' }} htmlFor="address1">Address</h6>
            <input
              className="text-input"
              value={address.address1}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="address1"
            />
            
            <h6 style={{ margin: '10px' }} htmlFor="city">Village/City/Town</h6>
            <input
              className="text-input"
              value={address.city}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="city"
            />
            
            <h6 style={{ margin: '10px' }} htmlFor="state">State</h6>
            <Select
              options={indianStates}
              value={address.state}
              onChange={handleStateChange}
              id="state"
            />
            
            <h6 style={{ margin: '10px' }} htmlFor="zip">Zip/Post code</h6>
            <input
              className="text-input"
              value={address.zip}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="zip"
            />
            
            <div style={{ display: "flex", alignItems: 'center', marginTop: '10px' }}>
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                ok
              </button>
              <p className="enter-text">press <strong>Enter ↵</strong></p>
            </div>

            {/* Display error message */}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictimAddress;
