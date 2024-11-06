import React, { useEffect, useState } from "react";
//import Select from "react-select";
const apiUrl = process.env.REACT_APP_API_URL;

const options = [
  {
    id: "A",
    value: "66d31c12457c3489795485",
    label: " Male",
  },
  { id: "B", value: "66d31c2486272638130560", label: "Female" },
  { id: "C", value: "66d31c42bd15f000864236", label: "Others" },
];

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
  onVictimGenderSelected,
  onQuestion,
  answer,
  apiKey,
  botToken,
  vist_id,
  app_ver,
}) => {
  const [victimName, setVictimName] = useState("");
  const [victimAge, setVictimAge] = useState("");
  const [gender, setGender] = useState(null);
  //const [documentOptions, setDocumentOptions] = useState("");
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState({ name: null, age: null }); // Updated error state
  //const vist_id = sessionStorage.getItem("visitor_id");
  useEffect(() => {
    const storedData = localStorage.getItem("victimName");
    if (storedData) {
      setVictimName(JSON.parse(storedData));
      onVictimNameSelected(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("victimAge");
    if (storedData) {
      setVictimAge(JSON.parse(storedData));
      onVictimAgeSelected(JSON.parse(storedData));
    }
   

  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("victimGender");
    if (storedData) {
      setGender(JSON.parse(storedData));
      onVictimGenderSelected(JSON.parse(storedData));
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
        // setError({
        //   ...error,
        //   name: "Name must be at least 3 characters long.",
        // });
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
        setError({ ...error, age: "Please enter the proper age" });
      } 
      // else {
      //   setError({ ...error, age: "Age can only be a number." });
      // }
    }
  };

  const handleOkClick = async (e) => {
    e.preventDefault();

    const age = parseInt(victimAge, 10);
    let valid = true;

    // Reset all errors initially
    let newError = { name: null, age: null, gender: null };

    // Validate name
    if (!victimName) {
      newError.name = "Please enter the victim's name.";
      valid = false;
    }

    // Validate age
    if (isNaN(age) || age < 5 || age > 110) {
      newError.age = "Please enter the proper  age.";
      valid = false;
    }

    if (!gender) {
      newError.gender = "Please select the victim gender.";
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
            qtion_num: "6",
            vict_nm: victimName,
            vict_age: victimAge,
            lac_token: botToken,
            app_ver: app_ver,
            gen_id: gender,
          }),
        });
        const data = await response.json();

        if (data.resp.error_code === "0") {
          onNext(7);
          onQuestion(8);
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

  const handleOptionClick = async (option, e) => {
    e.preventDefault();
    setShowOkButton(true);
    setGender(option.value); // Notify parent component about the selection
    onVictimGenderSelected(option.value)
    localStorage.setItem("victimGender", JSON.stringify(option.value));
  };


  return (
    <div className="question">
      <div>
        <div>
          <h2 htmlFor="victim-name">Name:<span style={{ color: "red" }}>*</span></h2>
          <input
            type="text"
            className="text-input name"
            value={victimName}
            onChange={handleNameChange}
            placeholder="Type victim name here..."
            id="victim-name"
            autoComplete="off"
          />
          {error.name && <div className="error-message">{error.name}</div>}{" "}
          {/* Individual name error message */}
          <div>
            <h2 htmlFor="victim-age">Age:<span style={{ color: "red" }}>*</span></h2>
            <div>
              <input
                className="text-input name"
                value={victimAge}
                onChange={handleAgeChange}
                placeholder="Type victim age here..."
                id="victim-age"
                type="text"
                min="5"
                max="110"
                autoComplete="off"
                maxLength="3"
              />
               {error.age && <div className="error-message">{error.age}</div>}
              <div>
                <h2>Gender:<span style={{ color: "red" }}>*</span></h2>
                <div style={{ display: "flex", textAlign:'center'}}>
                  {options.map((option) => (
                    <button
                      key={option.id}
                      className={`option-gender-button ${
                        gender === option.value ? "selected" : ""
                      }`}
                      style={{ marginRight: "10px" }}
                      onClick={(e) => handleOptionClick(option, e)}
                    >
                      <div className="answer-container">
                        <div style={{textAlign: "center"}}
                          className={`gender-text ${
                            gender === option.value ? "selected" : ""
                          }`}
                        >
                          {option.label}
                        </div>
                      </div>
                      {/* {gender === option.label && (
                  <span className="checkmark">
                    &#10003;  */}
                      {/* Unicode character for checkmark */}
                      {/* </span>
                )} */}
                    </button>
                  ))}
                </div>
              </div>
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
              {error.gender && <div className="error-message">{error.gender}</div>}
              {/* Individual age error message */}
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", zIndex: "1000" }}
          >
            {showOkButton && (
              <>
                <button
                  type="button"
                  className="ok-btn"
                  onClick={handleOkClick}
                  style={{ marginTop: "30px" }}
                >
                  OK
                </button>
                {/* <p className="enter-text">
                  press <strong>Enter ↵</strong>
                </p> */}
              </>
            )}
          </div>
          {(answer[6]) && (
            <p className="alert-box" style={{zIndex:'1000'}}>
              Please answer the current question before moving to the next.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VictimName;
