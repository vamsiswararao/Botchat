import React, { useState } from "react";
import Select from "react-select";
import { FaLongArrowAltRight } from "react-icons/fa";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "340px",
    height: "24px",
    "@media (max-width: 768px)": {
      width: "95%",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    maxHeight: "180px",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "180px",
    overflowY: "auto",
    fontSize:'16px'
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    height: "14px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "8px",
    svg: {
      width: "18px",
      height: "18px",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px",
    marginBottom: "10px",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
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

const telanganaDistricts = [
  { value: "1", label: "Adilabad" },
  { value: "2", label: "Bhadradri Kothagudem" },
  { value: "3", label: "Hyderabad" },
  { value: "4", label: "Jagtial" },
  { value: "5", label: "Jangaon" },
  { value: "6", label: "Jayashankar Bhupalpally" },
  { value: "7", label: "Jogulamba Gadwal" },
  { value: "8", label: "Kamareddy" },
  { value: "9", label: "Karimnagar" },
  { value: "10", label: "Khammam" },
  { value: "11", label: "Mahabubabad" },
  { value: "12", label: "Mahabubnagar" },
  { value: "13", label: "Mancherial" },
  { value: "14", label: "Medak" },
  { value: "15", label: "Medchal-Malkajgiri" },
  { value: "16", abel: "Nalgonda" },
  { value: "17", label: "Narayanpet" },
  { value: "18", label: "Nirmal" },
  { value: "19", label: "Nizamabad" },
  { value: "20", label: "Peddapalli" },
  { value: "21", label: "Rajanna Sircilla" },
  { value: "22", label: "Rangareddy" },
  { value: "23", label: "Siddipet" },
  { value: "24", label: " Suryapet" },
  { value: "25", label: "Vikarabad" },
  { value: "26", label: "Warangal (Rural)" },
  { value: "27", label: "Warangal (Urban)" },
  { value: "28", label: "Wanaparthy" },
  { value: "29", label: "Yadadri Bhuvanagiri" },
  { value: "30", label: "Kothagudem" },
  { value: "31", label: "Kamareddy" },
  { value: "32", label: "Jayashankar Bhupalpally" },
  // Add more districts as needed
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
    district: null,
    zip: "",
    policeStation: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError("");
  };

  const handleStateChange = (selectedOption) => {
    setAddress((prevState) => ({
      ...prevState,
      state: selectedOption,
      district: null, // Reset district when state changes
    }));
    setError("");
  };

  const handleDistrictChange = (selectedOption) => {
    setAddress((prevState) => ({
      ...prevState,
      district: selectedOption,
    }));
    setError("");
  };

  const handlePoliceChange = (selectedOption) => {
    setAddress((prevState) => ({
      ...prevState,
      policeStation: selectedOption,
    }));
    setError("");
  };

  const handleOkClick = (e) => {
    e.preventDefault();

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

    onVictimAddressSelected({
      ...address,
      state: address.state.value,
      district: address.district ? address.district.value : null,
    });
    onNext(11);
  };

  return (
    <div className="question">
      <div style={{ display: "flex", height:'70%' }}>
        <div style={{ display: "flex"}}>
          <h2 className="num">4g/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Fill your (Victim) current Full Address?</h2>
            <h6 style={{ margin: "5px", marginTop: "20px" }} htmlFor="address1">
              Address
            </h6>
            <input
              className="text-input"
              value={address.address1}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="address1"
            />

            <h6 style={{ margin: "5px", marginTop: "20px" }} htmlFor="city">
              Village/City/Town
            </h6>
            <input
              className="text-input"
              value={address.city}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="city"
            />

            <h6 style={{ margin: "5px", marginTop: "20px" }} htmlFor="state">
              State
            </h6>
            <Select
              options={indianStates}
              value={address.state}
              onChange={handleStateChange}
              id="state"
              styles={customStyles}
            />

            {address.state.value === "Telangana" && (
              <>
                <h6
                  style={{ margin: "5px", marginTop: "20px" }}
                  htmlFor="district"
                >
                  District
                </h6>
                <Select
                  options={telanganaDistricts}
                  value={address.district}
                  onChange={handleDistrictChange}
                  id="district"
                  styles={customStyles}
                />
              </>
            )}

            <h6 style={{ margin: "5px", marginTop: "20px" }} htmlFor="zip">
              Zip/Post code
            </h6>
            <input
              className="text-input"
              value={address.zip}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="zip"
            />

            <h6
              style={{ margin: "5px", marginTop: "20px" }}
              htmlFor="policeStation"
            >
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
                styles={customStyles}
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
