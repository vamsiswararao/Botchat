import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaLongArrowAltRight } from "react-icons/fa";

const SuspectBank = ({ onNext, onSuspectBankSelected,addSuspectBank,index }) => {
  const [formData, setFormData] = useState({
    BankName: "",
    AccountNo: "",
    TransactionNo: "",
    UpiId: "",
    CardNo: "",
    date: "",
    Amount: "",
  });

  const [banks, setBanks] = useState([]);
  const [upis, setUpis] = useState([]);
  const [cards, setCards] = useState([]);

  const parseDate = (formattedDate) => {
    const [year, month, day] = formattedDate.split("-");
    return `${day}-${month}-${year}`;
  };
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    onNext(20); // Notify parent component to move to the next step
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">9/10  ({index+1})</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
        <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
          <h2>Share the Suspect (creditor) bank Details? *</h2>
          <button
              type="button"
              style={{ marginLeft:"10px", width: "40px", fontSize: "20px", height: "40px" }}
              onClick={addSuspectBank}
            >
              +
            </button>
            </div>
          <p className="bank-para">Bank Name:</p>
          <Select
            value={banks.find((bank) => bank.value === formData.BankName)}
            onChange={(selectedOption) =>
              handleSelectChange("BankName", selectedOption)
            }
            options={banks}
            className="dropdown-input"
            placeholder="Select Bank"
          />

          <p className="bank-para">UPI:</p>
          <Select
            value={upis.find((upi) => upi.value === formData.UpiId)}
            onChange={(selectedOption) =>
              handleSelectChange("UpiId", selectedOption)
            }
            options={upis}
            className="dropdown-input"
            placeholder="Select UPI"
          />

          <p className="bank-para">Card Number:</p>
          <Select
            value={cards.find((card) => card.value === formData.CardNo)}
            onChange={(selectedOption) =>
              handleSelectChange("CardNo", selectedOption)
            }
            options={cards}
            className="dropdown-input"
            placeholder="Select Card"
          />
          <div className="date">
          <div style={{display:'flex'}}>
            <p className="date-para">Date:</p>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <input
              type="text"
              placeholder="DD-MM-YYYY"
              style={{ height: "24px", width: "80px", fontSize: "12px",marginLeft:'20px' }}
              value={formData.date ? parseDate(formData.date) : ""}
            />
            <input
              type="date"
              name="date"
              style={{ height: "26px", width: "18px" }}
              value={formData.date ? parseDate(formData.date) : ""}
              onChange={(e) => handleDateChange(e)}
            />
            </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <p className="amount-text-para">Amount:</p>
            <input
              type="number"
              value={formData.Amount}
              onChange={(e) => handleTextChange("Amount", e.target.value)}
              placeholder="Enter the amount"
              className="text-input"
              min="0"
            />
          </div>
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

export default SuspectBank;
