import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const SuspectBank = ({ onNext, onSuspectBankSelected }) => {
  const [formData, setFormData] = useState({
    CategoryOfAccount: null,
    AccountNo: "",
    TransactionNo: "",
  });

  const handleOptionClick = (optionId,e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      CategoryOfAccount: optionId,
    }));
  };

  const handleTextChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOkClick = (e) => {
    e.preventDefault()
    onSuspectBankSelected(formData);
    onNext(); // Notify parent component to move to the next step
  };

  const CategoryOptions = [
    { id: "A", label: "Bank Name" },
    { id: "B", label: "Google Pay" },
    { id: "C", label: "BHIM" },
    { id: "D", label: "PhonePe" },
  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">9</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Share the Suspect (creditor) bank Details? *</h2>
          <p className="bank-para">Category of account:</p>
          <div>
            {CategoryOptions.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  formData.CategoryOfAccount === option.id ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option.id,e)}
                aria-label={`Select ${option.label}`}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        formData.CategoryOfAccount === option.id
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color:
                        formData.CategoryOfAccount === option.id
                          ? "#fff"
                          : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {formData.CategoryOfAccount === option.id && (
                  <span className="checkmark">&#10003;</span>
                )}
              </button>
            ))}
          </div>
          <p className="bank-para">Account NO/ Wallet No/ UPI NO:</p>
          <input
            type="text"
            value={formData.AccountNo}
            onChange={(e) => handleTextChange("contactDetails", e.target.value)}
            placeholder="Type your answer here..."
            className="text-input"
          />

          <p className="bank-para">Transaction/ RRN number:</p>
          <input
            type="text"
            value={formData.TransactionNo}
            onChange={(e) => handleTextChange("suspectName", e.target.value)}
            placeholder="Type your answer here..."
            className="text-input"
          />
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

export default SuspectBank;
