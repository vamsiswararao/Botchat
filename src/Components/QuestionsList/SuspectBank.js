import React, { useState, useEffect } from "react";
import Select from "react-select";
const apiUrl = process.env.REACT_APP_API_URL;

// const Data_lost=[

// {subcat_uni: '66d300879af44537699255', subcat_nm: 'UPI Related Frauds'},
// {subcat_uni: '66d300879af5f216270004', subcat_nm: 'E-Wallet Related Fraud'} ,
// {subcat_uni: '66d300879af61335355481', subcat_nm: 'Debit/Credit Card Fraud/Sim Swap Fraud'} ,
// {subcat_uni: '66d300879af63492607753', subcat_nm: 'Internet Banking Related Fraud'},
// {subcat_uni: '66d300879af64330882083', subcat_nm: 'Demat/Depository Fraud'} ,
// {subcat_uni: '66d300879af65911737531', subcat_nm: 'Business Email Compromise/Email Takeover'},
// {subcat_uni: '66d300879af67979458113', subcat_nm: 'Aadhaar Enabled Payment System(AEPS)'},
// ]

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
    color: "#004999",
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
}) => {
  const [suspectBankData, setSuspectBankData] = useState([]);
  const [formData, setFormData] = useState({
    transferType: "",
    bank: "",
    account_no: "",
    merchant: "",
    Wallet: "",
    transaction_no: "",
    date: "",
    Amount: "",
  });

  //const [banks, setBanks] = useState([]);
  const [bankOption, setBankOptions] = useState([]);
  const [merchantOption, setMerchantOptions] = useState([]);
  const [walletOption, setWalletOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [error, setError] = useState("");
  const vist_id = sessionStorage.getItem("visitor_id");

  const parseDate = (formattedDateTime) => {
    const [date, time] = formattedDateTime.split("T");
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year} ${time}:00`;
  };
  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              api_key: "1725993564",
              visitor_token: vist_id,
              qtion_id: "66f6545af3d6e",
            }),
          }
        );

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch bank options");
        }

        const BankData = await BankResponse.json();
        console.log(BankData);
        setBankOptions(
          BankData.resp.bank_wlet_pg_pa_list.map((bank) => ({
            value: bank.bwpa_uniq,
            label: bank.bwpa_nm,
          })) || []
        );
        //console.log(toData.resp.aud_data);
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
            api_key: "1725993564",
            visitor_token: vist_id,
            qtion_id: "66f6545af3d6e",
          }),
        });

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch Merchant options");
        }

        const BankData = await BankResponse.json();
        console.log(BankData);
        setMerchantOptions(
          BankData.resp.merchants_list.map((bank) => ({
            value: bank.mrchnt_uniq,
            label: bank.mrchnt_nm,
          })) || []
        );
        //console.log(toData.resp.aud_data);
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
            api_key: "1725993564",
            visitor_token: vist_id,
            qtion_id: "66f6545af3d6e",
          }),
        });

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch Wallet options");
        }

        const BankData = await BankResponse.json();
        console.log(BankData);
        setWalletOptions(
          BankData.resp.wlet_pg_pa_list.map((bank) => ({
            value: bank.wpa_uniq,
            label: bank.wpa_nm,
          })) || []
        );
        //console.log(toData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBankData();
    fetchMerchantData();
    fetchWalletData();
  }, []);

  const handleSelectChange = (field, selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleTextChange = (field, value) => {
    console.log(field, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const handleOkClick = async (e) => {
    e.preventDefault();
    if (!formData.transferType) {
      setError("Please fill in the transferType.");
      return;
    }
    if (!formData.account_no) {
      setError("Please select the AccountNo Bank(Wallet/PG/PA)/Merchant.");
      return;
    }
    if (!formData.account_no) {
      setError("Please fill in the AccountNo.");
      return;
    }
    if (!formData.Amount) {
      setError("Please fill in the Amount.");
      return;
    }
    if (!formData.account_no) {
      setError("Please fill in the AccountNo.");
      return;
    }
    if (!formData.date) {
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
          api_key: "1725993564",
          visitor_token: vist_id,
          qtion_id: "66f6545af3d6e",
          qtion_num: "7",
          mtfr_uni: formData.transferType,
          bwpa_uni: formData.bank,
          acc_no: formData.account_no,
          trans_id: formData.transaction_no,
          amt: formData.Amount,
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
    setSuspectBankData((prevData) => [...prevData, formData]);
    setShowOptions(true);
  };

  // const handleNextPageClick = (e) => {
  //   e.preventDefault()
  //   onNext(16); // Move to the next step
  //   setShowOptions(false);
  //   onQuestion(8);
  // };
  // console.log(formData.transferType);
  const handleAddPageClick = (e) => {
    e.preventDefault();
    addSuspectBank(pageCount);
    setPageCount((prevCount) => prevCount + 1); // Add another form
    setFormData({
      transferType: "",
      bank: "",
      Wallet: "",
      merchant: "",
      wallet: "",
      account_no: "",
      TransactionNo: "",
      date: "",
      Amount: "",
    });

    console.log(window.innerHeight / 2, window.outerWidth / 2);
    const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as per your design
    const scrollAmount = isMobile ? window.innerHeight : window.innerHeight*1.2; // Adjust scrolling based on view
    // Perform smooth scroll
    window.scrollBy({ top: scrollAmount, behavior: "smooth" });

    //window.scrollBy({ top: window.innerHeight/2, behavior: 'smooth' });
    // const newPageIndex = index + 1;
    // onNextPage(newPageIndex);
    setShowOptions(false); // Hide options after adding
  };

  return (
    <div className="question">
      <div style={{ display: "flex" ,flexDirection: "column"}}>
        <div style={{ display: "flex", flexDirection: "column",justifyContent:'center',alignItems:"center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // width:'650px'
            }}
          >
            <h2 style={{fontSize:'35px'}}>
              Please provide creditor/ fraudster’s bank account details(if you
              have)
            </h2>
            {/* <button
              type="button"
              style={{ marginLeft:"10px", width: "40px", fontSize: "20px", height: "40px" }}
              onClick={addSuspectBank}
            >
              +
            </button> */}
          </div>
          <div className="option-list">
            <p className="bank-para">
              Money Transfer:<span style={{ color: "red" }}>*</span>
            </p>
            <Select
              value={banks.find((bank) => bank.value === formData.BankName)}
              onChange={(selectedOption) =>
                handleSelectChange("transferType", selectedOption)
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
            {formData.transferType === "" && (
              <Select
                className="dropdown-input"
                placeholder="Select..."
                styles={customStyles} // Apply custom styles
              />
            )}
            {formData.transferType === "66d6e36507409502644872" && (
              <Select
                value={bankOption.find(
                  (Bank) => Bank.value === formData.MerchantId
                )}
                onChange={(selectedOption) =>
                  handleSelectChange("bank", selectedOption)
                }
                options={bankOption}
                className="dropdown-input"
                placeholder="Select..."
                styles={customStyles} // Apply custom styles
              />
            )}
            {formData.transferType === "66d6e3794d948034147381" && (
              <Select
                value={merchantOption.find(
                  (Merchant) => Merchant.value === formData.UpiId
                )}
                onChange={(selectedOption) =>
                  handleSelectChange("merchant", selectedOption)
                }
                options={merchantOption}
                className="dropdown-input"
                placeholder="Select..."
                styles={customStyles} // Apply custom styles
              />
            )}
            {formData.transferType === "66d6e36eddd3a195931539" && (
              <Select
                value={walletOption.find(
                  (Wallet) => Wallet.value === formData.UpiId
                )}
                onChange={(selectedOption) =>
                  handleSelectChange("Wallet", selectedOption)
                }
                options={walletOption}
                className="dropdown-input"
                placeholder="Select..."
                styles={customStyles} // Apply custom styles
              />
            )}

            <p className="bank-para" style={{ marginTop: "20px" }}>
              Account No./(Wallet/PG/PA)id/Merchant id:
              <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="text"
              className="text-input account"
              name="account_no"
              value={formData.account_no}
              onChange={(e) => handleTextChange("account_no", e.target.value)}
              autoComplete="off"
            />
            <p className="bank-para">Transaction id/UTR Number:</p>
            <input
              type="text"
              className="text-input account"
              onChange={(e) =>
                handleTextChange("transaction_no", e.target.value)
              }
            />
            <p className="bank-para">Reference No:</p>
            <input type="text" className="text-input account" autoComplete="off"/>
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
                  value={formData.date ? parseDate(formData.date) : ""}
                />
                <input
                  type="datetime-local"
                  name="date"
                  className="date-time-label"
                  value={formData.date}
                  onChange={(e) => handleDateChange(e)}
                  autoComplete="off"
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
              }}
            >
              <p>
                Amount:<span style={{ color: "red" }}>*</span>
              </p>
              <span className="rupee-symbol">₹</span>
              <input
                type="number"
                value={formData.Amount}
                onChange={(e) => handleTextChange("Amount", e.target.value)}
                placeholder="Amount"
                className="text-input amount"
                min="0"
                autoComplete="off"
              />
            </div>
          </div>
            
        </div>
        <div style={{ display: "flex",  marginTop:'20px',marginLeft:'250px'}}>
              <button type="button" className="next-page-btn" onClick={handleOkClick}>
              Go To Next Question
              </button>
              {/* <p className="enter-text">
                press <strong>Enter ↵</strong>
              </p> */}
              {/* <div className="next-add-options"> */}
                {/* <button onClick={handleNextPageClick} className="next-page-btn">
                  Next Page
                </button> */}
                <button onClick={handleAddPageClick} className="add-page-btn">
                  Add Another Transaction
                </button>
              {/* </div> */}
          </div>
          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SuspectBank;
