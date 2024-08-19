import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const VictimBank = ({ onNext, onVictimBankSelected }) => {
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
    onVictimBankSelected(formData);
    onNext(); // Notify parent component to move to the next step
  };

  const platformOptions = [
    { id: "A", label: "Bank" },
    { id: "B", label: "UPI" },
    { id: "C", label: "Credit Card" },
  ];

  // const contactMethodOptions = [
  //   { id: "A", label: "SBI" },
  //   { id: "B", label: "HDFC" },
  // ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">8</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Share the Victim (Deditors) bank Details? *</h2>

          <p className="bank-para">Bank Name:</p>

          <input
            type="text"
            value={formData.BankName}
            onChange={(e) => handleTextChange("BankName", e.target.value)}
            placeholder="Type tour answer here..."
            className="text-input"
          />

          <p className="bank-para">Category of account:</p>
          <div>
            {platformOptions.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  formData.CategoryOfAccount === option.id ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option.id, e)}
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
            value={formData.accountNo}
            onChange={(e) => handleTextChange("contactDetails", e.target.value)}
            placeholder="Type tour answer here..."
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
            <button type="button" className="ok-btn" onClick={handleOkClick}>
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

export default VictimBank;
