import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const SuspectCall = ({ onNext, onSuspectCallSelected, onQuestion }) => {
  const [selectedCalls, setSelectedCalls] = useState([]);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const vist_id = sessionStorage.getItem("visitor_id");

  useEffect(() => {
    const fetchPlatFormData = async () => {
      try {
        const platFormResponse = await fetch(
          `${apiUrl}/cy_ma_suspect_comncation_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: "1725993564",
              visitor_token: vist_id,
              qtion_id: "66f653ab73faa",
            }),
          }
        );

        if (!platFormResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const platFormData = await platFormResponse.json();
        console.log(platFormData);
        setOptions(
          platFormData.resp.suspect_comncation_list.map((bank, index) => ({
            id: String.fromCharCode(65 + index),
            value: bank.scom_uniq,
            label: bank.scom_nm,
          })) || []
        );
        //console.log(toData.resp.aud_data);
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

    setSelectedCalls((prevSelectedCalls) => {
      const updatedCalls = prevSelectedCalls.includes(option.value)
        ? prevSelectedCalls.filter((call) => call !== option.value)
        : [...prevSelectedCalls, option.value];

      // Save data after state update
      onSuspectCallSelected(updatedCalls);

      return updatedCalls;
    });
  };

  const handleOkClick = async (e) => {
    e.preventDefault();
    if (selectedCalls.length > 0) {
      onSuspectCallSelected(selectedCalls);
      onNext(12);
      onQuestion("13");
      await saveDataToAPI(selectedCalls);
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  // Function to save data to RequestBin API
  const saveDataToAPI = async (selectedContacts) => {
    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_add_multichoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "1725993564",
          visitor_token: vist_id,
          qtion_id: "66f653ab73faa",
          qtion_num: "5a",
          qtion_option: ["a","b","c","d","e"],
          option_val: selectedContacts,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      console.log("Data saved successfully:", result);
      // Optionally, handle the result as needed
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save data, please try again.");
    }
  };

  // const options = [
  //   { id: "A", label: "Normal Call-Number" },
  //   { id: "B", label: "WhatsApp Call-Number" },
  //   { id: "C", label: "Telegram Call-Number" },
  //   { id: "D", label: "Instagram Call-Number" },
  //   { id: "E", label: "Facebook Call-Number" },
  //   { id: "F", label: "Skype Call-Number" },
  //   { id: "G", label: "Zoom Call-Number" },
  //   { id: "H", label: "Snap Call-Number" },
  //   { id: "I", label: "Webex Call-Number" },
  //   { id: "J", label: "Duos Call-Number" },
  //   { id: "K", label: "Microsoft Call-Number" },
  // ];

  return (
    <div className="question">
      <div style={{ display: "flex",flexDirection:'column' }}>
        <div style={{ display: "flex",flexDirection:'column', justifyContent:'center',alignItems:'center' }}>
          <h2>Fraudster`s calling methods or approaches </h2>
          <div className="option-list">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  selectedCalls.includes(option.value) ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: selectedCalls.includes(option.value)
                        ? "#000"
                        : "#fff",
                      color: selectedCalls.includes(option.value)
                        ? "#fff"
                        : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {selectedCalls.includes(option.value) && (
                  <span className="checkmark">&#10003;</span> // Unicode character for checkmark
                )}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" ,marginLeft:'90px'}}>
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
