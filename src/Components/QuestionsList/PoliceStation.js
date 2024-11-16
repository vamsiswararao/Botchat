import React, { useEffect, useState } from "react";
import Select from "react-select";
const apiUrl = process.env.REACT_APP_API_URL;

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "480px",
    height: "24px",
    "@media (max-width: 768px)": {
      width: "300px",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    maxHeight: "180px",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "150px",
    overflowY: "auto",
    fontSize:'16px'
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "30px",
    height: "36px",
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
    color:"#004999",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
    marginBottom: "10px",
    color:"#004999",
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

const PoliceStation = ({ onNext, onVictimAddressSelected, onQuestion,apiKey,answer,botToken,vist_id,app_ver }) => {
  const [address, setAddress] = useState({
    state: { value: "23", label: "Telangana" },
    district: null,
    zip: "",
    policeStation: null,
  });
  const [error, setError] = useState("");
  const [policeOptions, setPoliceOptions] = useState([]);
  const [psOptions, setPsOptions] = useState([]);

  //const vist_id = sessionStorage.getItem("visitor_id");

  useEffect(() => {
    const storedDistrict = localStorage.getItem('policeStations');

    
    if (storedDistrict) {
      const data = JSON.parse(storedDistrict);
      onVictimAddressSelected(data);
      setAddress((prev) => ({
        ...prev,
        district: data.district || '',
        policeStation: data.policeStation || ''
      }));
    }
  }, []);
  
  

  // useEffect(() => {
  //   const storedPoliceStation = localStorage.getItem('policeStation');
  //   if (storedPoliceStation) {
  //     setAddress((prev) => ({ ...prev, policeStation: JSON.parse(storedPoliceStation) }));
  //   }
  //   onVictimAddressSelected(setAddress);
  // }, []);


  useEffect(() => {
    const fetchAddressData= async () => {
      try {
                const qulificationResponse = await fetch(`${apiUrl}/v1/cy_ma_districts_list`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    "api_key":apiKey,
                    visitor_token:vist_id,
                    qtion_id:"66f65376898d6",
                    lac_token: botToken,
                    "app_ver":app_ver
             }
             ),
                });
        
                if (!qulificationResponse.ok) {
                  throw new Error("Failed to fetch Address options");
                }
        
                const qulificationData = await qulificationResponse.json();
                 setPoliceOptions(
                  qulificationData.resp.districts_list.map((address) => ({
                    value: address.dist_uniq,
                    label:address.dist_nm
                   })) || []
                 );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchAddressData();
  }, [apiKey,app_ver,botToken,vist_id]);

    const fetchPsData= async ( districtValue) => {
      try {
                const qulificationResponse = await fetch(`${apiUrl}/v1/cy_ma_applicable_ps_list`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    "api_key":apiKey,
                    "dst": districtValue,
                    visitor_token:vist_id,
                    qtion_id:"66f65376898d6",
                    lac_token: botToken,
                    "app_ver":app_ver
             }
             ),
                });
        
                if (!qulificationResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const qulificationData = await qulificationResponse.json();
                 setPsOptions(
                  qulificationData.resp.ps_list.map((ps) => ({
                    value: ps.aplps_uni,
                    label:ps.aplps_nm
                                        
                   })) || []
                 );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
      policeStation: ""
    }));
    fetchPsData(selectedOption.value);
    // localStorage.setItem('district', JSON.stringify(selectedOption));
    // localStorage.setItem('policeStation', JSON.stringify(null));
    setError("");
    
  };

  const handlePoliceChange = (selectedOption) => {
    setAddress((prevState) => ({
      ...prevState,
      policeStation: selectedOption,
    }));
    // localStorage.setItem('policeStation', JSON.stringify(selectedOption));
    setError("");
  };

  const handleOkClick = async (e) => {
    e.preventDefault();

    if (!address.district) {
      setError("Please select the district.");
      return;
    }
    if (!address.policeStation) {
      setError("Please select the policeStation.");
      return;
    }

    const dataToSubmit = {
      api_key:apiKey,
      visitor_token:vist_id,
      qtion_id:"67064ae25a10a798740151",
      qtion_num:"9",
      district: address.district ? address.district.value : null,
      ps: address.policeStation ? address.policeStation.value : null,
      lac_token: botToken,
      "app_ver":app_ver
    };



    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_ps`, {
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
      //console.log(data)
      if(data.resp.error_code ==="0"){
        localStorage.setItem('policeStations', JSON.stringify(address));
        onVictimAddressSelected(address);
        onNext(10);
        onQuestion(11);
        setError("");
      }else{
        setError("Failed to push data to API");
      }


    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save address data');
    }
  };


  return (
    <div className="question">
      <div style={{ display: "flex",justifyContent:'center' }}>
        <div style={{ display: "flex",justifyContent:'center' }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h2>Jurisdictional Police Station <span style={{ color: "red" }}>*</span></h2>
            <div>
            <h6 style={{ margin: "5px", marginTop: "20px" }} htmlFor="state">
              State
            </h6>
            <Select
              options={indianStates}
              value={indianStates[23]}
              onChange={handleStateChange}
              id="state"
              styles={customStyles}
              isDisabled={true}
            />
              <>
                <h6
                  style={{ margin: "5px", marginTop: "20px" }}
                  htmlFor="district"
                >
                  District<span style={{color:'red'}}>*</span>
                </h6>
                <Select
                  options={policeOptions}
                  value={address.district}
                  onChange={handleDistrictChange}
                  id="district"
                  styles={customStyles}
                />
              </>
            <h6
              style={{ margin: "5px", marginTop: "20px" }}
              htmlFor="policeStation"
            >
              Police Station<span style={{color:'red'}}>*</span>
            </h6>
            <div className="select-container">
              <Select
                id="policeStation"
                value={address.policeStation}
                onChange={handlePoliceChange}
                options={psOptions}
                placeholder="Type to search..."
                aria-label="Police Station"
                className="dropdown-input" 
                styles={customStyles}
              />
            </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                position:"relative",
                zIndex:"9"
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
              <p style={{ color: "red", marginTop: "10px",position: 'relative', zIndex: '1000' }} >{error}</p>
            )}
                        {answer[9] && (
              <p className="alert-box">
                Please answer the current question before moving to the next.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliceStation;
