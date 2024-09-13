import React, { useState } from "react";
import Select from "react-select";
import { FaLongArrowAltRight } from "react-icons/fa";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "340px",
    height: "24px",
    "@media (max-width: 768px)": {
      // Mobile view adjustments
      width: "95%",
    },
  }),
  // control: (base) => ({
  //   ...base,
  //   border: "1px solid #ccc",
  //   borderRadius: "2px",
  //   boxShadow: "none",
  //   height: '100%', // Make sure control height matches container height
  //   minHeight: '20px',
  // }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Ensure dropdown is above other elements
    maxHeight: "180px", // Adjust as needed
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "180px", // Adjust as needed
    overflowY: "auto",
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "30px", // Decrease height of the select control
    height: "30px", // Decrease height of the select control
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    height: "14px", // Adjust the height of the indicator separator line
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "8px", // Adjust padding around the dropdown indicator
    svg: {
      width: "18px", // Adjust the size of the dropdown arrow
      height: "18px",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px", // Adjust placeholder font size
    marginBottom: "10px",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px", // Adjust selected value font size
    marginBottom: "10px",
  }),
  input: (base) => ({
    ...base,
    padding: "0px",
  }),
};

const indianStates = [
  { value: "0", label: "Andhra Pradesh" },
  { value: "1", label: "Arunachal Pradesh" },
  { value: "2", label: "Assam" },
  { value: "3", label: "Bihar" },
  { value: "4", label: "Chhattisgarh" },
  { value: "5", label: "Goa" },
  { value: "6", label: "Gujarat" },
  { value: "7", label: "Haryana" },
  { value: "8", label: "Himachal Pradesh" },
  { value: "9", label: "Jharkhand" },
  { value: "10", label: "Karnataka" },
  { value: "11", label: "Kerala" },
  { value: "12", label: "Madhya Pradesh" },
  { value: "13", label: "Maharashtra" },
  { value: "14", label: "Manipur" },
  { value: "15", label: "Meghalaya" },
  { value: "16", label: "Mizoram" },
  { value: "17", label: "Nagaland" },
  { value: "18", label: "Odisha" },
  { value: "19", label: "Punjab" },
  { value: "20", label: "Rajasthan" },
  { value: "21", label: "Sikkim" },
  { value: "22", label: "Tamil Nadu" },
  { value: "23", label: "Telangana" },
  { value: "24", label: "Tripura" },
  { value: "25", label: "Uttar Pradesh" },
  { value: "26", label: "Uttarakhand" },
  { value: "27", label: "West Bengal" },
];

const options = [
  { value: "station1", label: "Hyderabad" },
  { value: "station2", label: "Cyberabad" },
  { value: "station3", label: "i don`t Know" },
  // Add more options as needed
];

const VictimAddress = ({ onNext, onVictimAddressSelected }) => {
  const [address, setAddress] = useState({
    address1: "",
    city: "",
    state: { value: "Telangana", label: "Telangana" },
    zip: "",
    policeStation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError(""); // Clear error when user inputs data
  };

  const handleStateChange = (selectedOption) => {
    setAddress((prevState) => ({
      ...prevState,
      state: selectedOption,
    }));
    setError(""); // Clear error when state is selected
  };

  const handlePoliceChange = (selectedOption) => {
    setAddress((prevState) => ({
      ...prevState,
      policeStation: selectedOption,
    }));
    setError(""); // Clear error when state is selected
  };

  const handleOkClick = (e) => {
    e.preventDefault();

    // Validation: Display only one error at a time
    if (!address.address1) {
      setError("Please fill in the address.");
      return;
    }
    if (!address.city) {
      setError("Please fill in the village/city/town.");
      return;
    }
    if (!/^\d{6}$/.test(address.zip)) {
      setError("Please enter a valid 6-digit Zip/Post code.");
      return;
    }

    // Submit the address data
    onVictimAddressSelected({
      ...address,
      state: address.state.value,
    });
    onNext(12);
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">6f/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Fill your (Victim) current Full Address?</h2>
            <h6 style={{ margin: "5px",marginTop:'20px' }} htmlFor="address1">
              Address
            </h6>
            <input
              className="text-input"
              value={address.address1}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="address1"
            />

            <h6 style={{ margin: "5px",marginTop:'20px' }} htmlFor="city">
              Village/City/Town
            </h6>
            <input
              className="text-input"
              value={address.city}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="city"
            />

            <h6 style={{ margin: "5px",marginTop:'20px' }} htmlFor="state">
              State
            </h6>
            <Select
              options={indianStates}
              value={address.state}
              onChange={handleStateChange}
              id="state"
              styles={customStyles} // Apply custom styles
            />

            <h6 style={{ margin: "5px",marginTop:'20px' }} htmlFor="zip">
              Zip/Post code
            </h6>
            <input
              className="text-input"
              value={address.zip}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="zip"
            />
            <h6 style={{ margin: "5px",marginTop:'20px' }} htmlFor="zip">
            Nearest police station?
            </h6>
            <div className="select-container">
              <Select
                id="policeStation"
                value={address.policeStation}
                onChange={handlePoliceChange}
                options={options}
                placeholder="Type to search..."
                aria-label="Police Station"
                className="dropdown-input"
                styles={customStyles} // Apply custom styles
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                ok
              </button>
              <p className="enter-text">
                press <strong>Enter ↵</strong>
              </p>
            </div>

            {/* Display error message */}
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictimAddress;
