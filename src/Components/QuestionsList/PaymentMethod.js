import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";

const PaymentMethod = ({ onNext, onPaymentMethodSelected }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedBank(selectedOption);
  };

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    setPaymentMethod(option.id);
    console.log(option.id)
    if (option.id !== "A" && option.id !== "") {
      handleOkClick()
    }
    setShowOkButton(true); // Hide the OK button after successful click
    setError("");
  };

  const handleOkClick = () => {
    console.log("Selected Option:", paymentMethod);
    if (paymentMethod === "A") {
      console.log("Selected Bank:", selectedBank);
    }

    const data = {
      paymentMethod,
      selectedBank: selectedBank,
    };

    onPaymentMethodSelected(data);
    console.log("Data to be sent:", data);
    onNext(5);
    if (paymentMethod) {
      console.log("Selected Option:", paymentMethod);
      onNext(5);
      // Proceed with the next steps
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after successful click
        
    }
  };

  const customSelectStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%", // Adjust the width as needed
    }),
  };

  const banks = [
    { value: "Bank1", label: "SBI" },
    { value: "Bank2", label: "HDFC" },
    { value: "Bank3", label: "ICICI" },
    { value: "Bank4", label: "AXIS" },
    { value: "Bank5", label: "UNION" },
  ]; // Replace with actual bank names

  const options = [
    {
      id: "A",
      label: "UPI-related fraud ",
    },
    { id: "B", label: "E-Wallet related fraud" },
    { id: "C", label: "Debit/credit fraud/ Sim swap fraud" },
    { id: "D", label: "Internet banking-related fraud" },
    { id: "E", label: "Demat / depository fraud" },
    { id: "F", label: "Business email compromise/email takeover" },
    { id: "G", label: "Aadhar enable payment system [AEPS]" },
    { id: "H", label: "others" },
  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">4/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div>
          <h2>How did you send the amount (Payment Method)? </h2>
          <div className="options-container">
            {options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  paymentMethod === option.id ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor:
                        paymentMethod === option.id
                          ? "rgb(62, 87, 255)"
                          : "#fff",
                      color: paymentMethod === option.id ? "#fff" : "#3E57FF",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {paymentMethod === option.id && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
            {paymentMethod === "A" && (
              <div className="dropdown-container">
                <p className="bank-para" htmlFor="bank-select">
                  Bank Name :
                </p>
                <div className="select-container">
                  <Select
                    id="bank-select"
                    value={selectedBank}
                    onChange={handleChange}
                    options={banks}
                    placeholder="Type to search..."
                    aria-label="Police Station"
                    styles={customSelectStyles}
                  />
                </div>
              </div>
            )}

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
    </div>
  );
};

export default PaymentMethod;
