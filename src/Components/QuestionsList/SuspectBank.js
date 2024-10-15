import React, { useState, useEffect } from "react";
import Select from "react-select";
const apiUrl = process.env.REACT_APP_API_URL;


const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "450px",
    height: "24px",
    "@media (max-width: 768px)": {
      // Mobile view adjustments
      width: "90%",
    },
  }),
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
    color: "#004999",
    "@media (max-width: 768px)": {
      // Mobile view adjustments
      fontSize: "12px",
    },
    
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px", // Adjust selected value font size
    marginBottom: "0px",
    color: "#004999",
    
  }),
  input: (base) => ({
    ...base,
    padding: "0px",
  }),
};

const banks = [
  { value: "66d6e36507409502644872", label: "Bank" },
  { value: "66d6e3794d948034147381", label: "Merchant" },
  { value: "66d6e36eddd3a195931539", label: "Wallet" },
];

const SuspectBank = ({
  onNext,
  onSuspectBankSelected,
  addSuspectBank,
  index,
  onQuestion,
  onNextPage,
  apiKey 
}) => {
  const [suspectBankData, setSuspectBankData] = useState([]);
  const [SuspectFormData, setSuspectFormData] = useState({
    transferType: "",
    bank: "",
    acc_no: "",
    Wallet: "",
    trans_id: "",
    date: "",
    amt: "",
  });

  const [bankOption, setBankOptions] = useState([]);
  const [merchantOption, setMerchantOptions] = useState([]);
  const [walletOption, setWalletOptions] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [error, setError] = useState("");
  const vist_id = sessionStorage.getItem("visitor_id");

  const parseDate = (formattedDateTime) => {
    const [date, time] = formattedDateTime.split("T");
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year} ${time}`;
  };
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setSuspectFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const storedDistrict = localStorage.getItem('formSuspectData');
    if (storedDistrict) {
      setSuspectFormData((prev) => ({ ...prev, ...JSON.parse(storedDistrict) }));
    }
  }, []);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const BankResponse = await fetch(
          `${apiUrl}/cy_ma_bank_wlet_pg_pa_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f6545af3d6e",
            }),
          }
        );

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch bank options");
        }

        const BankData = await BankResponse.json();
        setBankOptions(
          BankData.resp.bank_wlet_pg_pa_list.map((bank) => ({
            value: bank.bwpa_uniq,
            label: bank.bwpa_nm,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchMerchantData = async () => {
      try {
        const BankResponse = await fetch(`${apiUrl}/cy_ma_merchants_list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            visitor_token: vist_id,
            qtion_id: "66f6545af3d6e",
          }),
        });

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch Merchant options");
        }

        const BankData = await BankResponse.json();
        setMerchantOptions(
          BankData.resp.merchants_list.map((bank) => ({
            value: bank.mrchnt_uniq,
            label: bank.mrchnt_nm,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchWalletData = async () => {
      try {
        const BankResponse = await fetch(`${apiUrl}/cy_ma_wlet_pg_pa_list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            visitor_token: vist_id,
            qtion_id: "66f6545af3d6e",
          }),
        });

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch Wallet options");
        }

        const BankData = await BankResponse.json();
        setWalletOptions(
          BankData.resp.wlet_pg_pa_list.map((bank) => ({
            value: bank.wpa_uniq,
            label: bank.wpa_nm,
          })) || []
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBankData();
    fetchMerchantData();
    fetchWalletData();
  }, []);

  const handleSelectChange = (id,selectedOption) => {

    setSuspectFormData((prev) => ({
      ...prev,
      [id]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSelectTypeChange = (id,selectedOption) => {
   setSuspectFormData((prev) => {
    const updatedFormData = {
      ...prev,
      [id]: selectedOption ? selectedOption.value : "",
    };
    localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData)); // Save to localStorage
    return updatedFormData;
  });
  };



  const handleTextChange = (id, value) => {
    let updatedFormData;

    if (id === "acc_no") {
      // Regex to allow alphanumeric characters and spaces, max 50 characters
      if (/^[a-zA-Z0-9\s]*$/.test(value) && value.length <= 50) {
        

        updatedFormData = {
          ...SuspectFormData,
          [id]: value,
        };
        setSuspectFormData(updatedFormData);
        localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData));
        if (value.length < 10) {

          setError("Account number must be at least 10 characters long.");
        } else {
          setError(""); // Reset error if input is valid
        }
      } else {
        if (value.length > 50) {
          setError("Account number must be less than 50 characters.");
        } else {
          setError(
            "Account number can only contain letters, numbers, and spaces."
          );
        }
      }
    } else if (id === "trans_id") {
      // Regex to allow alphanumeric characters and spaces, max 100 characters
      if (/^[a-zA-Z0-9\s]*$/.test(value) && value.length <= 50) {
        updatedFormData = {
          ...SuspectFormData,
          [id]: value,
        };
        setSuspectFormData(updatedFormData);
        localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData));
        if (value.length < 10) {
          setError("Transaction number must be at least 10 characters long.");
        } else {
          setError(""); // Reset error if input is valid
        }
      } else {
        if (value.length > 50) {
          setError("Transaction number must be less than 50 characters.");
        } else {
          setError(
            "Transaction number can only contain letters, numbers, and spaces."
          );
        }
      }
    } else if (id === "amt") {
      // Allow only numbers and dot (for decimal), validate input before updating state
      if (/^\d*\.?\d*$/.test(value)) {
        updatedFormData = {
          ...SuspectFormData,
          [id]: value,
        };
        setSuspectFormData(updatedFormData);
        localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData));
        setError(""); // Reset error if input is valid
      } else {
        setError("Amount can only contain numbers and a decimal point.");
      }
    } else {
      // Handle other fields if necessary
      updatedFormData = {
        ...SuspectFormData,
        [id]: value,
      };
      setSuspectFormData(updatedFormData);
      localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData));
      setError(""); // Reset error for other fields
    }
  };

  const handleOkClick = async (e) => {
    e.preventDefault();
    if (!SuspectFormData.transferType) {
      setError("Please fill in the transferType.");
      return;
    }
    if (!SuspectFormData.acc_no) {
      setError("Please Enter the AccountNo Bank(Wallet/PG/PA)/Merchant.");
      return;
    }
    if (!SuspectFormData.amt) {
      setError("Please fill in the Amount.");
      return;
    }
    if (!SuspectFormData.date) {
      setError("Please select in the date.");
      return;
    }

    try {
      // Send the data to the dummy API
      const response = await fetch(`${apiUrl}/ccrim_bot_add_susp_trans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          visitor_token: vist_id,
          qtion_id: "66f6545af3d6e",
          qtion_num: "15",
          mtfr_uni: SuspectFormData.transferType,
          bwpa_uni: SuspectFormData.bank,
          acc_no: SuspectFormData.acc_no,
          trans_id: SuspectFormData.transaction_no,
          amt: SuspectFormData.amt,
          trans_dtm: "10-10-2024 16:21:00",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      const responseData = await response.json();
      console.log("Form data submitted successfully:", responseData);

      // If successful, add the data to the victimBankData list and show options
      onNext(16); // Move to the next step
      onQuestion(17);
    } catch (error) {
      console.error("Error submitting form data:", error);
      setError("Failed to submit form data. Please try again.");
    }
    setError("");
    setSuspectBankData((prevData) => [...prevData, SuspectFormData]);
  };

  const handleAddPageClick = (e) => {
    e.preventDefault();
    handleOkClick()
    addSuspectBank(pageCount);
    setPageCount((prevCount) => prevCount + 1); // Add another form
    setSuspectFormData({
      transferType: "",
      bank: "",
      acc_no: "",
      merchant: "",
      Wallet: "",
      trans_id: "",
      date: "",
      amt: "",
    });
    const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as per your design
    const scrollAmount = isMobile
      ? window.innerHeight
      : window.innerHeight * 1.3; // Adjust scrolling based on view
    // Perform smooth scroll
    window.scrollBy({ top: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="question">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // width:'650px'
            }}
          >
            <h2 className="suspect-bank">
              Please provide creditor/ fraudster’s bank account details(if you
              have)
            </h2>
          </div>
          <div className="option-list">
            <p className="bank-para">
              Money Transfer:<span style={{ color: "red" }}>*</span>
            </p>
            <Select
              value={banks.find((bank) => bank.value === SuspectFormData.BankName)}
              onChange={(selectedOption) =>
                handleSelectTypeChange("transferType", selectedOption)
              }
              options={banks}
              className="dropdown-input"
              placeholder="Select..."
              styles={customStyles} // Apply custom styles
            />

            <p className="bank-para" style={{ marginTop: "20px" }}>
              Bank(Wallet/PG/PA)/Merchant:
              <span style={{ color: "red" }}>*</span>
            </p>
            <Select
              value={
                SuspectFormData.transferType === "66d6e36507409502644872"
                  ? bankOption.find(
                      (Bank) => Bank.value === SuspectFormData.bank
                    ) || null
                  : SuspectFormData.transferType === "66d6e3794d948034147381"
                  ? merchantOption.find(
                      (Merchant) => Merchant.value === SuspectFormData.bank
                    ) || null
                  : SuspectFormData.transferType === "66d6e36eddd3a195931539"
                  ? walletOption.find(
                      (Wallet) => Wallet.value === SuspectFormData.bank
                    ) || null
                  : null // For empty transferType, no value selected
              }
              onChange={(selectedOption) => {
                if (SuspectFormData.transferType === "66d6e36507409502644872") {
                  handleSelectChange("bank", selectedOption);
                } else if (SuspectFormData.transferType === "66d6e3794d948034147381") {
                  handleSelectChange("bank", selectedOption);
                } else if (SuspectFormData.transferType === "66d6e36eddd3a195931539") {
                  handleSelectChange("bank", selectedOption);
                }
              }}
              options={
                SuspectFormData.transferType === "66d6e36507409502644872"
                  ? bankOption
                  : SuspectFormData.transferType === "66d6e3794d948034147381"
                  ? merchantOption
                  : SuspectFormData.transferType === "66d6e36eddd3a195931539"
                  ? walletOption
                  : [] // No options for empty transferType
              }
              className="dropdown-input"
              placeholder={
                SuspectFormData.transferType === ""
                  ? "Select The Money Transfer First"
                  : "Select..."
              }
              isDisabled={!SuspectFormData.transferType} // Disable if transferType is empty
              styles={customStyles} // Apply custom styles
            />

            <p className="bank-para" style={{ marginTop: "20px" }}>
              Account No./(Wallet/PG/PA)id/Merchant id:
              <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="text"
              className="text-input account"
              name="acc_no"
              value={SuspectFormData.acc_no}
              onChange={(e) => handleTextChange("acc_no", e.target.value)}
              autoComplete="off"
            />
            <p className="bank-para">Transaction id/UTR Number:</p>
            <input
              type="text"
              className="text-input account"
              onChange={(e) => handleTextChange("trans_id", e.target.value)}
              value={SuspectFormData.trans_id}
            />
            <p>
              Amount:<span style={{ color: "red" }}>*</span>
            </p>
            <span className="rupee-symbol">₹</span>
            <input
              type="text"
              value={SuspectFormData.amt}
              onChange={(e) => handleTextChange("amt", e.target.value)}
              placeholder="Amount"
              className="text-input amount"
              min="0"
              autoComplete="off"
            />
            <div style={{ display: "flex" }}>
              <p>
                Transaction Date:<span style={{ color: "red" }}>*</span>
              </p>
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
                  className="date-time-input"
                  value={SuspectFormData.date ? parseDate(SuspectFormData.date) : ""}
                />
                <input
                  type="datetime-local"
                  name="date"
                  className="date-time-label"
                  value={SuspectFormData.date}
                  onChange={(e) => handleDateChange(e)}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", marginTop: "20px" }}
          className="suspect-btns"
        >
          <button
            type="button"
            className="next-page-btn"
            onClick={handleOkClick}
          >
            Go To Next Question
          </button>
          <button onClick={handleAddPageClick} className="add-page-btn">
            Add Another Transaction
          </button>
        </div>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SuspectBank;
