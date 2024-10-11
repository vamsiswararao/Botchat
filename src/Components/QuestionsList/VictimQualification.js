import { useEffect, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const VictimQualification = ({
  onNext,
  onVictimQualificationSelected,
  onQuestion,
}) => {
  const [qualification, setQualification] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const vist_id = sessionStorage.getItem("visitor_id");

  //  const options =[

  //   {id: "A",value: '66d6ccc4e6961933219940', label: 'Below SCC'},
  //   {id: "B",value: '66d6ccce6e54a847694706', label: 'Graduate'},
  //   {id: "C",value: '66d6ccda11170737124484', label: 'Ph.D'},
  //   {id: "D",value: '66d6ccecddbb9019941567', label: 'Post' },
  //   {id: "E",value: '66d6ccf1aba5f827154769', label: 'SSC'},
  //   {id: "F",value: '66d6ccfc60298363262200', label: 'Un-Educated'},
  //   {id: "G",value: '66d6cd0590d81293768518', label: 'Under Graduate'}
  // ]

  useEffect(() => {
    const fetchQulificationData = async () => {
      try {
        const qulificationResponse = await fetch(
          `${apiUrl}/cy_ma_edu_qulfs_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: "1725993564",
              visitor_token: vist_id,
              qtion_id: "66f6536277ea3",
            }),
          }
        );

        if (!qulificationResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const qulificationData = await qulificationResponse.json();
        console.log(qulificationData);
        if (qulificationData.resp.error_code === "0") {
          setOptions(
            qulificationData.resp.edu_qulfs_list.map((qulification, index) => ({
              id: String.fromCharCode(65 + index),
              value: qulification.edqf_uniq,
              label: qulification.edqf_nm,
            })) || []
          );
        }
        //console.log(toData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQulificationData();
  }, []);

  const handleOptionClick = async (option, e) => {
    e.preventDefault();
    setQualification(option.label); // Notify parent component about the selection
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    }
    setQualification(option.label);
    onVictimQualificationSelected(option.label);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
    onNext(8);
    onQuestion("9");
    console.log(option);
    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_add_choice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "1725993564",
          visitor_token: vist_id,
          qtion_id: "66f6536277ea3",
          qtion_num: "8",
          qtion_option: option.id,
          option_val: option.value,
        }),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error("Failed to push data to API");
      }

      console.log("Data pushed to RequestBin:", option.id);
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
    onVictimQualificationSelected(qualification);
    if (qualification) {
      onNext(8);
      onQuestion("9");
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  return (
    <div className="question">
      <div style={{ display: "flex", flexDirection:'column'}}>
        <div style={{ display: "flex",flexDirection:'column', justifyContent:'center',alignItems:'center' }}>
          <h2>What is your (victim) educational qualification?</h2>
          <div className="option-list">
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
        </div>
        <div style={{ display: "flex", alignItems: "center" }} className="btns-ok">
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
export default VictimQualification;
