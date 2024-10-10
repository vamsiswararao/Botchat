import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const SuspectContact = ({ onNext, onSuspectContactSelected, onQuestion }) => {
  const [suspectContacts, setSuspectContacts] = useState([]);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null)
  const [options, setOptions] = useState([]);
  const vist_id = sessionStorage.getItem("visitor_id");


  useEffect(() => {
    const fetchPlatFormData = async () => {
      try {
        const platFormResponse = await fetch(
          `${apiUrl}/cy_ma_suspect_platforms_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: "1725993564",
              "visitor_token":vist_id,
              "qtion_id":"66f653d914bc5",
            }),
          }
        );

        if (!platFormResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const platFormData = await platFormResponse.json();
        console.log(platFormData);
        setOptions(
          platFormData.resp.suspect_platforms_list.map((bank,index) => ({
            id: String.fromCharCode(65 + index),
            value: bank.splat_uniq,
            label: bank.splat_nm,
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
    setSuspectContacts((prevSelectedCalls) => {
      const updatedCalls = prevSelectedCalls.includes(option.value)
        ? prevSelectedCalls.filter((call) => call !== option.value)
        : [...prevSelectedCalls, option.value];

      // Save data after state update
      onSuspectContactSelected(updatedCalls);
      //saveDataToAPI(updatedCalls);
      return updatedCalls;
    });

    if (suspectContacts.includes(option.value)) {
      setSuspectContacts(suspectContacts.filter((contact) => contact !== option.value));
    } else {
      setSuspectContacts([...suspectContacts, option.value]);
    }
  };



  // const handleOptionClick = (option, e) => {
  //   e.preventDefault();
  //   if (option.disabled) {
  //     return; // Ignore clicks on disabled options
  //   }
  //   setShowOkButton(true); // Show the OK button after a successful click
  //   setError("");

  //   setSelectedCalls((prevSelectedCalls) => {
  //     const updatedCalls = prevSelectedCalls.includes(option.label)
  //       ? prevSelectedCalls.filter((call) => call !== option.label)
  //       : [...prevSelectedCalls, option.label];

  //     // Save data after state update
  //     onSuspectCallSelected(updatedCalls);
  //     saveDataToAPI(updatedCalls);
  //     return updatedCalls;
  //   });
  // };

  const saveDataToAPI = async (selectedContacts) => {
    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_add_multichoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "api_key":"1725993564",
           "visitor_token":vist_id,
           "qtion_id":"66f653d914bc5",
           "qtion_num":"5c",
           "qtion_option": ["a","b","c","d","e"],
           "option_val":selectedContacts,
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

  const handleOkClick = async(e) => {
    e.preventDefault();
    if (suspectContacts.length > 0) {
      await saveDataToAPI(suspectContacts);
      onSuspectContactSelected(suspectContacts);
      onNext(14); // Notify parent component to move to the next question
      onQuestion("15")
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  // const options = [
  //   { id: "A", label: "WhatsApp" },
  //   { id: "B", label: "Telegram" },
  //   { id: "C", label: "Instagram" },
  //   { id: "D", label: "Facebook" },
  //   { id: "E", label: "Skype" },
  //   { id: "F", label: "Snap Chat" },
  // ];

  return (
    <div className="question">
      <div style={{ display: "flex",flexDirection:'column'}}>
        <div style={{ display: "flex", flexDirection:'column',alignItems:'center' }}>
          <h2>Through which platform(s) did the suspect communicate with you?</h2>
          <div  className="option-list">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  suspectContacts.includes(option.value) ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: suspectContacts.includes(option.value)
                        ? "#000"
                        : "#fff",
                      color: suspectContacts.includes(option.value) ? "#fff" : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {suspectContacts.includes(option.value) && (
                  <span className="checkmark">&#10003;</span>
                )}
              </button>
            ))}
          </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {showOkButton && (
              <>
                <button
                  type="button"
                  className="ok-btn"
                  onClick={handleOkClick}
                  style={{marginLeft:"300px"}}
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

export default SuspectContact;
