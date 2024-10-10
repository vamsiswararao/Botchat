import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

const Profession = ({
  onNext,
  onVictimProfessionSelected,
  onQuestion,
  answer,
}) => {
  const [Profession, setProfession] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [professionOptions, setProfessionOptions] = useState([]);
  const vist_id = sessionStorage.getItem("visitor_id");

  // const options= [ {id: "A",value: '66669b511d028', label: 'Business' },

  // {id: "B",value: '66669b511d567', label: 'Farmer' },

  // {id: "C",value: '66669b511da3a', label: 'Govt Employee' },

  // {id: "D",value: '66669b511dd12', label: 'House Wife' },

  // {id: "E",value: '66669b511e070', label: 'Private Employee'},

  // {id: "F",value: '66669b511e36d', label: 'Self Employee' },

  // {id: "G",value: '66669b511e596', label: 'Senior Citizen'},

  // {id: "H",value: '66669b511e8eb', label: 'Software/IT Corporate Employee'},

  // {id: "I",value: '66669b511ebbe', label: 'Student'},

  // {id: "J",value: '66669b511efb0', label: 'Un-Employee'}
  //  ]
  useEffect(() => {
    const fetchProfessionData = async () => {
      try {
        const qulificationResponse = await fetch(
          `${apiUrl}/cy_ma_profesion_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: "1725993564",
              visitor_token: vist_id,
              qtion_id: "66f65342db514",
            }),
          }
        );

        if (!qulificationResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const qulificationData = await qulificationResponse.json();
        console.log(qulificationData);
        if (qulificationData.resp.error_code === "0") {
          setProfessionOptions(
            qulificationData.resp.profesion_list.map((profession, index) => ({
              id: String.fromCharCode(65 + index),
              value: profession.prof_uniq,
              label: profession.prof_nm,
            })) || []
          );
        }
        //console.log(toData.resp.aud_data);
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
    setProfession(option.label);
    handleOkClick();
    onVictimProfessionSelected(option.label);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
    onNext(7);
    onQuestion("8");
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
          qtion_id: "66f65342db514",
          qtion_num: "4c",
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
    if (Profession) {
      onNext(7);
      onQuestion("8");
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  // const options = [
  //   {
  //     id: "A",
  //     label: "Business",
  //   },
  //   { id: "B", label: "Farmer" },
  //   { id: "C", label: "Govt Employee" },
  //   {
  //       id: "D",
  //       label: "House Wife",
  //     },
  //     { id: "E", label: "Private Employee" },
  //     { id: "F", label: "Self Employee" },
  //     { id: "G", label: "Senior Citizen" },
  //     { id: "H", label: "Software/IT Corporate Employee" },
  //     { id: "I", label: "Student" },
  //     { id: "I", label: "Un-Employee" },

  //   ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div>
          <h2>What is your (victim) profession? </h2>
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
            {error && <div className="error-message">{error}</div>}
            {answer[6] && (
              <p className="alert-box">
                Please answer the current question before moving to the next.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profession;
