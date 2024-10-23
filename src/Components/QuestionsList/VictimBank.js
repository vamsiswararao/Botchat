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
  apiKey,
  botToken,
  vist_id,
  app_ver
}) => {
  const [victimBankData, setVictimBankData] = useState([]);
  const [formData, setFormData] = useState({
    sub_cat: "",
    bank_name: "",
    wallet_list: "",
    acc_no: "",
    transaction_no:'',
    payment: "",
    ref_num: "",
    trans_dtm: "",
    amt: "",
    first_six: "",
    last_four: "",
    card_len: "",
    mod_op: "",
  });

  const [bankOption, setBankOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [walletOption, setWalletOptions] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [error, setError] = useState("");
  //const vist_id = sessionStorage.getItem("visitor_id");

  const parseDate = (formattedDateTime) => {
    const [date, time] = formattedDateTime.split("T");
    const [year, month, day] = date.split("-");
    const parsedDateTime = `${day}-${month}-${year} ${time}`;
    return parsedDateTime;
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const storedDistrict = localStorage.getItem("formVictimData");
    //console.log(storedDistrict);
    if (storedDistrict) {
      setFormData((prev) => ({ ...prev, ...JSON.parse(storedDistrict) }));
    }
  }, []);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const BankResponse = await fetch(
          `${apiUrl}/v1/cy_ma_bank_wlet_pg_pa_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f6544451d1f",
              lac_token: botToken,
              "app_ver":app_ver
            }),
          }
        );

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const BankData = await BankResponse.json();
        //console.log(BankData);
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

    const fetchWalletData = async () => {
      try {
        const BankResponse = await fetch(`${apiUrl}/v1/cy_ma_wlet_pg_pa_list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            visitor_token: vist_id,
            qtion_id: "66f6545af3d6e",
            lac_token: botToken,
            "app_ver":app_ver
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
    fetchWalletData();
  }, []);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const BankResponse = await fetch(
          `${apiUrl}/v1/cy_ma_sub_category_list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f6544451d1f",
              lac_token: botToken,
              "app_ver":app_ver
            }),
          }
        );

        if (!BankResponse.ok) {
          throw new Error("Failed to fetch audio options");
        }

        const BankData = await BankResponse.json();
        //console.log(BankData);
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
    console.log(selectedOption);

    if (field === "sub_cat") {
      if (selectedOption.value === "66d300879af61335355481") {
         
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
            wallet_list: "",
          };
          localStorage.setItem(
            "formVictimData",
            JSON.stringify(updatedFormData)
          ); // Save to localStorage
          return updatedFormData;
        });
      } else if (selectedOption.value === "66d300879af44537699255") {
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
          };
          localStorage.setItem(
            "formVictimData",
            JSON.stringify(updatedFormData)
          ); // Save to localStorage
          return updatedFormData;
        });
      } else {
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
            mod_op: "",
            wallet_list: "",
            first_six: "",
            last_four: "",
            card_len: "",
          };
          localStorage.setItem(
            "formVictimData",
            JSON.stringify(updatedFormData)
          ); // Save to localStorage
          return updatedFormData;
        });
      }
    }

    if(field==="mod_op"){
      if(selectedOption.value!=="66d31e6e8b6cb953390002"){
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
            first_six: "",
            last_four: "",
            card_len: "",
          };
          localStorage.setItem(
            "formVictimData",
            JSON.stringify(updatedFormData)
          ); // Save to localStorage
          return updatedFormData;
        });
      }
      
    }

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [field]: selectedOption ? selectedOption.value : "",
      };
      localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage
      return updatedFormData;
    });
  };

  const handleTextChange = (id, value) => {
    let updatedFormData;

    if (id === "acc_no") {
      // Regex to allow alphanumeric characters and spaces, max 50 characters
      if (/^[a-zA-Z0-9\s]*$/.test(value) && value.length <= 50) {
        updatedFormData = {
          ...formData,
          [id]: value,
        };
        setFormData(updatedFormData);
        localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage

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
    } else if (id === "transaction_no") {
      // Regex to allow alphanumeric characters and spaces, max 100 characters
      if (/^[a-zA-Z0-9\s]*$/.test(value) && value.length <= 50) {
        updatedFormData = {
          ...formData,
          [id]: value,
        };
        setFormData(updatedFormData);
        localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage

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
          ...formData,
          [id]: value,
        };
        setFormData(updatedFormData);
        localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage
        setError(""); // Reset error if input is valid
      } else {
        setError("Amount can only contain numbers and a decimal point.");
      }
    } else if (id === "ref_num") {
      // Regex to allow alphanumeric characters and spaces, max 100 characters
      if (/^[a-zA-Z0-9\s]*$/.test(value) && value.length <= 100) {
        updatedFormData = {
          ...formData,
          [id]: value,
        };
        setFormData(updatedFormData);
        localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage

        if (value.length < 10) {
          setError("Reference number must be at least 10 characters long.");
        } else {
          setError(""); // Reset error if input is valid
        }
      } else {
        if (value.length > 50) {
          setError("Reference number must be less than 50 characters.");
        } else {
          setError(
            "Reference number can only contain letters, numbers, and spaces."
          );
        }
      }
    } else {
      // Handle other fields if necessary
      updatedFormData = {
        ...formData,
        [id]: value,
      };
      setFormData(updatedFormData);
      localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage
      setError(""); // Reset error for other fields
    }
  };

  const handleOkClick = async (e) => {
    e.preventDefault();
    //Validate the form fields
    // if (!formData.sub_cat) {
    //   setError("Please select the sub_category.");
    //   return;
    // }
    // if (!formData.bank_name) {
    //   setError("Please select in the Bank.");
    //   return;
    // }
    // if (!formData.acc_no) {
    //   setError("Please fill in the AccountNo.");
    //   return;
    // }
    // if (!formData.amt) {
    //   setError("Please fill in the Amount.");
    //   return;
    // }
    // if (!formData.date) {
    //   setError("Please select in the date.");
    //   return;
    // }

    // setError("");

    if (
      formData.sub_cat ||
      formData.bank_name ||
      formData.acc_no ||
      formData.amt ||
      formData.date
    ) {
      console.log("A")
      try {
        // Send the data to the dummy API
        const response = await fetch(
          `${apiUrl}/v1/ccrim_bot_add_victim_trans`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f6544451d1f",
              qtion_num: "14",
              sub_cat: formData.sub_cat,
              mod_op: formData.mod_op,
              bank_mer: formData.bank_name,
              wallet_list: formData.wallet_list,
              acc_no: formData.acc_no,
              trans_id: formData.transaction_no,
              first_six: formData.first_six,
              last_four: formData.last_four,
              card_len: formData.card_len,
              amt: formData.amt,
              ref_num: formData.ref_num,
              trans_dtm: parseDate(formData.date),
              lac_token: botToken,
              "app_ver":app_ver
            }),
          }
        );


        if (!response.ok) {
          throw new Error("Failed to submit form data.");
        }

        const responseData = await response.json();
        console.log(responseData)
        if (responseData.resp.error_code === "0") {
          onNext(15); // Move to the next step
          onQuestion(16);

          // If successful, add the data to the victimBankData list and show options
          setVictimBankData((prevData) => [...prevData, formData]);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
        setError("Failed to submit form data. Please try again.");
      }
    }
    onNext(15); // Move to the next step
    onQuestion(16);
  };

  const handleAddPageClick = async (e) => {
    e.preventDefault();
    addVictimBank(pageCount);
    setPageCount((prevCount) => prevCount + 1); // Add another form
    setFormData({
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
      mod_op: "",
    });

    if (
      formData.sub_cat &&
      formData.bank_name &&
      formData.acc_no &&
      formData.acc_no &&
      formData.amt &&
      formData.date
    ) {
      try {
        // Send the data to the dummy API
        console.log(formData.wallet_list)
        const response = await fetch(
          `${apiUrl}/v1/ccrim_bot_add_victim_trans`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              visitor_token: vist_id,
              qtion_id: "66f6544451d1f",
              qtion_num: "14",
              sub_cat: formData.sub_cat,
              mod_op: formData.mod_op,
              bank_mer: formData.bank_name,
              wallet_list: formData.wallet_list,
              acc_no: formData.acc_no,
              trans_id: formData.transaction_no,
              first_six: formData.first_six,
              last_four: formData.last_four,
              card_len: formData.card_len,
              amt: formData.amt,
              ref_num: formData.ref_num,
              trans_dtm: parseDate(formData.date),
              lac_token: botToken,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit form data.");
        }

        const responseData = await response.json();
    
        if (responseData.resp.error_code === "0") {
          // If successful, add the data to the victimBankData list and show options
          setVictimBankData((prevData) => [...prevData, formData]);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
        setError("Failed to submit form data. Please try again.");
      }
    }

    const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as per your design
    const scrollAmount = isMobile
      ? window.innerHeight
      : window.innerHeight * 1.3; // Adjust scrolling based on view
    // Perform smooth scroll
    window.scrollBy({ top: scrollAmount, behavior: "smooth" });
    // const newPageIndex = index + 1;
    // onNextPage(newPageIndex);
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
          <div style={{ display: "flex" }}>
            <h2>Please provide debtor/victim bank account details.</h2>
          </div>
          <div className="bank-list">
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
              placeholder="Select..."
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
            {formData.sub_cat === "66d300879af44537699255" && (
              <>
                <p className="bank-para" style={{ marginTop: "20px" }}>
                  Wallet/PG/PA List :<span style={{ color: "red" }}>*</span>
                </p>
                <Select
                  value={walletOption.find(
                    (Merchant) => Merchant.value === formData.wallet_list
                  )}
                  onChange={(selectedOption) =>
                    handleSelectChange("wallet_list", selectedOption)
                  }
                  options={walletOption}
                  className="dropdown-input"
                  placeholder="Select..."
                  styles={customStyles} // Apply custom styles
                />
              </>
            )}
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
            {!(formData.mod_op === "66d31e6e8b6cb953390002") && (
              <>
                <p className="bank-para" style={{ marginTop: "20px" }}>
                  Account No./(Wallet/PG/PA)id/Merchant id:
                  <span style={{ color: "red" }}>*</span>
                </p>
                <input
                  type="text"
                  className="text-input account"
                  name="acc_no"
                  onChange={(e) => handleTextChange("acc_no", e.target.value)}
                  value={formData.acc_no}
                  autoComplete="off"
                />
              </>
            )}
            <p className="bank-para">Transaction id/UTR Number:</p>
            <input
              type="text"
              className="text-input account"
              name="transaction_no"
              value={formData.transaction_no}
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
            {/* </div> */}
            <p className="bank-para">Reference No:</p>
            <input
              type="text"
              className="text-input account"
              value={formData.ref_num}
              // onChange={handleRefChange}
              onChange={(e) => handleTextChange("ref_num", e.target.value)}
            />
            <p>
              Amount:<span style={{ color: "red" }}>*</span>
            </p>
            <span className="rupee-symbol">₹</span>
            <input
              type="text"
              value={formData.amt}
              //onChange={handleAmtChange}
              onChange={(e) => handleTextChange("amt", e.target.value)}
              //placeholder="Amount"
              className="text-input amount"
              min="0"
              autoComplete="off"
            />
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
        <div
          style={{ display: "flex", marginTop: "20px" }}
          className="victim-btns"
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
          {/* </div> */}
        </div>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
};

export default VictimBank;
