import React, { useEffect, useState } from "react";
import Select,{components} from "react-select";
import { IoIosArrowUp } from 'react-icons/io';
const apiUrl = process.env.REACT_APP_API_URL;

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "340px",
    height: "24px",
    backgroundColor:"red",
    "@media (max-width: 768px)": {
      width: "85%",
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


const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <IoIosArrowUp /> {/* Reverse the arrow here */}
    </components.DropdownIndicator>
  );
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

const PoliceStation = ({ onNext, onVictimAddressSelected, onQuestion }) => {
  const [address, setAddress] = useState({
    address1: "",
    city: "",
    state: { value: "23", label: "Telangana" },
    district: null,
    zip: "",
    policeStation: null,
  });
  const [error, setError] = useState("");
  const [AddressOptions, setAddressOptions] = useState([]);
  const [psOptions, setPsOptions] = useState([]);

  const vist_id = sessionStorage.getItem("visitor_id");
  useEffect(() => {
    const fetchAddressData= async () => {
      try {
                const qulificationResponse = await fetch(`${apiUrl}/cy_ma_districts_list`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    "api_key":"1725993564",
                    visitor_token:vist_id,
                    qtion_id:"66f65376898d6",
             }
             ),
                });
        
                if (!qulificationResponse.ok) {
                  throw new Error("Failed to fetch Address options");
                }
        
                const qulificationData = await qulificationResponse.json();
                 setAddressOptions(
                  qulificationData.resp.districts_list.map((address) => ({
                    value: address.dist_uniq,
                    label:address.dist_nm
                   })) || []
                 );
                //console.log(toData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchAddressData();
  }, []);

    const fetchPsData= async ( districtValue) => {
      try {
                const qulificationResponse = await fetch(`${apiUrl}/cy_ma_applicable_ps_list`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    "api_key":"1725993564",
                    "dst": districtValue,
                    visitor_token:vist_id,
                    qtion_id:"66f65376898d6",
             }
             ),
                });
        
                if (!qulificationResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const qulificationData = await qulificationResponse.json();
                console.log(qulificationData)
                 setPsOptions(
                  qulificationData.resp.ps_list.map((ps) => ({
                    value: ps.aplps_uni,
                    label:ps.aplps_nm
                                        
                   })) || []
                 );
                //console.log(toData.resp.aud_data);
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
    setError("");
    
  };

  const handlePoliceChange = (selectedOption) => {
    setAddress((prevState) => ({
      ...prevState,
      policeStation: selectedOption,
    }));
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
      api_key:"1725993564",
      visitor_token:vist_id,
      qtion_id:"67064ae25a10a798740151",
      qtion_num:"4e",
      district: address.district ? address.district.value : null,
      ps: address.policeStation ? address.policeStation.value : null,
    };

    console.log(dataToSubmit)

    try {
      const response = await fetch(`${apiUrl}/ccrim_add_ps`, {
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
      onNext(10);
      onQuestion(11);

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
            <h2>Select the police station?</h2>
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

            {/* {address.state.value === "23" && ( */}
              <>
                <h6
                  style={{ margin: "5px", marginTop: "20px" }}
                  htmlFor="district"
                >
                  District<span style={{color:'red'}}>*</span>
                </h6>
                <Select
                  options={AddressOptions}
                  value={address.district}
                  onChange={handleDistrictChange}
                  id="district"
                  styles={customStyles}
                />
              </>
            {/* )} */}
            <h6
              style={{ margin: "5px", marginTop: "20px" }}
              htmlFor="policeStation"
            >
              Nearest police station?<span style={{color:'red'}}>*</span>
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
                menuPlacement="top" 
                styles={customStyles}
                components={{ DropdownIndicator: CustomDropdownIndicator }}
              />
            </div>
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

export default PoliceStation;
