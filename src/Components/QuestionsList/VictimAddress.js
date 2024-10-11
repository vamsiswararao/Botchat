import React, {  useState } from "react";
// import Select,{components} from "react-select";
// import { IoIosArrowUp } from 'react-icons/io';
const apiUrl = process.env.REACT_APP_API_URL;

// const customStyles = {
//   container: (provided) => ({
//     ...provided,
//     width: "340px",
//     height: "24px",
//     backgroundColor:"red",
//     "@media (max-width: 768px)": {
//       width: "85%",
//     },
//   }),
//   menu: (provided) => ({
//     ...provided,
//     zIndex: 9999,
//     maxHeight: "180px",
//   }),
//   menuList: (provided) => ({
//     ...provided,
//     maxHeight: "150px",
//     overflowY: "auto",
//     fontSize:'16px'
//   }),
//   control: (provided) => ({
//     ...provided,
//     minHeight: "30px",
//     height: "30px",
//   }),
//   indicatorSeparator: (provided) => ({
//     ...provided,
//     height: "14px",
//   }),
//   dropdownIndicator: (provided) => ({
//     ...provided,
//     padding: "8px",
//     svg: {
//       width: "18px",
//       height: "18px",
//     },
//   }),
//   placeholder: (provided) => ({
//     ...provided,
//     fontSize: "14px",
//     marginBottom: "10px",
//     color:"#004999",
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     fontSize: "16px",
//     marginBottom: "10px",
//     color:"#004999",
//   }),
//   input: (base) => ({
//     ...base,
//     padding: "0px",
//   }),
// };


// const CustomDropdownIndicator = (props) => {
//   return (
//     <components.DropdownIndicator {...props}>
//       <IoIosArrowUp /> {/* Reverse the arrow here */}
//     </components.DropdownIndicator>
//   );
// };



// const indianStates = [
//   { value: "0", label: "Andhra Pradesh" },
//   { value: "1", label: "Arunachal Pradesh" },
//   { value: "2", label: "Assam" },
//   { value: "3", label: "Bihar" },
//   { value: "4", label: "Chhattisgarh" },
//   { value: "5", label: "Goa" },
//   { value: "6", label: "Gujarat" },
//   { value: "7", label: "Haryana" },
//   { value: "8", label: "Himachal Pradesh" },
//   { value: "9", label: "Jharkhand" },
//   { value: "10", label: "Karnataka" },
//   { value: "11", label: "Kerala" },
//   { value: "12", label: "Madhya Pradesh" },
//   { value: "13", label: "Maharashtra" },
//   { value: "14", label: "Manipur" },
//   { value: "15", label: "Meghalaya" },
//   { value: "16", label: "Mizoram" },
//   { value: "17", label: "Nagaland" },
//   { value: "18", label: "Odisha" },
//   { value: "19", label: "Punjab" },
//   { value: "20", label: "Rajasthan" },
//   { value: "21", label: "Sikkim" },
//   { value: "22", label: "Tamil Nadu" },
//   { value: "23", label: "Telangana" },
//   { value: "24", label: "Tripura" },
//   { value: "25", label: "Uttar Pradesh" },
//   { value: "26", label: "Uttarakhand" },
//   { value: "27", label: "West Bengal" },
// ];

const VictimAddress = ({ onNext, onVictimAddressSelected, onQuestion }) => {
  const [address, setAddress] = useState({
    address1: "",
    city: "",
    state: { value: "23", label: "Telangana" },
    district: null,
    zip: "",
    policeStation: null,
  });
  const [error, setError] = useState("");

  const vist_id = sessionStorage.getItem("visitor_id");



  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setError("");
  };


  const handleOkClick = async (e) => {
    e.preventDefault();

    if (!address.address1) {
      setError("Please Enter the address.");
      return;
    }
    if (!address.city) {
      setError("Please Enter the city.");
      return;
    }

    const dataToSubmit = {
      api_key:"1725993564",
      visitor_token:vist_id,
      qtion_id:"66f65376898d6",
      qtion_num:"9",
      address: address.address1,
      village: address.city,
      post_cod: address.zip,
    };

    console.log(dataToSubmit)

    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_add_addrs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to save address');
      }

      const result = await response.json();
      console.log('Saved data:', result);

      // Perform any additional actions after successful save
      onVictimAddressSelected(dataToSubmit);
      onNext(9);
      onQuestion(10);

    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save address data');
    }
  };


  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Fill your (victim) current full address?</h2>
            <div >
            <h6 style={{ margin: "5px", marginTop: "20px"}} htmlFor="address1">
              Address
            </h6>
            <input
              className="text-input"
              value={address.address1}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="address1"
              autoComplete="off" 
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
              autoComplete="off"
            />

            <h6 style={{ margin: "5px", marginTop: "20px" }} htmlFor="zip">
              Zip/Post code
            </h6>
            <input
              className="text-input"
              value={address.zip}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="zip"
              autoComplete="off"
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
                OK
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
