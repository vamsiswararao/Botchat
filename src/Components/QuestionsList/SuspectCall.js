import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const SuspectCall = ({ onNext, onSuspectCallSelected, onQuestion, apiKey, botToken, vist_id, app_ver,onPhoneNumber }) => {
  const [suspectContacts, setSuspectContacts] = useState({
    contactValues: [],
    contactIds: []
  });
  const [previousSelectedContacts, setPreviousSelectedContacts] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [previousNumber, setPreviousNumber] = useState(null);

  useEffect(() => {
    const storedSuspectCall = localStorage.getItem("suspectCall");
    if (storedSuspectCall) {
      const storedContacts = JSON.parse(storedSuspectCall);
      setSuspectContacts(storedContacts);
      onSuspectCallSelected(storedContacts);
      setPreviousSelectedContacts(storedContacts); // Set initial previous selection
    }
  }, []);

  useEffect(() => {
    const storedSuspectCall = localStorage.getItem("phoneNumber");
    if (storedSuspectCall) {
      const storedContacts = JSON.parse(storedSuspectCall);
      setPhoneNumber(storedContacts);
      onPhoneNumber(storedContacts);
      setPreviousNumber(storedContacts); // Set initial previous selection
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
              app_ver: app_ver
            }),
          }
        );

        if (!platFormResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const platFormData = await platFormResponse.json();
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
    setShowOkButton(true);
    setError("");

    setSuspectContacts((prevContacts) => {
      const updatedContacts = prevContacts.contactValues.includes(option.value)
        ? {
            contactValues: prevContacts.contactValues.filter(
              (call) => call !== option.value
            ),
            contactIds: prevContacts.contactIds.filter((id) => id !== option.id),
          }
        : {
            contactValues: [...prevContacts.contactValues, option.value],
            contactIds: [...prevContacts.contactIds, option.id],
          };

      onSuspectCallSelected(updatedContacts);
      localStorage.setItem("suspectCall", JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const handleOkClick = async (e) => {
    e.preventDefault();



    if (
      JSON.stringify(suspectContacts) !== JSON.stringify(previousSelectedContacts)  || previousNumber !== phoneNumber 
    ) {
      if (suspectContacts.contactIds.length > 0) {
        await saveDataToAPI(suspectContacts);
        setPreviousSelectedContacts(suspectContacts); // Update previous selection after API call
        setPreviousNumber(phoneNumber)
      } else {
        setError("Please select an option before proceeding.");
        setShowOkButton(false);
      }
    }else{
      onNext(13);
      onQuestion(14);
    }
  };

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
          qtion_num: "12",
          qtion_option: selectedContacts.contactIds,
          option_val: selectedContacts.contactValues,
          lac_token: botToken,
          app_ver: app_ver,
          sus_mobile:phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const data = await response.json();
      // console.log(data)
      if (data.resp.error_code === "0") {
        onSuspectCallSelected(suspectContacts);
        onNext(13);
        onQuestion(14);
      } else {
        setError("Failed to push data to API");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save data, please try again.");
    }
  };

  const handleChangeMobile = (event) => {
    event.preventDefault();
    const inputValue = event.target.value;
    // Only allow numeric values (including decimal points)
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setPhoneNumber(inputValue);
      onPhoneNumber(inputValue); // Pass the input value without commas to the parent component
      setError(""); // Clear any previous error messages

      localStorage.setItem("phoneNumber", JSON.stringify(phoneNumber));
    }
  };

  return (
    <div className="question">
      <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{display:'flex'}}>
      <h2>Mobile:</h2>
      <input type="text" value={phoneNumber} className="text-mobile-input"onChange={handleChangeMobile} placeholder="Fraudster's Mobile Number" />
      </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h2>Mode of Approach/Communication</h2>
          <div className="option-list">
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
                      backgroundColor: suspectContacts.contactValues.includes(option.value) ? "#000" : "#fff",
                      color: suspectContacts.contactValues.includes(option.value) ? "#fff" : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div style={{ textAlign: "start" }} className="option-label">{option.label}</div>
                </div>
                {suspectContacts.contactValues.includes(option.value) && (
                  <span className="checkmark">&#10003;</span> // Unicode checkmark
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="call-btn" style={{ zIndex: "900" }}>
          {showOkButton && (
            <button type="button" className="ok-btn" onClick={handleOkClick}>OK</button>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default SuspectCall;
