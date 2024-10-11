import React, { useState, useEffect } from "react";
import Select from "react-select";
const apiUrl = process.env.REACT_APP_API_URL;

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
    fontSize: "16px",
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
    color: "#004999",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "16px",
    marginBottom: "10px",
    color: "#004999",
  }),
  input: (base) => ({
    ...base,
    padding: "0px",
  }),
};

const cardOptions = [
  {
    id: "A",
    value: "66d31e6e8b6cb953390002",
    label: "Credit Card",
  },
  { id: "B", value: "66d31e6550e23909435696", label: "Debit Card" },
];

const VictimBank = ({
  onNext,
  onSuspectBankSelected,
  addVictimBank,
  index,
  onQuestion,
}) => {
  const [victimBankData, setVictimBankData] = useState([]);
  const [formData, setFormData] = useState({
    sub_cat: "",
    bank_name: "",
    acc_no: "",
    trans_id: "",
    payment: "",
    ref_num: "",
    trans_dtm: "",
    amt: "",
    first_six: "",
    last_four: "",
    card_len: "",
    mod_op:'',
  });

  const [bankOption, setBankOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
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
              qtion_id: "66f6544451d1f",
            }),
          }
        );

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch audio options");
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

    fetchBankData();
  }, []);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const BankResponse = await fetch(`${apiUrl}/cy_ma_sub_category_list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: "1725993564",
            visitor_token: vist_id,
            qtion_id: "66f6544451d1f",
          }),
        });

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const BankData = await BankResponse.json();
        console.log(BankData);
        setTypeOptions(
          BankData.resp.sub_category_list.map((bank) => ({
            value: bank.subcat_uni,
            label: bank.subcat_nm,
          })) || []
        );
        //console.log(toData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBankData();
  }, []);

  const handleSelectChange = (field, selectedOption) => {
    if (field === "sub_cate") {
      setFormData((prev) => ({
        ...prev,
        payment: "",
      }));
    }
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
  };

  const handleOkClick = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!formData.sub_cat) {
      setError("Please select the sub_category.");
      return;
    }
    if (!formData.bank_name) {
      setError("Please select in the Bank.");
      return;
    }
    if (!formData.account_no) {
      setError("Please fill in the AccountNo.");
      return;
    }
    if (!formData.amt) {
      setError("Please fill in the Amount.");
      return;
    }
    if (!formData.date) {
      setError("Please select in the date.");
      return;
    }

    setError("");

    try {
      // Send the data to the dummy API
      const response = await fetch(`${apiUrl}/ccrim_bot_add_victim_trans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "1725993564",
          visitor_token: vist_id,
          qtion_id: "66f6544451d1f",
          qtion_num: "15",
          sub_cat: formData.sub_cat,
          mod_op: formData.mod_op,
          bank_mer: formData.bank_name,
          wallet_list: "15a877d76abf11ef8bf01a4da71d0804",
          acc_no: formData.acc_no,
          trans_id:formData.transaction_no,
          first_six:   formData.first_six,
          last_four: formData.last_four,
          card_len: formData.card_len,
          amt: formData.amt,
          ref_num: formData.ref_num,
          trans_dtm: parseDate(formData.date) ,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      const responseData = await response.json();
      console.log("Form data submitted successfully:", responseData);
      if(responseData.resp.error_code==="0"){
        onNext(15); // Move to the next step
        onQuestion(16);
      console.log("Form data submitted successfully:", responseData);

      // If successful, add the data to the victimBankData list and show options
      setVictimBankData((prevData) => [...prevData, formData]);
      setShowOptions(true);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      setError("Failed to submit form data. Please try again.");
    }
  };

 
  //   e.preventDefault();
  //   if (!formData.sub_cate) {
  //     setError("Please select the sub_category.");
  //     return;
  //   }
  //   if (!formData.bank_name) {
  //     setError("Please select in the Bank.");
  //     return;
  //   }
  //   if (!formData.account_no) {
  //     setError("Please fill in the AccountNo.");
  //     return;
  //   }
  //   if (!formData.Amount) {
  //     setError("Please fill in the Amount.");
  //     return;
  //   }
  //   if (!formData.date) {
  //     setError("Please select in the date.");
  //     return;
  //   }
  //   setError("");
  //   setVictimBankData((prevData) => [...prevData, formData]);
  //   setShowOptions(true);
  // };

  // const handleNextPageClick = () => {
  //   onNext(15); // Move to the next step
  //   setShowOptions(false);
  //   onQuestion(16);
  // };

  const handleAddPageClick = (e) => {
    e.preventDefault();
    addVictimBank(pageCount);
    setPageCount((prevCount) => prevCount + 1); // Add another form
    setFormData({
      transferType: "",
      AccountNo: "",
      TransactionNo: "",
      UpiId: "",
      CardNo: "",
      date: "",
      Amount: "",
    });

    const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as per your design
    const scrollAmount = isMobile ? window.innerHeight : window.innerHeight*1.2 ; // Adjust scrolling based on view
    // Perform smooth scroll
    window.scrollBy({ top: scrollAmount, behavior: "smooth" });
    // const newPageIndex = index + 1;
    // onNextPage(newPageIndex);
    setShowOptions(false); // Hide options after adding
  };

  return (
    <div className="question">
      <div style={{ display: "flex", flexDirection:'column'}}>
        <div style={{ display: "flex", flexDirection: "column",justifyContent:'center',alignItems:"center" }}>
          <div style={{ display: "flex" }}>
            <h2>Please provide debtor/victim bank account details.</h2>
          </div>
          <div className="option-list" >
            <p className="bank-para">
              Sub Category:<span style={{ color: "red" }}>*</span>
            </p>
            <Select
              value={typeOptions.find(
                (bank) => bank.value === formData.sub_cat
              )}
              onChange={(selectedOption) =>
                handleSelectChange("sub_cat", selectedOption)
              }
              options={typeOptions}
              className="dropdown-input"
              placeholder="Select Bank"
              styles={customStyles}
            />

            <p className="bank-para" style={{ marginTop: "20px" }}>
              Bank(Wallet/PG/PA)/Merchant:
              <span style={{ color: "red" }}>*</span>
            </p>
            <Select
              value={bankOption.find(
                (Merchant) => Merchant.value === formData.bank_name
              )}
              onChange={(selectedOption) =>
                handleSelectChange("bank_name", selectedOption)
              }
              options={bankOption}
              className="dropdown-input"
              placeholder="Select..."
              styles={customStyles} // Apply custom styles
            />

            <p className="bank-para" style={{ marginTop: "20px" }}>
              Account No./(Wallet/PG/PA)id/Merchant id:
              <span style={{ color: "red" }}>*</span>
            </p>
            <input
              type="text"
              className="text-input account"
              name="account_no"
              onChange={(e) => handleTextChange("account_no", e.target.value)}
              autoComplete="off"
            />
            <p className="bank-para">Transaction id/UTR Number:</p>
            <input
              type="text"
              className="text-input account"
              name="transaction_no"
              autoComplete="off"
              onChange={(e) =>
                handleTextChange("transaction_no", e.target.value)
              }
            />
            {/* <div
                style={{
                  display: "flex"
                }}
              > */}
            <p>
              Amount:<span style={{ color: "red" }}>*</span>
            </p>
            <span className="rupee-symbol">₹</span>
            <input
              type="number"
              value={formData.Amount}
              onChange={(e) => handleTextChange("amt", e.target.value)}
              //placeholder="Amount"
              className="text-input account"
              min="0"
              autoComplete="off"
            />
            {/* </div> */}
            <p className="bank-para">Reference No:</p>
            <input type="text" className="text-input account" onChange={(e) =>
                    handleTextChange("ref_num", e.target.value)
                  }/>
            {formData.sub_cat === "66d300879af61335355481" && (
              <>
                <p className="bank-para" style={{ marginTop: "20px" }}>
                  Mode Of Payment:<span style={{ color: "red" }}>*</span>
                </p>
                <Select
                  value={cardOptions.find(
                    (Merchant) => Merchant.value === formData.payment
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange("mod_op", selectedOption)
                  }
                  options={cardOptions}
                  className="dropdown-input"
                  placeholder="Select..."
                  styles={customStyles} // Apply custom styles
                />
              </>
            )}
            {formData.mod_op === "66d31e6e8b6cb953390002" && (
              <>
                <p className="bank-para">
                  First Six Digit:<span style={{ color: "red" }}>*</span>
                </p>
                <input
                  type="text"
                  className="text-input account"
                  onChange={(e) =>
                    handleTextChange("first_six", e.target.value)
                    
                  }
                  autoComplete="off"

                />
                <p className="bank-para">Last Four Digit:</p>
                <input
                  type="text"
                  className="text-input account"
                  onChange={(e) =>
                    handleTextChange("last_four", e.target.value)
                  }
                  autoComplete="off"

                />
                <p className="bank-para">Card Length:</p>
                <input
                  type="text"
                  className="text-input account"
                  onChange={(e) => handleTextChange("card_len", e.target.value)}
                  autoComplete="off"
                />
              </>
            )}
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
                />
              </div>
            </div>
          </div>

        </div>
        <div style={{ display: "flex", marginTop:'20px'}} className="next-btns">
            <button type="button" className="next-page-btn" onClick={handleOkClick}>
            Go To Next Question
            </button>
            {/* <p className="enter-text">
              press <strong>Enter ↵</strong>
            </p> */}
              {/* <div className="next-add-options"> */}
                {/* <button onClick={handleNextPageClick} className="next-page-btn">
                 Go To Next Page
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

export default VictimBank;
