import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const VictimQualification = ({ onNext,onVictimQualificationSelected }) => {
  const [qualification, setQualification] = useState(null);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleOptionClick = async(option,e) => {
    e.preventDefault();
    setQualification(option.label); // Notify parent component about the selection
    handleOkClick() 
    if (option.disabled) {
      return; // Ignore clicks on disabled options
    } 
    setQualification(option.label);
    onVictimQualificationSelected(option.label);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
    handleOkClick()
    try {
      const response = await fetch("https://enrbgth6q54c8.x.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOption: option.label }),
      });

      if (!response.ok) {
        throw new Error("Failed to push data to API");
      }

      console.log("Data pushed to RequestBin:", option.id);
    } catch (err) {
      console.error("Error sending data to API:", err);
    }
  };

  const handleOkClick = (e) => {
  onVictimQualificationSelected(qualification)
  onNext(12);
      if (qualification) {
        onNext(12);
      } else {
        setError("Please select an option before proceeding.");
        setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
      }
  };

  const options = [
    {
      id: "A",
      label: " 10th",
    },
    { id: "B", label: "intermediate" },
    { id: "C", label: "Degree/Engineering/MBBS" },
    { id: "D", label: "Post-Graduation" },
    { id: "E", label: "Others" },

  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">6e/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>What is your (victim) educational qualification?</h2>
          <div>
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  qualification === option.label ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option,e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        qualification === option.label
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: qualification === option.label ? "#fff" : "#3E57FF",
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
            </div>
        </div>
      </div>
    </div>
  );
};
export default VictimQualification;
