import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const Profession = ({
  onNext,
  onVictimProfessionSelected,
  onQuestion,
  answer
  ,apiKey,botToken,vist_id,app_ver
}) => {
  const [Profession, setProfession] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [professionOptions, setProfessionOptions] = useState([]);
 // const vist_id = sessionStorage.getItem("visitor_id");


  useEffect(() => {
    const storedData = localStorage.getItem('Profession');
    if (storedData) {
      setProfession(JSON.parse(storedData));
      onVictimProfessionSelected(JSON.parse(storedData))
    }
  }, []);

  useEffect(() => {
    const fetchProfessionData = async () => {
      try {
        const qulificationResponse = await fetch(
          `${apiUrl}/v1/cy_ma_profesion_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f65342db514",
              lac_token: botToken,
              "app_ver":app_ver
            }),
          }
        );

        if (!qulificationResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const qulificationData = await qulificationResponse.json();
        if (qulificationData.resp.error_code === "0") {
          setProfessionOptions(
            qulificationData.resp.profesion_list.map((profession, index) => ({
              id: String.fromCharCode(65 + index),
              value: profession.prof_uniq,
              label: profession.prof_nm,
            })) || []
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfessionData();
  }, []);

  const handleOptionClick = async (option, e) => {
    e.preventDefault();
    setProfession(option.label); // Notify parent component about the selection
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    }
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_choice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          visitor_token: vist_id,
          qtion_id: "66f65342db514",
          qtion_num: "7",
          qtion_option: option.id,
          option_val: option.value,
          lac_token: botToken,
          "app_ver":app_ver
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to push data to API");
      }

      if(data.resp.error_code ==="0"){
        setProfession(option.label);
        handleOkClick();
        onVictimProfessionSelected(option.label);
        setShowOkButton(true); // Show the OK button after a successful click
        onNext(8);
        onQuestion(9);
        localStorage.setItem('Profession', JSON.stringify(option.label));
        setError("");
      }else{
        setError("Failed to push data to API");
      }
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  }; 

  const handleOkClick = (e) => {
    if (Profession) {
      onNext(8);
      onQuestion(9);
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  
  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div>
          <h2>Profession/ Occupation </h2>
          <div className="option-list">
            {professionOptions.map((option) => (
              <button
                key={option.id} 
                className={`option-button ${
                  Profession === option.label ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        Profession === option.label
                          ? "#000"
                          : "#fff",
                      color: Profession === option.label ? "#fff" : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {Profession === option.label && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center",zIndex:"1000" }}>
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
            {answer[7] && (
              <p className="alert-box">
                Please answer the current question before moving to the next.
              </p>
            )} 
        </div>
      </div>
    </div>
  );
};

export default Profession;
