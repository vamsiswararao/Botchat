import React, {  useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;


const VictimAddress = ({ onNext, onVictimAddressSelected, onQuestion,apiKey,botToken,vist_id}) => {
  const [address, setAddress] = useState({
    address1: "",
    city: "",
    state: { value: "23", label: "Telangana" },
    district: null,
    zip: "",
    policeStation: null,
  });
  const [error, setError] = useState("");

  // const vist_id = sessionStorage.getItem("visitor_id");
  useEffect(() => {
    const storedDistrict = localStorage.getItem('address1');
    if (storedDistrict) {
      setAddress((prev) => ({ ...prev, address1: JSON.parse(storedDistrict) }));
    }
  }, []);

  useEffect(() => {
    const storedPoliceStation = localStorage.getItem('city');
    if (storedPoliceStation) {
      setAddress((prev) => ({ ...prev, city: JSON.parse(storedPoliceStation) }));
    }
  }, []);
  useEffect(() => {
    const storedPoliceStation = localStorage.getItem('zip');
    if (storedPoliceStation) {
      setAddress((prev) => ({ ...prev, zip: JSON.parse(storedPoliceStation) }));
    }
    onVictimAddressSelected(setAddress);
  }, []);


  const handleChange = (e) => {
    const { id, value } = e.target;
    localStorage.setItem(id, JSON.stringify(value));
    // Validate input for address1 and city
    if (id === 'address1' || id === 'city') {
      // Regex to allow alphanumeric, space, -, _, and /
      if (/^[a-zA-Z0-9\s\-_\/]*$/.test(value) && value.length <= 100) {
        setAddress((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        setError(""); // Reset error if input is valid
      } else {
        setError("Input can only contain letters, numbers, spaces, hyphens, underscores, and slashes, and must be less than 100 characters.");
      }
    } else if (id === 'zip') {
      // Allow only numbers for zip
      if (/^\d*$/.test(value)) {
        setAddress((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        setError(""); // Reset error if input is valid
      } else {
        setError("Zip code can only contain numbers.");
      }
    } else {
      // Handle other fields if necessary
      setAddress((prevState) => ({
        ...prevState,
        [id]: value,
      }));
      setError(""); // Reset error for other fields
    }
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
      api_key:apiKey,
      visitor_token:vist_id,
      qtion_id:"66f65376898d6",
      qtion_num:"9",
      address: address.address1,
      village: address.city,
      post_cod: address.zip,
      lac_token: botToken
    };


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

      //const result = await response.json();
      //console.log('Saved data:', result);

      // Perform any additional actions after successful save
      onVictimAddressSelected(dataToSubmit);
      onNext(10);
      onQuestion(11);

    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save address data');
    }
  };


  return (
    <div className="question">
      <div style={{ display: "flex" ,justifyContent:'center'}}>
        <div style={{ display: "flex",justifyContent:'center' }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Fill your (victim) current full address?</h2>
            <div >
            <h6 style={{ margin: "5px", marginTop: "20px"}} htmlFor="address1">
              Address  <span style={{color:'red'}}>*</span>
            </h6>
            <input
              className="text-input"
              value={address.address1}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="address1"
              autoComplete="off" 
              name="address1"
            />

            <h6 style={{ margin: "5px", marginTop: "20px" }} htmlFor="city">
              Village/City/Town <span style={{color:'red'}}>*</span>
            </h6> 
            <input
              className="text-input"
              value={address.city}
              onChange={handleChange}
              placeholder="Type your answer here..."
              id="city"
              autoComplete="off"
              name="city"
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
              name="zip"
              maxLength="6"
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
              <p style={{ color: "red", marginTop: "10px", width:'650px' }}>{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictimAddress;
