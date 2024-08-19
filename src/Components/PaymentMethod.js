import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Select from "react-select";

const PaymentMethod = ({ onNext,onPaymentMethodSelected }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    setPaymentMethod(option.id);
  };

  const handleOkClick = () => {
    console.log("Selected Option:", paymentMethod);
    if (paymentMethod === "A") {
      console.log("Selected Bank:", selectedBank);
    }

    const data = {
      paymentMethod,
      selectedBank:selectedOption
    };

    onPaymentMethodSelected(data)
    console.log("Data to be sent:", data);
    onNext();
  };

  const customSelectStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%", // Adjust the width as needed
    }),
  };

  const banks = [
    { id: "A", label: "SBI" },
    { id: "B", label: "HDFC" },
    { id: "C", label: "ICICI" },
    { id: "D", label: "AXIS" },
    { id: "E", label: "UNION" },
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
  ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">4</h2>
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
              <div className="dropdown-containe">
                <p className="bank-para" htmlFor="bank-select">
                  Bank Name :
                </p>
                <div className="select-container">
                <Select 
                  id="bank-select"
                  value={selectedOption}
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
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                ok
              </button>
              <p className="enter-text">
                press <strong>Enter ↵</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
