import React, {  useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;


const VictimAddress = ({ onNext, onVictimAddressSelected, onQuestion,apiKey,botToken,vist_id,app_ver,answer}) => {
  const [address, setAddress] = useState({
    address1: "",
    city: "",
    zip: "",
  });
  const [error, setError] = useState("");

  // const vist_id = sessionStorage.getItem("visitor_id");
  // useEffect(() => {
  //   const storedDistrict = localStorage.getItem('address1');
  //   if (storedDistrict) {
  //     setAddress((prev) => ({ ...prev, address1: JSON.parse(storedDistrict) }));
  //   }
  // }, []);

  // useEffect(() => {
  //   const storedPoliceStation = localStorage.getItem('city');
  //   if (storedPoliceStation) {
  //     setAddress((prev) => ({ ...prev, city: JSON.parse(storedPoliceStation) }));
  //   }
  // }, []);
  // useEffect(() => {
  //   const storedPoliceStation = localStorage.getItem('zip');
  //   if (storedPoliceStation) {
  //     setAddress((prev) => ({ ...prev, zip: JSON.parse(storedPoliceStation) }));
  //   }
  //   onVictimAddressSelected(setAddress);
  // }, []);


  useEffect(() => {
    const storedDistrict = localStorage.getItem('address');
    if (storedDistrict) {
      setAddress(JSON.parse(storedDistrict));
      onVictimAddressSelected(JSON.parse(storedDistrict))
    }
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
      } 
      // else {
      //   setError("Input can only contain letters, numbers, spaces, hyphens, underscores, and slashes, and must be less than 100 characters.");
      // }
    } else if (id === 'zip') {
      // Allow only numbers for zip
      if (/^\d*$/.test(value)) {
        setAddress((prevState) => ({
          ...prevState,
          [id]: value,
        }));
        setError(""); // Reset error if input is valid
      } 
      // else {
      //   setError("Please Enter the valid pin code.");
      // }
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
    const dataToSubmit = {
      api_key:apiKey,
      visitor_token:vist_id,
      qtion_id:"66f65376898d6",
      qtion_num:"10",
      address: address.address1,
      village: address.city,
      post_cod: address.zip,
      lac_token: botToken,
      "app_ver":app_ver
    };

    localStorage.setItem('address', JSON.stringify(address));
    onVictimAddressSelected(address);

    if (!address.city) {
      setError("Please enter the city.");
      return;
    } 
    if (!address.zip ) {
      setError("Please enter the pin code.");
      return;
    }


    if(address.city || address.zip){


      if (!address.city) {
        setError("Please enter the city.");
        return;
      }
      if ((address.city.length)<2) {
        setError("Please enter The valid city.");
        return;
      }
      if (!address.zip ) {
        setError("Please enter the pin code.");
        return;
      }
      if ((address.zip.length)!==6 ) {
        setError("Please enter the valid pin code.");
        return;
      }
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_addrs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        throw new Error('Failed to save address');
      }

      const data = await response.json();
    //  console.log(data)
      if(data.resp.error_code ==="0"){
        onVictimAddressSelected(address);
        onNext(11);
        onQuestion(12);
        setError("")
      }else{
        setError("Enter valid address");
      }



      // Perform any additional actions after successful save
      localStorage.setItem('address', JSON.stringify(address));
      onVictimAddressSelected(address);


    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save address data');
    }
  }
  };


  return (
    <div className="question">
      <div style={{ display: "flex" ,justifyContent:'center'}}>
        <div style={{ display: "flex",justifyContent:'center' }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Present Address</h2>
            <div  style={{position :"relative", zIndex:'9'}}>
            <p style={{ margin: "5px", marginTop: "5px"}} htmlFor="address1">
              Address  
            </p>
            <input
              className="text-input"
              value={address.address1}
              onChange={handleChange}
              placeholder="Type your address..."
              id="address1"
              autoComplete="off" 
              name="address1"
            />

            <p style={{ margin: "5px", marginTop: "5px" }} htmlFor="city">
              Village/City/Town <span style={{ color: "red" }}>*</span>
            </p> 
            <input
              className="text-input"
              value={address.city}
              onChange={handleChange}
              placeholder="Type your village/city/town..."
              id="city"
              autoComplete="off"
              name="city"
            />

            <p style={{ margin: "5px", marginTop: "5px" }} htmlFor="zip">
              Pin Code <span style={{ color: "red" }}>*</span>
            </p>
            <input
              className="text-input"
              value={address.zip}
              onChange={handleChange}
              placeholder="Type your pin code..."
              id="zip"
              autoComplete="off"
              name="zip"
              maxLength="6"
              inputMode="numeric"
            />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                position:'relative',
                zIndex:'9'
              }}
            >
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                OK
              </button>
              {/* <p className="enter-text">
                press <strong>Enter ↵</strong>
              </p> */}
            </div>
            {error && (
              <p className="bank-error" style={{ position: 'relative', zIndex: '1000' }}>{error}</p>
            )}
                      {(answer[10]) && (
            <p className="alert-box" style={{zIndex:'1000'}}>
              Please answer the current question before moving to the next.
            </p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VictimAddress;
