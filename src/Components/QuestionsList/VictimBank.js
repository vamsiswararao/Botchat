import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaLongArrowAltRight } from "react-icons/fa";

const VictimBank = ({ onNext, onSuspectBankSelected }) => {
  const [formData, setFormData] = useState({
    BankName: "",
    AccountNo: "",
    TransactionNo: "",
    UpiId: "",
    CardNo: "",
    Date: "",
    Amount: "",
  });

  const [banks, setBanks] = useState([]);
  const [upis, setUpis] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Dummy API calls to fetch Bank, UPI, and Card options
    const fetchBanks = async () => {
      // Replace this with an actual API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(["Bank A", "Bank B", "Bank C"]), 1000)
      );
      setBanks(response.map((bank) => ({ value: bank, label: bank })));
    };

    const fetchUpis = async () => {
      // Replace this with an actual API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(["UPI A", "UPI B", "UPI C"]), 1000)
      );
      setUpis(response.map((upi) => ({ value: upi, label: upi })));
    };

    const fetchCards = async () => {
      // Replace this with an actual API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(["Card A", "Card B", "Card C"]), 1000)
      );
      setCards(response.map((card) => ({ value: card, label: card })));
    };

    fetchBanks();
    fetchUpis();
    fetchCards();
  }, []);

  const handleSelectChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleTextChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    onSuspectBankSelected(formData);
    onNext(18); // Notify parent component to move to the next step
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Share the Victim (Deditors) transition details? *</h2>

          <p className="bank-para">Bank Name:</p>
          <Select
            value={banks.find((bank) => bank.value === formData.BankName)}
            onChange={(selectedOption) => handleSelectChange("BankName", selectedOption)}
            options={banks}
            className="dropdown-input"
            placeholder="Select Bank"
          />

          <p className="bank-para">UPI:</p>
          <Select
            value={upis.find((upi) => upi.value === formData.UpiId)}
            onChange={(selectedOption) => handleSelectChange("UpiId", selectedOption)}
            options={upis}
            className="dropdown-input"
            placeholder="Select UPI"
          />

          <p className="bank-para">Card Number:</p>
          <Select
            value={cards.find((card) => card.value === formData.CardNo)}
            onChange={(selectedOption) => handleSelectChange("CardNo", selectedOption)}
            options={cards}
            className="dropdown-input"
            placeholder="Select Card"
          />
         <div className="date">
          <p className="bank-para">Date:</p>
          <input
            type="date"
            value={formData.Date}
           style={{height:'25px'}}
            onChange={(e) => handleTextChange("Date", e.target.value)}
          />

          <p className="bank-para">Amount:</p>
          <input
            type="number"
            value={formData.Amount}
            onChange={(e) => handleTextChange("Amount", e.target.value)}
            placeholder="Enter the amount"
            className="text-input"
              min="0"         />
        </div>
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
