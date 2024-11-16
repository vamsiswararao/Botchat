import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const SuspectCall = ({
  onNext,
  onSuspectCallSelected,
  onQuestion,
  apiKey,
  botToken,
  vist_id,
  app_ver,
  onPhoneNumber,
  answer,
}) => {
  const [suspectContacts, setSuspectContacts] = useState({
    contactValues: [],
    contactIds: [],
  });
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [previousSelectedContacts, setPreviousSelectedContacts] =
    useState(null);
  const [previousSelectedPhone, setPreviousSelectedPhone] = useState([]);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const storedSuspectCall = localStorage.getItem("suspectCall");
    if (storedSuspectCall) {
      const storedContacts = JSON.parse(storedSuspectCall);
      setSuspectContacts(storedContacts);
      onSuspectCallSelected(storedContacts);
      setPreviousSelectedContacts(storedContacts);
    }

    const storedPhoneNumbers = localStorage.getItem("phoneNumbers");
    if (storedPhoneNumbers) {
      setPhoneNumbers(JSON.parse(storedPhoneNumbers));
      setPreviousSelectedPhone(storedPhoneNumbers);
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
              app_ver: app_ver,
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
            mob_req: bank.mob_req,
            mob_show: bank.mob_show,
            mob_typ: bank.mob_typ,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlatFormData();
  }, [apiKey, app_ver, botToken, vist_id]);

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    setShowOkButton(true);
    setError("");

    setSuspectContacts((prevContacts) => {
      let updatedContacts;
      let updatedPhoneNumbers = [...phoneNumbers]; // Make a copy of phone numbers

      if (prevContacts.contactValues.includes(option.value)) {
        // If deselecting, remove the phone number from the array
        updatedPhoneNumbers = updatedPhoneNumbers.filter(
          (phone) => phone.id !== option.value
        );

        updatedContacts = {
          contactValues: prevContacts.contactValues.filter(
            (call) => call !== option.value
          ),
          contactIds: prevContacts.contactIds.filter((id) => id !== option.id),
        };
      } else {
        updatedPhoneNumbers.push({ id: option.value, number: "" }); // Add new phone number entry

        updatedContacts = {
          contactValues: [...prevContacts.contactValues, option.value],
          contactIds: [...prevContacts.contactIds, option.id],
        };
      }

      setPhoneNumbers(updatedPhoneNumbers);
      localStorage.setItem("phoneNumbers", JSON.stringify(updatedPhoneNumbers));
      onSuspectCallSelected(updatedContacts);
      localStorage.setItem("suspectCall", JSON.stringify(updatedContacts));

      return updatedContacts;
    });
  };

  const handleOkClick = async (e) => {
    e.preventDefault();
  

    if (
      JSON.stringify(suspectContacts) !== JSON.stringify(previousSelectedContacts) ||
      JSON.stringify(phoneNumbers) !== JSON.stringify(previousSelectedPhone)
    ) {
      if (suspectContacts.contactIds.length > 0) {
        await saveDataToAPI(suspectContacts);
        setPreviousSelectedContacts(suspectContacts);
        setPreviousSelectedPhone(phoneNumbers)
      } else {
        setError("Please select an option before proceeding.");
        setShowOkButton(false);
      }
    } else {
      onNext(13);
      onQuestion(14);
    }
  };

  const saveDataToAPI = async (selectedContacts) => {
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_sus_communication`, {
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
          sus_array: phoneNumbers, // Send the entire phoneNumbers object
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const data = await response.json();
      //console.log(data)
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

  const handleInputChange = (event, optionValue, inputType,req) => {
    const inputValue = event.target.value;
    let regex = /^\d*$/;
    if (inputType === 4) regex = /.*/;
    ///^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})[/\w .-]*$/;
    if (inputType === 3) regex = /.*/;

    if (regex.test(inputValue)) {
      const updatedPhoneNumbers = phoneNumbers.map((phone) =>
        phone.id === optionValue ? { ...phone, number: inputValue } : phone
      );
      setPhoneNumbers(updatedPhoneNumbers);
      onPhoneNumber(updatedPhoneNumbers);
      localStorage.setItem("phoneNumbers", JSON.stringify(updatedPhoneNumbers));
      setError("");
    }
  };

  return (
    <div className="question">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div >
          <h2>Mode of Approach/Communication<span style={{ color: "red" }}>*</span></h2>
          <div className="call-list"  style={{position :"relative", zIndex:'9'}}>
            {options.map((option) => (
              <div key={option.id}>
                <button
                  className={`option-button ${
                    suspectContacts.contactValues.includes(option.value)
                      ? "selected"
                      : ""
                  }`}
                  onClick={(e) => handleOptionClick(option, e)}
                >
                  <div className="answer-container">
                    <div
                      className="option"
                      style={{
                        backgroundColor: suspectContacts.contactValues.includes(
                          option.value
                        )
                          ? "#000"
                          : "#fff",
                        color: suspectContacts.contactValues.includes(
                          option.value
                        )
                          ? "#fff"
                          : "#000",
                      }}
                    >
                      {option.id}
                    </div>
                    <div
                      style={{ textAlign: "start" }}
                      className="option-label"
                    >
                      {option.label}
                    </div>
                  </div>
                  {suspectContacts.contactValues.includes(option.value) && (
                    <span className="checkmark">&#10003;</span>
                  )}
                </button>
              {suspectContacts.contactValues.includes(option.value) && 
              ( option.mob_show===1&&
              (
                <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                  <p style={{ fontSize: "18px", marginLeft: "5px", marginRight:"5px" }}>
                  {option.mob_typ === 1 || option.mob_typ === 2
                        ? "Mobile:"
                        : option.mob_typ === 3
                        ? "Link:"
                        : "URL:"
                    } {option.mob_req ===1 && <span style={{color:'red'}}>*</span>}
                  </p>
                  <input
                    type={option.mob_typ === 4 ? "url" : option.mob_typ === 3 ? "text" : "tel"}
                    value={phoneNumbers.find((phone) => phone.id === option.value)?.number || ""}
                    inputMode={option.mob_typ <= 2 ? "numeric" : "text"}
                    className="text-mobile-input"
                    onChange={(e) => handleInputChange(e, option.value, option.mob_typ,option.mob_req)}
                    placeholder={
                      option.mob_typ === 1 || option.mob_typ === 2
                        ? "Enter Mobile Number"
                        : option.mob_typ === 3
                        ? "Enter Profile ID / URL"
                        : "Enter Website / URL"
                    }
                  />
                </div>
              ))}
              </div>
            ))}
          </div>
          <div
          style={{ position: "relative", zIndex: "9" }}
        >
          {showOkButton && (
            <button type="button" className="ok-btn" onClick={handleOkClick}>
              OK
            </button>
          )}
        </div>
        </div>
 
        {error && <div className="error-message" style={{ position: 'relative', zIndex: '1000' }}>{error}</div>}
        {answer[12] && (
          <p
            className="alert-box"
            style={{ position: "relative", zIndex: "1000" }}
          >
            Please answer the current question before moving to the next.
          </p>
        )}
      </div>
    </div>
  );
};

export default SuspectCall;

