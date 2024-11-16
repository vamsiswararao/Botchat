import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PopupBoxComponent from "../PopupBoxComponent";
import appVersion from "../../version";
import CloudComponent from "../CloudComponent";
import Cloud from "../Cloud";
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_AUTH_TOKEN;

const Help = ({ vist_id }) => {
  const [help, setHelp] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [number, setNumber] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  const app_ver = appVersion.app_ver;

  const handleHelpOptionClick = async (option, e) => {
    e.preventDefault();
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    }
    setHelp(option.id);
    // console.log(vist_id)
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
    // console.log(vist_id);
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_help_request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          api_key: apiKey,
          visitor_token: vist_id,
          qtion_id: "66f6524562171",
          qtion_num: "0",
          qtion_option: option.id,
          option_val: option.value,
          app_ver: app_ver,
        }),
      });
      const data = await response.json();
      //console.log(data.resp)
      setResponseStatus(data);
      //console.log(data);
      if (!response.ok) {
        throw new Error("Failed to push data to API");
      }
      setNumber(data.resp.comp_mob);
      //console.log("Data pushed to RequestBin:", option.id);
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    if (help) {
      if (help === "A") {
        if (responseStatus.resp.error_code === "0") {
          sessionStorage.setItem("access_id", "65437890753690647985");
          navigate("/login", { replace: true, state: { number: number } });
        }
      } else if (help === "B") {
        setShowModal(true);
        //window.location.href = "https://www.cybercrime.gov.in/"; // Redirect to external URL
      }
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  const handleModalOkClick = () => {
    setShowModal(false);
    window.location.href =
      "https://www.cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx"; // Redirect to external URL
  };

  const helpOptions = [
    {
      id: "A",
      value: "670fce3010e33775926208",
      label: "I lost money",
    },
    {
      id: "B",
      value: "670fce44708f0764144307",
      label: "I did not lose money",
    },
    // { id: "C", label: " Do you want to know the status of the complaint?", disabled: true }, // Option C is disabled
  ];

  return (
    <div className="questionss">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{marginTop:'60px'}}>
          <h2 style={{ marginLeft: "12px",textAlign:'center',marginBottom:'-15px' }}>Are you a Cyber Victim? </h2>
          <p style={{textAlign:'center',marginBottom:'25px'}}>Select one of these</p>
          <div className="options-container">
            {helpOptions.map((option) => (
              <button
                style={{
                  opacity: option.disabled ? 0.5 : 1, // Make the disabled option semi-transparent
                  cursor: option.disabled ? "not-allowed" : "pointer", //
                }}
                key={option.id}
               
                className={`option-buttons   ${
                  help === option.id ? "selected" : ""
                } ${option.disabled ? "disabled" : ""}`}
                onClick={(e) => handleHelpOptionClick(option, e)}
                disabled={option.disabled} // Disable the button if the option is disabled
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: help === option.id ? "#000" : "#fff",
                      color: help === option.id ? "#fff" : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label" style={{textAlign:'start'}}>{option.label}</div>
                </div>
                {help === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
            <div
              style={{
                position: "fixed",
                bottom: "0",
                left: "0",
                zIndex:'0'
              }}
            >
              <CloudComponent />
            </div>

            <div
              style={{
                position: "fixed",
                bottom: "0",
                right: "0",
                zIndex:'0'
              }}
            >
              <Cloud />
            </div>

            {/* <img         style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          zIndex: '1000', // Make sure it's above other elements
         height:'100px'
        }} src="\images\cloud.png" alt="cloud"/> */}
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {showOkButton && (
            <>
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                OK
              </button>
              {/* <p className="enter-text">
                    press <strong>Enter ↵</strong>
                  </p> */}
            </>
          )}
        </div>
        <p style={{ fontSize: "14px", position: "fixed", bottom: "0" }}>
          Version : {app_ver}
        </p>
      </div>

      {responseStatus &&
        responseStatus.resp &&
        responseStatus.resp.error_code === "105" && (
          <PopupBoxComponent responseStatus={responseStatus} />
        )}
      {showModal && (
        <div className="modal" style={{ zIndex: "1000" }}>
          <div className="modal-content">
            <h2>
              For non-financial complaints, you have been redirecting to the
              National Cyber Crime Portal
            </h2>
            <button className="ok-btn" onClick={handleModalOkClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;
