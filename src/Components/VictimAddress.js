import React, { useState } from 'react';

const VictimAddress = () => {
  const [address, setAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = () => {
    // Implement form submission logic here
    console.log(address);
  };

  return (
    <div className="question">
      <h5>Fill your (Victim) Full Address?</h5>
      
      <label htmlFor="address1">Address</label>
      <input
        className="text-input"
        value={address.address1}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="address1"
      />
      
      <label htmlFor="address2">Address 2</label>
      <input
        className="text-input"
        value={address.address2}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="address2"
      />
      
      <label htmlFor="city">City/Town</label>
      <input
        className="text-input"
        value={address.city}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="city"
      />
      
      <label htmlFor="state">State/Region/Province</label>
      <input
        className="text-input"
        value={address.state}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="state"
      />
      
      <label htmlFor="zip">Zip/Post code</label>
      <input
        className="text-input"
        value={address.zip}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="zip"
      />
      
      <button type="button" className="ok-btn" onClick={handleSubmit}>
        OK
      </button>
    </div>
  );
};

export default VictimAddress;
