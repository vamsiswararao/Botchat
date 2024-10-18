import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import PopupBoxComponent from "../PopupBoxComponent";
import Cookies from 'js-cookie';
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_AUTH_TOKEN;


const Help = ({ onNext, onHelpSelected,onQuestion,answer }) => {
  const [help, setHelp] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  //const vist_id = sessionStorage.getItem("visitor_id");
  const [responseStatus, setResponseStatus] = useState(null);
  const vist_id= Cookies.get('visitor_id');
  
  const handleHelpOptionClick = async(option, e) => {
    e.preventDefault();
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    } 
    setHelp(option.id)
   // console.log(vist_id)
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
  
    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_help_request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          "api_key":apiKey,
          "visitor_token":vist_id,
          "qtion_id":"66f6524562171",
          "qtion_num":"0",
          "qtion_option":option.id,
          "option_val":option.value
         }),
      });
      const data = await response.json()
      setResponseStatus(data);
      //console.log(data)
      if (!response.ok) {
        throw new Error("Failed to push data to API");
      }

      //console.log("Data pushed to RequestBin:", option.id);
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    if (help) {
      if(help==="A"){
        sessionStorage.setItem("access_id", "65437890753690647985");
        navigate("/login",{ replace: true });
      }else if (help === "B") {
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
   window.location.href = "https://www.cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx"; // Redirect to external URL
  };

  const helpOptions = [
    { id: "A",value:"670fce3010e33775926208", label: "Did you lose an amount in Cybercrimes?" },
    {
      id: "B", value:"670fce44708f0764144307",
      label: "Have you faced Cybercrime in Non-financial cyber fraud?",
    },
    // { id: "C", label: " Do you want to know the status of the complaint?", disabled: true }, // Option C is disabled
  ];

  return (
    <div  style={{ marginTop:'-150px' }}>
      <div style={{ display: "flex" }}>
        <div>
          <h2>How may i help you? </h2>
          <div className="options-container">
            {helpOptions.map((option) => (
              <button
                style={{
                  opacity: option.disabled ? 0.5 : 1, // Make the disabled option semi-transparent
                  cursor: option.disabled ? "not-allowed" : "pointer", //
                }}
                key={option.id}
                className={`option-button ${
                  help === option.id ? "selected" : ""
                } ${option.disabled ? "disabled" : ""}`}
                onClick={(e) => handleHelpOptionClick(option, e)}
                disabled={option.disabled} // Disable the button if the option is disabled
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                      help === option.id ? "#000" : "#fff",
                      color:help === option.id ? "#fff" : "#000",
                    }}

                  >
                    {option.id}
                  </div>
                  <div

                    className="option-label"
                  >
                    {option.label}
                  </div>
                </div>
                {help === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
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
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
      {responseStatus && responseStatus.resp && responseStatus.resp.error_code === "105" && (
  <PopupBoxComponent responseStatus={responseStatus} />
)}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>For non-financial complaints, you have been redirecting to the National Cyber Crime Portal</h2>
            <button className="ok-btn" onClick={handleModalOkClick}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Help;
