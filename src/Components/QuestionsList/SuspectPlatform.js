import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const SuspectPlatform = ({
  onNext,
  onSuspectContactSelected,
  onQuestion,
  apiKey,
  botToken,
  vist_id,
  app_ver,
}) => {
  const [suspectContacts, setSuspectContacts] = useState({
    contactValues: [],
    contactIds: [],
  });
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [isYesSelected, setIsYesSelected] = useState(null);

  useEffect(() => {
    const storedSuspectCall = localStorage.getItem("suspectContact");
    if (storedSuspectCall) {
      const parsedCall = JSON.parse(storedSuspectCall);
      setSuspectContacts(parsedCall);
      onSuspectContactSelected(parsedCall);
    }
  }, []);

  useEffect(() => {
    const storedSuspectCall = localStorage.getItem("radio");
    if (storedSuspectCall) {
      const parsedCall = JSON.parse(storedSuspectCall);
      setIsYesSelected(parsedCall);
      onSuspectContactSelected(parsedCall);
    }
  }, []);

  useEffect(() => {
    const fetchPlatFormData = async () => {
      try {
        const platFormResponse = await fetch(
          `${apiUrl}/v1/cy_ma_suspect_platforms_list`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f653d914bc5",
              lac_token: botToken,
              app_ver: app_ver,
            }),
          }
        );

        if (!platFormResponse.ok) {
          throw new Error("Failed to fetch platform options");
        }

        const platFormData = await platFormResponse.json();
        setOptions(
          platFormData.resp.suspect_platforms_list.map((bank, index) => ({
            id: String.fromCharCode(65 + index),
            value: bank.splat_uniq,
            label: bank.splat_nm,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlatFormData();
  }, [apiKey, botToken, vist_id, app_ver]);

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    setShowOkButton(true);
    setError("");
    setSuspectContacts((prev) => {
      const contactValues = prev.contactValues.includes(option.value)
        ? prev.contactValues.filter((value) => value !== option.value)
        : [...prev.contactValues, option.value];
      const contactIds = prev.contactIds.includes(option.id)
        ? prev.contactIds.filter((id) => id !== option.id)
        : [...prev.contactIds, option.id];

      const updatedContacts = { contactValues, contactIds };
      localStorage.setItem("suspectContact", JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const saveDataToAPI = async () => {
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_multichoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          visitor_token: vist_id,
          qtion_id: "66f653d914bc5",
          qtion_num: "15",
          qtion_option: suspectContacts.contactIds,
          option_val: suspectContacts.contactValues,
          lac_token: botToken,
          app_ver: app_ver,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const data = await response.json();
      if (data.resp.error_code === "0") {
        onSuspectContactSelected(suspectContacts);
        onNext(16);
        onQuestion(17);
      } else {
        setError("Failed to push data to API");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save data, please try again.");
    }
  };

  const handleOkClick = async () => {
    if (suspectContacts.contactValues.length > 0) {
      await saveDataToAPI();
    } else {
      setError("Please select an option before proceeding.");
      console.log("Please select an option before proceeding.");
      setShowOkButton(false);
    }
  };

  const handleRadioChange = (selection, e) => {
    e.preventDefault();
    localStorage.setItem("radio", JSON.stringify(selection));
    setIsYesSelected(selection);
    if (selection === "no") {
      onNext(16);
      onQuestion(17);
      setSuspectContacts({
        contactValues: [],
        contactIds: [],
      });
      localStorage.setItem("suspectContact", JSON.stringify("suspect"));
      onSuspectContactSelected("suspectContacts");
    }
  };

  return (
    <div className="question" style={{ position: 'relative', zIndex: '1000' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="link">Any links shared?</h2>
        <div style={{ display: "flex", marginLeft: '20px' }}>
          <button
            onClick={(e) => handleRadioChange("yes", e)}
            style={{
              marginRight: '10px',
              backgroundColor: isYesSelected === "yes" ? '#007bff' : 'initial',
              color: isYesSelected === "yes" ? 'white' : 'initial',
              border: '1px solid #007bff',
            }}
          >
            Yes
          </button>
          <button
            onClick={(e) => handleRadioChange("no", e)}
            style={{
              backgroundColor: isYesSelected === "no" ? '#007bff' : 'initial',
              color: isYesSelected === "no" ? 'white' : 'initial',
              border: '1px solid #007bff',
            }}
          >
            No
          </button>
        </div>
      </div>

      {isYesSelected === "yes" && (
        <div>
          <h2>What is the platform(s) used by the fraudster</h2>
          <div className="option-lists" >
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${suspectContacts.contactValues.includes(option.value) ? "selected" : ""}`}
                onClick={(e) => handleOptionClick(option, e)}
                style={{ position: 'relative', zIndex: '1000' }}
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
                  <span className="checkmark">&#10003;</span>
                )}
              </button>
            ))}
          </div>
          {showOkButton && (
            <div className="calls-btn" style={{ position: 'relative', zIndex: '1000',marginTop:'-2px' }}>
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                OK
              </button>
            </div>
          )}
           {error && <div className="error-message"  style={{ position: 'relative', zIndex: '1000' }}>{error}</div>}
        </div>
      )}
    </div>
  );
};

export default SuspectPlatform;
