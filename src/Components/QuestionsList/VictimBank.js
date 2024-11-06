import React, { useState, useEffect } from "react";
import Select from "react-select";
const apiUrl = process.env.REACT_APP_API_URL;

const cardOptions = [
  {
    id: "A",
    value: "66d31e6e8b6cb953390002",
    label: "Credit Card",
  },
  { id: "B", value: "66d31e6550e23909435696", label: "Debit Card" },
];

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "450px",
    height: "24px",
    "@media (max-width: 768px)": {
      width: "300px",
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

const VictimBank = ({
  onNext,
  onSuspectBankSelected,
  addVictimBank,
  index,
  onQuestion,
  apiKey,
  botToken,
  vist_id,
  app_ver,
}) => {
  const [victimBankData, setVictimBankData] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [walletOption, setWalletOptions] = useState([]);
  const [formData, setFormData] = useState({
    sub_cat: "",
    bank_name: "",
    acc_no: "",
    mod_op: "",
    wallet_list: "",
  });

  const [bankOption, setBankOptions] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   const storedDistrict = localStorage.getItem("victimBank");
  //   if (storedDistrict) {
  //     setFormData( JSON.parse(storedDistrict));
  //   }
  // }, []);

  useEffect(() => {
    const storedDistrict = localStorage.getItem("victimBank");

    if (storedDistrict) {
      const data = JSON.parse(storedDistrict);
      setFormData((prev) => ({
        ...prev,
        bank_name: data.bank_name || "",
        acc_no: data.acc_no || "",
        sub_cat:data.sub_cat || "",
        mod_op: data.mod_op || "",
        wallet_list: data.wallet_list,

      }));
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
              app_ver: app_ver,
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

    fetchBankData();
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
            app_ver: app_ver,
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
    fetchWalletData();

    fetchBankData();
  }, []);

  const handleSelectChange = (field, selectedOption) => {
    //console.log(field, selectedOption);
    if (field === "sub_cat") {
      if (selectedOption.value === "66d300879af61335355481") {
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
            wallet_list: "",
            bank_name:""
          };
          // localStorage.setItem(
          //   "formVictimData",
          //   JSON.stringify(updatedFormData)
          // ); // Save to localStorage

          setFormData(updatedFormData);
          return updatedFormData;
        });
      } else if (selectedOption.value === "66d300879af44537699255") {
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
          };
          // localStorage.setItem(
          //   "formVictimData",
          //   JSON.stringify(updatedFormData)
          // ); // Save to localStorage
          setFormData(updatedFormData);
          return updatedFormData;
        });
      } else {
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
            mod_op: "",
            wallet_list: "",
            bank_name:""
          };
          // localStorage.setItem(
          //   "formVictimData",
          //   JSON.stringify(updatedFormData)
          // ); // Save to localStorage
          setFormData(updatedFormData);
          return updatedFormData;
        });
      }
    }

    if (field === "mod_op") {
      if (selectedOption.value !== "66d31e6e8b6cb953390002") {
        setFormData((prev) => {
          const updatedFormData = {
            ...prev,
            [field]: selectedOption ? selectedOption.value : "",
          };
          // localStorage.setItem(
          //   "formVictimData",
          //   JSON.stringify(updatedFormData)
          // ); // Save to localStorage
          setFormData(updatedFormData);
          return updatedFormData;
        });
      }
    }

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [field]: selectedOption ? selectedOption.value : "",
      };
      //localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage
      setFormData(updatedFormData);
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
        //localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage

        // if (value.length < 10) {
        //   setError("Account number must be at least 10 characters long.");
        // } else {
        //   setError(""); // Reset error if input is valid
        // }
      } else {
        if (value.length > 50) {
          setError("Account number must be less than 50 characters.");
        } else {
          // setError(
          //   "Account number can only contain letters, numbers, and spaces."
          // );
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
        //localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage

        if (value.length < 10) {
          setError("Transaction number must be at least 10 characters long.");
        } else {
          setError(""); // Reset error if input is valid
        }
      } else {
        if (value.length > 50) {
          setError("Transaction number must be less than 50 characters.");
        }
        // else {
        //   setError(
        //     "Transaction number can only contain letters, numbers, and spaces."
        //   );
        // }
      }
    } else if (id === "amt") {
      // Allow only numbers and dot (for decimal), validate input before updating state
      if (/^\d*\.?\d*$/.test(value)) {
        updatedFormData = {
          ...formData,
          [id]: value,
        };
        setFormData(updatedFormData);
        //localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage
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
        //localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage

        if (value.length < 5) {
          setError("Reference number must be at least 5 characters long.");
        } else {
          setError(""); // Reset error if input is valid
        }
      } else {
        if (value.length > 50) {
          setError("Reference number must be less than 50 characters.");
        }
        // else {
        //   setError(
        //     "Reference number can only contain letters, numbers, and spaces."
        //   );
        // }
      }
    } else {
      // Handle other fields if necessary
      updatedFormData = {
        ...formData,
        [id]: value,
      };
      setFormData(updatedFormData);
      //localStorage.setItem("formVictimData", JSON.stringify(updatedFormData)); // Save to localStorage
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

    if (formData.sub_cat &&  formData.bank_name && formData.acc_no) {
      if ((formData.acc_no.length)<=5 ) {
        setError("Please Enter the valid account number.");
        return;
      }

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
              qtion_num: "3",
              bank_mer: formData.bank_name,
              acc_no: formData.acc_no,
              lac_token: botToken,
              app_ver: app_ver,
              mod_op: formData.mod_op,
              wallet_list: formData.wallet_list,
              sub_cat: formData.sub_cat,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to submit form data.");
        }

        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.resp.error_code === "0") {
          onNext(4); // Move to the next step
          onQuestion(5);
          localStorage.setItem("victimBank", JSON.stringify(formData));
          // onSuspectBankSelected(formData)
          // If successful, add the data to the victimBankData list and show options
          setVictimBankData((prevData) => [...prevData, formData]);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
        setError("Failed to submit form data. Please try again.");
      }
    }
    onNext(4); // Move to the next step
    onQuestion(5);
  };

  // const handleAddPageClick = async (e) => {
  //   e.preventDefault();
  //   addVictimBank(pageCount);
  //   setPageCount((prevCount) => prevCount + 1); // Add another form
  //   setFormData({
  //     bank_name: "",
  //     acc_no: "",
  //     trans_id: "",
  //     payment: "",
  //     ref_num: "",
  //   });

  //   if (formData.bank_name && formData.acc_no) {
  //     try {
  //       const response = await fetch(
  //         `${apiUrl}/v1/ccrim_bot_add_victim_trans`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             api_key: apiKey,
  //             visitor_token: vist_id,
  //             qtion_id: "66f6544451d1f",
  //             qtion_num: "14",
  //             bank_mer: formData.bank_name,
  //             acc_no: formData.acc_no,
  //             lac_token: botToken,
  //             app_ver: app_ver,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to submit form data.");
  //       }

  //       const responseData = await response.json();

  //       if (responseData.resp.error_code === "0") {
  //         // onSuspectBankSelected(formData)
  //         setFormData({
  //           bank_name: "",
  //           acc_no: "",
  //         });
  //           localStorage.removeItem("victimBank");
  //         //setVictimBankData((prevData) => [...prevData, formData]);
  //       }
  //     } catch (error) {
  //       console.error("Error submitting form data:", error);
  //       setError("Failed to submit form data. Please try again.");
  //     }
  //   }

  //   setFormData({
  //     bank_name: "",
  //     acc_no: "",
  //   });

  //   localStorage.removeItem("victimBank");

  //   const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as per your design
  //   const scrollAmount = isMobile
  //     ? window.innerHeight * 1.36
  //     : window.innerHeight * 1.2; // Adjust scrolling based on view
  //   // Perform smooth scroll
  //   window.scrollBy({ top: scrollAmount, behavior: "smooth" });
  //   // const newPageIndex = index + 1;
  //   // onNextPage(newPageIndex);
  // };

  return (
    <div className="question" >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h2>Your Bank details</h2>
          </div>

          <div>
            <p className="bank-para">Sub Category:</p>
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
              Select the Bank:
            </p>
            {/* <Select
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
            /> */}

            <Select
              value={
                formData.sub_cat === "66d300879af5f216270004"
                  ? walletOption.find((Bank) => Bank.value === formData.bank_name) ||
                    null
                  : formData.sub_cat !== "66d300879af5f216270004"
                  ? bankOption.find(
                      (Wallet) => Wallet.value === formData.bank_name
                    ) || null
                  : null // For empty transferType, no value selected
              }
              onChange={(selectedOption) => {
                if (formData.sub_cat === "66d300879af5f216270004") {
                  handleSelectChange("bank_name", selectedOption);
                }else{
                  handleSelectChange("bank_name", selectedOption);
                }
              }}
              options={
                formData.sub_cat === "66d300879af5f216270004"
                  ? walletOption
                  : bankOption
              }
              className="dropdown-input"
              placeholder={
                formData.sub_cat === ""
                  ? "Select The Money Transfer First"
                  : "Select..."
              }
              isDisabled={!formData.sub_cat} // Disable if transferType is empty
              styles={customStyles} // Apply custom styles
            />

            {formData.sub_cat === "66d300879af61335355481" && (
              <>
                <p className="bank-para" style={{ marginTop: "20px" }}>
                  Mode Of Payment:
                </p>
                <Select
                  value={cardOptions.find(
                    (Merchant) => Merchant.value === formData.mod_op
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
            {formData.sub_cat === "66d300879af44537699255" && (
              <>
                <p className="bank-para" style={{ marginTop: "20px" }}>
                  Wallet/PG/PA List :
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
            <p className="bank-para" style={{ marginTop: "20px" }}>
              Account No/ Credit/Debit Card No:
            </p>
            <input
              type="text"
              className="text-input account"
              name="acc_no"
              onChange={(e) => handleTextChange("acc_no", e.target.value)}
              value={formData.acc_no}
              autoComplete="off"
              placeholder="Enter Account No."
            />

            <div style={{ display: "flex", marginTop: "20px", zIndex: "900" }}>
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                OK
              </button>
              {/* <button onClick={handleAddPageClick} className="add-page-btn">
            Add Another Transaction
          </button> */}
              {/* </div> */}
            </div>
          </div>
        </div>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>
    </div>
  );
};

export default VictimBank;
