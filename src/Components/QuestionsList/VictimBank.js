import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaLongArrowAltRight } from "react-icons/fa";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "450px",
    height: "24px",
    "@media (max-width: 768px)": {
      width: "95%",
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    maxHeight: "180px",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "180px",
    overflowY: "auto",
    fontSize:'16px'
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    height: "14px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "8px",
    svg: {
      width: "18px",
      height: "18px",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px",
    marginBottom: "10px",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
    marginBottom: "10px",
  }),
  input: (base) => ({
    ...base,
    padding: "0px",
  }),
};

const VictimBank = ({ onNext, onSuspectBankSelected, addVictimBank, index }) => {
  const [victimBankData, setVictimBankData] = useState([]);
  const [formData, setFormData] = useState({
    BankName: "",
    AccountNo: "",
    TransactionNo: "",
    UpiId: "",
    CardNo: "",
    datetime: "",
    Amount: "",
  });

  const [banks, setBanks] = useState([]);
  const [upis, setUpis] = useState([]);
  const [cards, setCards] = useState([]);

  const parseDateTime = (formattedDateTime) => {
    const [date, time] = formattedDateTime.split("T");
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year} ${time}`;
  };

  const handleDateTimeChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Dummy API calls to fetch Bank, UPI, and Card options
    const fetchBanks = async () => {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(["Bank A", "Bank B", "Bank C"]), 1000)
      );
      setBanks(response.map((bank) => ({ value: bank, label: bank })));
    };

    const fetchUpis = async () => {
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(["UPI A", "UPI B", "UPI C"]), 1000)
      );
      setUpis(response.map((upi) => ({ value: upi, label: upi })));
    };

    const fetchCards = async () => {
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

  const addVictim = () => {
    addVictimBank();
  };

  const handleOkClick = (e) => {
    e.preventDefault();
    setVictimBankData((prevData) => [...prevData, formData]);
    onNext(16); // Notify parent component to move to the next step
  };

  return (
    <div>
      <div className="question">
        <div style={{ display: "flex", marginTop: "50px" }}>
          <div style={{ display: "flex" }}>
            <h2 className="num">7 /10</h2>
            <FaLongArrowAltRight className="num" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2>Please provide Debtor/Victim bank account details.</h2>
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
              styles={customStyles}

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
              styles={customStyles}

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
              styles={customStyles}

            />

            <div className="date">
              <div style={{ display: 'flex' }}>
                <p className="date-para">Transaction Date :</p>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY HH:MM"
                    style={{ height: "24px", width: "100px", fontSize: "12px", marginLeft: '20px' }}
                    value={formData.datetime ? parseDateTime(formData.datetime) : ""}
                    readOnly
                  />
                  <input
                    type="datetime-local"
                    name="datetime"
                    style={{ height: "26px", width: "18px" }}
                    value={formData.datetime}
                    onChange={(e) => handleDateTimeChange(e)}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p className="amount-text-para">Amount:</p>
                <input
                  type="number"
                  value={formData.Amount}
                  onChange={(e) => handleTextChange("Amount", e.target.value)}
                  placeholder="amount"
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
    </div>
  );
};

export default VictimBank;
