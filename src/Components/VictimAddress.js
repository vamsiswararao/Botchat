import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimAddress = ({onNext,onVictimAddressSelected}) => {
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

  const handleOkClick = (e) => {
    e.preventDefault()
    // Implement form submission logic here
    onVictimAddressSelected(address)
    console.log(address);
    onNext()
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className='num'>6f</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
          <div style={{display:'flex', flexDirection:'column'}}>
      <h2>Fill your (Victim) Full Address?</h2>
      <h2 htmlFor="address1">Address</h2>
      <input
        className="text-input"
        value={address.address1}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="address1"
      />
      
      <h2 htmlFor="address2">Address 2</h2>
      <input
        className="text-input"
        value={address.address2}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="address2"
      />
      
      <h2 htmlFor="city">City/Town</h2>
      <input
        className="text-input"
        value={address.city}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="city"
      />
      
      <h2 htmlFor="state">State/Region/Province</h2>
      <input
        className="text-input"
        value={address.state}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="state"
      />
      
      <h2 htmlFor="zip">Zip/Post code</h2>
      <input
        className="text-input"
        value={address.zip}
        onChange={handleChange}
        placeholder="Type your answer here..."
        id="zip"
      />
        <div style={{display:"flex",alignItems:'center'}}>
              <button type="button" className="ok-btn"   onClick={handleOkClick}>
                ok
              </button>
              <p className="enter-text">press <strong>Enter ↵</strong></p>
            </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default VictimAddress;
