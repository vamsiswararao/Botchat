import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const SuspectCall = ({ onNext, onSuspectCallSelected, onQuestion,apiKey,botToken,vist_id,app_ver}) => {
  const [suspectContacts, setSuspectContacts] = useState({
    contactValues: [],
    contactIds: []
  });
  
  //const [selectedCalls, setSelectedCalls] = useState([]);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  //const vist_id = sessionStorage.getItem("visitor_id");

  useEffect(() => {
    const storedSuspectCall = localStorage.getItem('suspectCall');
    if (storedSuspectCall) {
      setSuspectContacts(JSON.parse(storedSuspectCall));
      onSuspectCallSelected(JSON.parse(storedSuspectCall))
    }
  }, []);

  useEffect(() => {
    const fetchPlatFormData = async () => {
      try {
        const platFormResponse = await fetch(
          `${apiUrl}/v1/cy_ma_suspect_comncation_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f653ab73faa",
              lac_token: botToken,
              "app_ver":app_ver
            }),
          }
        );

        if (!platFormResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const platFormData = await platFormResponse.json();
        //console.log(platFormData);
        setOptions(
          platFormData.resp.suspect_comncation_list.map((bank, index) => ({
            id: String.fromCharCode(65 + index),
            value: bank.scom_uniq,
            label: bank.scom_nm,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlatFormData();
  }, []);

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    }
  
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
  
    // Update contactValues and contactIds
    setSuspectContacts((prevSelectedCalls) => {
      // Ensure prevSelectedCalls is always defined
      const updatedCalls = prevSelectedCalls.contactValues.includes(option.value)
        ? {
            contactValues: prevSelectedCalls.contactValues.filter(
              (call) => call !== option.value
            ),
            contactIds: prevSelectedCalls.contactIds.filter(
              (id) => id !== option.id
            ),
          }
        : {
            contactValues: [...prevSelectedCalls.contactValues, option.value],
            contactIds: [...prevSelectedCalls.contactIds, option.id],
          };
  
      // Save data after state update
      onSuspectCallSelected(updatedCalls);
      localStorage.setItem("suspectCall", JSON.stringify(updatedCalls));
      return updatedCalls;
    });
  
    // Double-check updating suspectContacts based on option.value and option.id
    if (suspectContacts.contactValues.includes(option.value)) {
      setSuspectContacts({
        contactValues: suspectContacts.contactValues.filter(
          (contact) => contact !== option.value
        ),
        contactIds: suspectContacts.contactIds.filter(
          (id) => id !== option.id
        ),
      });
    } else {
      setSuspectContacts({
        contactValues: [...suspectContacts.contactValues, option.value],
        contactIds: [...suspectContacts.contactIds, option.id],
      });
    }
  };
  

  const handleOkClick = async (e) => {
    e.preventDefault();
    if (suspectContacts.contactIds.length > 0) {
      onSuspectCallSelected(suspectContacts);
      onNext(12);
      onQuestion("13");
      await saveDataToAPI(suspectContacts);
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  // Function to save data to RequestBin API
  const saveDataToAPI = async (selectedContacts) => {
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_multichoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          visitor_token: vist_id,
          qtion_id: "66f653ab73faa",
          qtion_num: "11",
          qtion_option:suspectContacts.contactIds,
          option_val:  suspectContacts.contactValues,
          lac_token: botToken,
          "app_ver":app_ver
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      //const result = await response.json();
     // console.log("Data saved successfully:", result);
      // Optionally, handle the result as needed
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save data, please try again.");
    }
  };


  return (
    <div className="question">
      <div style={{ display: "flex",flexDirection:'column' }}>
        <div style={{ display: "flex",flexDirection:'column', justifyContent:'center',alignItems:'center' }}>
          <h2>Fraudster`s calling methods or approaches </h2>
          <div className="options-list">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  suspectContacts.contactValues.includes(option.value) ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: suspectContacts.contactValues.includes(option.value)
                        ? "#000"
                        : "#fff",
                      color: suspectContacts.contactValues.includes(option.value)
                        ? "#fff"
                        : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {suspectContacts.contactValues.includes(option.value) && (
                  <span className="checkmark">&#10003;</span> // Unicode character for checkmark
                )}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center"}} className="call-btn">
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
            {error && <div className="error-message">{error}</div>}
          </div>
      </div>
    </div>
  );
};

export default SuspectCall;
