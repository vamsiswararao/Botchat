import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const SuspectSpeak = ({
  onNext,
  onSuspectSpeakSelected,
  onQuestion,
  apiKey,
  botToken,
  vist_id,
  app_ver,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({
    contactValues: [],
    contactIds: [],
  });
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [speckOptions, setSpeckOptions] = useState([]);
  //const vist_id = sessionStorage.getItem("visitor_id");

  useEffect(() => {
    const storedSuspectCall = localStorage.getItem("suspectSpeck");
    if (storedSuspectCall) {
      setSelectedOptions(JSON.parse(storedSuspectCall));
      onSuspectSpeakSelected(JSON.parse(storedSuspectCall));
    }
  }, []);

  useEffect(() => {
    const fetchProfessionData = async () => {
      try {
        const professionResponse = await fetch(`${apiUrl}/v1/cy_ma_lang_list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            visitor_token: vist_id,
            qtion_id: "66f653bf26e9c",
            lac_token: botToken,
            app_ver: app_ver,
          }),
        });

        if (!professionResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const professionData = await professionResponse.json();
        //console.log(professionData)
        setSpeckOptions(
          professionData.resp.lng_list.map((profession, index) => ({
            id: String.fromCharCode(65 + index),
            value: profession.lang_uniq,
            label: profession.lang_nm,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfessionData();
  }, []);

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    }

    setShowOkButton(true); // Show the OK button after a successful click
    setError("");

    // Update contactValues and contactIds
    setSelectedOptions((prevSelectedCalls) => {
      // Ensure prevSelectedCalls is always defined
      const updatedCalls = prevSelectedCalls.contactValues.includes(
        option.value
      )
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
      onSuspectSpeakSelected(updatedCalls);
      localStorage.setItem("suspectSpeck", JSON.stringify(updatedCalls));
      return updatedCalls;
    });

    // Double-check updating suspectContacts based on option.value and option.id
    if (selectedOptions.contactValues.includes(option.value)) {
      setSelectedOptions({
        contactValues: selectedOptions.contactValues.filter(
          (contact) => contact !== option.value
        ),
        contactIds: selectedOptions.contactIds.filter((id) => id !== option.id),
      });
    } else {
      setSelectedOptions({
        contactValues: [...selectedOptions.contactValues, option.value],
        contactIds: [...selectedOptions.contactIds, option.id],
      });
    }
  };

  const saveDataToAPI = async (selectedOptions) => {
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_multichoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          visitor_token: vist_id,
          qtion_id: "66f653bf26e9c",
          qtion_num: "14",
          qtion_option: selectedOptions.contactIds,
          option_val: selectedOptions.contactValues,
          app_ver: app_ver,
          lac_token: botToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const data = await response.json();
      if (data.resp.error_code === "0") {
        onSuspectSpeakSelected(selectedOptions);
        onNext(15);
        onQuestion(16);
      } else {
        setError("Failed to push data to API");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save data, please try again.");
    }
  };

  const handleOkClick = async (e) => {
    e.preventDefault();

    if (selectedOptions.contactValues.length > 0) {
      await saveDataToAPI(selectedOptions);
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };
  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <h2>Languages Used</h2>
          <div className="option-list">
            {speckOptions.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  selectedOptions.contactValues.includes(option.value)
                    ? "selected"
                    : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: selectedOptions.contactValues.includes(
                        option.value
                      )
                        ? "#000"
                        : "#fff",
                      color: selectedOptions.contactValues.includes(
                        option.value
                      )
                        ? "#fff"
                        : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {selectedOptions.contactValues.includes(option.value) && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="call-btn" style={{zIndex:'1000' }} >
            {showOkButton && (
              <>
                <button
                  type="button"
                  className="ok-btn"
                  onClick={handleOkClick}
                >
                  OK
                </button>
                {/* <p className="enter-text">
                  press <strong>Enter ↵</strong>
                </p> */}
              </>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default SuspectSpeak;
