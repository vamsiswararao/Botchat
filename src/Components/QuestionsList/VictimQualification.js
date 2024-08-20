import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const VictimQualification = ({ onNext,onVictimQualificationSelected }) => {
  const [qualification, setQualification] = useState(null);

  const handleOptionClick = (option,e) => {
    e.preventDefault();
    setQualification(option.label);
    // Notify parent component about the selection
  };

  const handleOkClick = (e) => {
  e.preventDefault()
  onVictimQualificationSelected(qualification)
      onNext(); // Notify parent component to move to the next question
  };

  const options = [
    {
      id: "A",
      label: " 10th",
    },
    { id: "B", label: "intermediate" },
    { id: "C", label: "Degree/Engineering/MBBS" },
    { id: "D", label: "Post-Graduation" },
  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">7e</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default VictimQualification;
