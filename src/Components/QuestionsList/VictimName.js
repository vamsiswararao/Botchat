import React, { useEffect, useState } from "react";
//import Select from "react-select";
const apiUrl = process.env.REACT_APP_API_URL;

// const customStyles = {
//   container: (provided) => ({
//     ...provided,
//     width: "380px",
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

const VictimName = ({
  onNext,
  onVictimNameSelected,
  onVictimAgeSelected,
  onQuestion,
  answer,
  apiKey,
  botToken,
  vist_id,
  app_ver
}) => {
  const [victimName, setVictimName] = useState("");
  const [victimAge, setVictimAge] = useState("");
  //const [documentOptions, setDocumentOptions] = useState("");
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState({ name: null, age: null }); // Updated error state
  //const vist_id = sessionStorage.getItem("visitor_id");
  useEffect(() => {
    const storedData = localStorage.getItem("victimName");
    if (storedData) {
      setVictimName(JSON.parse(storedData));
      onVictimNameSelected(JSON.parse(storedData))
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("victimAge");
    if (storedData) {
      setVictimAge(JSON.parse(storedData));
      onVictimAgeSelected(JSON.parse(storedData))
    }
  }, []);

  // useEffect(() => {
  //   const fetchAddressData= async () => {
  //     try {
  //               const documentResponse = await fetch(`${apiUrl}/cy_ma_districts_list`, {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify({
  //                   "api_key":apiKey,
  //                   visitor_token:vist_id,
  //                   qtion_id:"66f65376898d6",
  //            }
  //            ),
  //               });
        
  //               if (!documentResponse.ok) {
  //                 throw new Error("Failed to fetch Address options");
  //               }
        
  //               const qulificationData = await documentResponse.json();
  //                setDocumentOptions(
  //                 qulificationData.resp.districts_list.map((address) => ({
  //                   value: address.dist_uniq,
  //                   label:address.dist_nm
  //                  })) || []
  //                );
  //               //console.log(toData.resp.aud_data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

    
  
  //   fetchAddressData();
  // }, []);

  const handleNameChange = (event) => {
    const inputValue = event.target.value;
   

    // Allow only alphabets and spaces, and enforce min 3 and max 100 characters
    if (/^[a-zA-Z\s]*$/.test(inputValue) && inputValue.length <= 100) {
      setVictimName(inputValue);
      onVictimNameSelected(inputValue);
      if (inputValue.length >= 3) {
        setShowOkButton(true);
        // Reset name error on valid change
        localStorage.setItem("victimName", JSON.stringify(inputValue));
        setError({ ...error, name: null });
      } else {
        setError({
          ...error,
          name: "Name must be at least 3 characters long.",
        });
      }
    } else if (!/^[a-zA-Z\s]*$/.test(inputValue)) {
      // Error message for invalid characters
      setError({ ...error, name: "Name can only contain letters and spaces." });
    }
  };

  const handleAgeChange = (event) => {
    const inputValue = event.target.value;

    // Allow only numbers and enforce the age range (5 to 110)
    if (
      /^\d*$/.test(inputValue) &&
      (inputValue === "" ||
        (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 110))
    ) {
      setVictimAge(inputValue);
      onVictimAgeSelected(inputValue);
      setShowOkButton(true);
      localStorage.setItem("victimAge", JSON.stringify(inputValue));
      setError({ ...error, age: null }); // Reset age error on change
    } else {
      // Set error message if the input is invalid
      if (
        inputValue !== "" &&
        (parseInt(inputValue) < 5 || parseInt(inputValue) > 110)
      ) {
        setError({ ...error, age: "Age must be between 5 and 110." });
      } else {
        setError({ ...error, age: "Age can only be a number." });
      }
    }
  };

  const handleOkClick = async (e) => {
    e.preventDefault();


    const age = parseInt(victimAge, 10);
    let valid = true;

    // Reset all errors initially
    let newError = { name: null, age: null };

    // Validate name
    if (!victimName) {
      newError.name = "Please enter the victim's name.";
      valid = false;
    }

    // Validate age
    if (isNaN(age) || age < 5 || age > 110) {
      newError.age = "Please enter a valid age (5-110).";
      valid = false;
    }

    setError(newError); // Update the error state

    if (valid) {
      try {
        const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_victim_data`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            visitor_token: vist_id,
            qtion_id: "66f652eaeaef8",
            qtion_num: "4",
            vict_nm: victimName,
            vict_age: victimAge,
            lac_token: botToken,
            "app_ver":app_ver
          }),
        });
        const data = await response.json();

        if (data.resp.error_code === "0") {
          onNext(5);
          onQuestion("6");
          setShowOkButton(true);
          setError("");
        } else {
          setError("Failed to push data to API");
        }
        if (!response.ok) {
          throw new Error("Failed to push data to API");
        }
      } catch (err) {
        console.error("Error sending data to API:", err);
      }
    } else {
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  return (
    <div className="question">
      <div >
        <div >
          <h2 htmlFor="victim-name">What is your (victim) name?</h2>
          <input
            type="text"
            className="text-input"
            value={victimName}
            onChange={handleNameChange}
            placeholder="Type your answer here..."
            id="victim-name"
            autoComplete="off"
          />
          {error.name && <div className="error-message">{error.name}</div>}{" "}
          {/* Individual name error message */}
          <div>
            <h2 htmlFor="victim-age">What is your (victim) age?</h2>
            <div>
              <input
                className="text-input"
                value={victimAge}
                onChange={handleAgeChange}
                placeholder="Type your age here..."
                id="victim-age"
                type="text"
                min="5"
                max="110"
                autoComplete="off"
                maxLength="3"
              />
              {/* <p>Select the victim document proof</p>
              <div style={{display:'flex',alignItems:'center'}}>
              <Select
                options={documentOptions}
                // value={address.district}
                // onChange={handleDistrictChange}
                // id="district"
                styles={customStyles}
              />
              <div style={{marginLeft:'10px'}}>
                  <input
            type="file"
            id="file-uploads"
            multiple
            //onChange={handleFileChange}
            className="file-input"
            style={{ display: "none" }}
          />
          </div>
          <label htmlFor="file-uploads" className="upload-file">
            Choose File
          </label>
          </div> */}
              {error.age && <div className="error-message">{error.age}</div>}{" "}
              {/* Individual age error message */}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {showOkButton && (
              <>
                <button
                  type="button"
                  className="ok-btn"
                  onClick={handleOkClick}
                >
                  OK
                </button>
                <p className="enter-text">
                  press <strong>Enter ↵</strong>
                </p>
              </>
            )}
          </div>
          {(answer[4] || answer[5]) && (
            <p className="alert-box">
              Please answer the current question before moving to the next.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VictimName;
