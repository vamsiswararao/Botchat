import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaLongArrowAltRight } from "react-icons/fa";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "450px",
    height: "24px",
    "@media (max-width: 768px)": {
      // Mobile view adjustments
      width: "95%",
    },
  }),
  // control: (base) => ({
  //   ...base,
  //   border: "1px solid #ccc",
  //   borderRadius: "2px",
  //   boxShadow: "none",
  //   height: '100%', // Make sure control height matches container height
  //   minHeight: '20px',
  // }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Ensure dropdown is above other elements
    maxHeight: "180px", // Adjust as needed
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "180px", // Adjust as needed
    overflowY: "auto",
    fontSize: "16px",
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "36px", // Decrease height of the select control
    height: "36px", // Decrease height of the select control
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    height: "14px", // Adjust the height of the indicator separator line
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "8px", // Adjust padding around the dropdown indicator
    svg: {
      width: "18px", // Adjust the size of the dropdown arrow
      height: "18px",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    fontSize: "16px", // Adjust placeholder font size
    marginBottom: "10px",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px", // Adjust selected value font size
    marginBottom: "0px",
  }),
  input: (base) => ({
    ...base,
    padding: "0px",
  }),
};

const SuspectBank = ({
  onNext,
  onSuspectBankSelected,
  addSuspectBank,
  index,
}) => {
  const [suspectBankData, setSuspectBankData] = useState([]);
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
        setTimeout(() => resolve(["Bank", "Merchant", "Wallet"]), 1000)
      );
      setBanks(response.map((bank) => ({ value: bank, label: bank })));
    };

    const fetchUpis = async () => {
      // Replace this with an actual API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve(["SBI", "UNION", "HDFC"]), 1000)
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
    setSuspectBankData((prevData) => [...prevData, formData]);
    onNext(18); // Notify parent component to move to the next step
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">9/10 </h2>
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
            {/* <button
              type="button"
              style={{ marginLeft:"10px", width: "40px", fontSize: "20px", height: "40px" }}
              onClick={addSuspectBank}
            >
              +
            </button> */}
          </div>
          <p className="bank-para">Money Transfer:</p>
          <Select
            value={banks.find((bank) => bank.value === formData.BankName)}
            onChange={(selectedOption) =>
              handleSelectChange("BankName", selectedOption)
            }
            options={banks}
            className="dropdown-input"
            placeholder="Select Bank"
            styles={customStyles} // Apply custom styles
          />

          <p className="bank-para" style={{marginTop:'20px'}}>Bank(Wallet/PG/PA)/Merchant:</p>
          <Select
            value={upis.find((upi) => upi.value === formData.UpiId)}
            onChange={(selectedOption) =>
              handleSelectChange("UpiId", selectedOption)
            }
            options={upis}
            className="dropdown-input"
            placeholder="Select UPI"
            styles={customStyles} // Apply custom styles
          />

          <p className="bank-para" style={{marginTop:'20px'}}>Account No./(Wallet/PG/PA)id/Merchant id:</p>
          <input
            type="text"
            className="text-input account"
       
          />
          <p className="bank-para">Transaction id/UTR Number:</p>
          <input
            type="text"
            className="text-input account"

          />
          <div className="date">
            <div style={{ display: "flex" }}>
              <p > Transaction Date:</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="DD-MM-YYYY"
                  style={{
                    height: "24px",
                    width: "80px",
                    fontSize: "12px",
                  }}
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p >Amount:</p>
              <input
                type="number"
                value={formData.Amount}
                onChange={(e) => handleTextChange("Amount", e.target.value)}
                placeholder="Amount"
                className="text-input amount"
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
