import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const VictimQualification = ({
  onNext,
  onVictimQualificationSelected,
  onQuestion,
  answer,apiKey,botToken,vist_id,app_ver
}) => {
  const [qualification, setQualification] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  //const vist_id = sessionStorage.getItem("visitor_id");
  useEffect(() => {
    const storedData = localStorage.getItem('qualification');
    if (storedData) {
      setQualification(JSON.parse(storedData));
      onVictimQualificationSelected(JSON.parse(storedData));
    }
  }, []);



  useEffect(() => {
    const fetchQulificationData = async () => {
      try {
        const qulificationResponse = await fetch(
          `${apiUrl}/v1/cy_ma_edu_qulfs_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f6536277ea3",
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
          setOptions(
            qulificationData.resp.edu_qulfs_list.map((qulification, index) => ({
              id: String.fromCharCode(65 + index),
              value: qulification.edqf_uniq,
              label: qulification.edqf_nm,
            })) || []
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQulificationData();
  }, [apiKey,app_ver,botToken,vist_id]);

  const handleOptionClick = async (option, e) => {
    e.preventDefault();
    setQualification(option.label); // Notify parent component about the selection
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
          qtion_id: "66f6536277ea3",
          qtion_num: "8",
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
        setQualification(option.label);
        onVictimQualificationSelected(option.label);
        setShowOkButton(true); // Show the OK button after a successful click
        onNext(9);
        onQuestion(10);
        localStorage.setItem('qualification', JSON.stringify(option.label));
        setError("");
      }else{
        setError("Failed to push data to API");
      }

    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
    onVictimQualificationSelected(qualification);
    if (qualification) {
      onNext(9);
      onQuestion(10);
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  return (
    <div className="question">
      <div style={{ display: "flex", flexDirection:'column'}}>
        <div style={{ display: "flex",flexDirection:'column' }}>
          <h2>Educational Qualification <span style={{ color: "red" }}>*</span> </h2>
          <div className="option-list"  style={{position :"relative", zIndex:'9'}}>
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  qualification === option.label ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        qualification === option.label
                          ? "#000"
                          : "#fff",
                      color:
                        qualification === option.label ? "#fff" : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {qualification === option.label && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div style={{ display: "flex",position:'relative', zIndex:'1000'}} >
            {showOkButton && (
              <>
                <button
                  type="button"
                  className="ok-btn"
                  onClick={handleOkClick}
                >
                  OK
                </button>
              </>
            )}
          </div>
        </div>
          {error && <div className="error-message" style={{ position: 'relative', zIndex: '1000' }}>{error}</div>}
          {answer[8] && (
              <p className="alert-box alert" >
                Please answer the current question before moving to the next.
              </p>
            )} 
      </div>
    </div>
  );
};
export default VictimQualification;
