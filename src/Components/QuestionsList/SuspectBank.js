import React, { useState, useEffect } from "react";
import Select from "react-select";
const apiUrl = process.env.REACT_APP_API_URL;

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
  apiKey,
  botToken,
  vist_id,
  app_ver,
}) => {
  // const [suspectBankData, setSuspectBankData] = useState([]);
  const [SuspectFormData, setSuspectFormData] = useState({
    transferType: "",
    bank: "",
    acc_no: "",
  });

  const [bankOption, setBankOptions] = useState([]);
  const [merchantOption, setMerchantOptions] = useState([]);
  const [walletOption, setWalletOptions] = useState([]);
  const [error, setError] = useState("");

  const [previousSelectedBank, setPreviousSelectedBank] = useState([]);

  // useEffect(() => {
  //   const storedDistrict = localStorage.getItem('formSuspectData');
  //   if (storedDistrict) {
  //     setSuspectFormData(JSON.parse(storedDistrict));
  //   }
  // }, []);

  useEffect(() => {
    const storedDistrict = localStorage.getItem("SuspectBank");

    if (storedDistrict) {
      const data = JSON.parse(storedDistrict);
      // console.log(data.transferType);
      setSuspectFormData(() => ({
        bank: data.bank || "",
        acc_no: data.acc_no || "",
        transferType: data.transferType || "",
      }));

      setPreviousSelectedBank({
        bank: data.bank || "",
        acc_no: data.acc_no || "",
        transferType: data.transferType || "",
      });
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
              qtion_id: "66f6545af3d6e",
              lac_token: botToken,
              app_ver: app_ver,
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
        const BankResponse = await fetch(`${apiUrl}/v1/cy_ma_merchants_list`, {
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

    fetchBankData();
    fetchMerchantData();
    fetchWalletData();
  }, [apiKey, app_ver, botToken, vist_id]);

  const handleSelectChange = (id, selectedOption) => {
    setSuspectFormData((prev) => ({
      ...prev,
      [id]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSelectTypeChange = (id, selectedOption) => {
    setSuspectFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [id]: selectedOption ? selectedOption.value : "",
      };
      // localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData)); // Save to localStorage
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
        // localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData));
        // if (value.length < 10) {

        //   setError("Account number must be at least 10 characters long.");
        // } else {
        //   setError(""); // Reset error if input is valid
        // }
      } else {
        if (value.length > 50) {
          setError("Please enter a valid account number");
        } else {
          setError("Please enter a valid account number");
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
        // localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData));
        // if (value.length < 5) {
        //   setError("Transaction number must be at least 5 characters long.");
        // } else {
        //   setError(""); // Reset error if input is valid
        // }
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
        // localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData));
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
      // localStorage.setItem("formSuspectData", JSON.stringify(updatedFormData));
      setError(""); // Reset error for other fields
    }
  };

  const handleOkClick = async (e) => {
    //   console.log(JSON.stringify(SuspectFormData))
    //   console.log(JSON.stringify(previousSelectedBank))
    //  console.log( JSON.stringify(SuspectFormData) !== JSON.stringify(previousSelectedBank))
    if (
      JSON.stringify(SuspectFormData) !== JSON.stringify(previousSelectedBank)
    ) {
      if (
        SuspectFormData.transferType &&
        SuspectFormData.acc_no &&
        SuspectFormData.bank
      ) {
        if (SuspectFormData.acc_no.length <= 5) {
          setError("Please Enter the valid account number.");
          return;
        }
        try {
          // Send the data to the dummy API
          const response = await fetch(
            `${apiUrl}/v1/ccrim_bot_add_susp_trans`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                api_key: apiKey,
                visitor_token: vist_id,
                qtion_id: "66f6545af3d6e",
                qtion_num: "16",
                mtfr_uni: SuspectFormData.transferType,
                bwpa_uni: SuspectFormData.bank,
                acc_no: SuspectFormData.acc_no,
                lac_token: botToken,
                app_ver: app_ver,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to submit form data.");
          }
          setPreviousSelectedBank({
            bank: SuspectFormData.bank || "",
            acc_no: SuspectFormData.acc_no || "",
            transferType: SuspectFormData.transferType || "",
          });
          const responseData = await response.json();
          // console.log(responseData);
          if (responseData.resp.error_code !== "0") {
            setError("Failed to push data to API");
          }
          // console.log("Form data submitted successfully:", responseData);
          localStorage.setItem("SuspectBank", JSON.stringify(SuspectFormData));
        } catch (error) {
          console.error("Error submitting form data:", error);
          setError("Failed to submit form data. Please try again.");
        }
      }
    }
    onNext(17); // Move to the next step
    onQuestion(18);

    setError("");
    // setSuspectBankData(() => [SuspectFormData]);
  };

  // const handleAddPageClick = async(e) => {
  //   e.preventDefault();
  //   addSuspectBank(pageCount);
  //   setPageCount((prevCount) => prevCount + 1); // Add another form
  //   // setSuspectFormData({
  //   //   transferType: "",
  //   //   bank: "",
  //   //   acc_no: "",
  //   // });

  //   if( SuspectFormData.transferType && SuspectFormData.acc_no ){

  //     try {
  //       // Send the data to the dummy API
  //       const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_susp_trans`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           api_key: apiKey,
  //           visitor_token: vist_id,
  //           qtion_id: "66f6545af3d6e",
  //           qtion_num: "15",
  //           mtfr_uni: SuspectFormData.transferType,
  //           bwpa_uni: SuspectFormData.bank,
  //           acc_no: SuspectFormData.acc_no,
  //           lac_token: botToken,
  //           "app_ver":app_ver
  //         }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Failed to submit form data.");
  //       }

  //       const responseData = await response.json();
  //       console.log("Form data submitted successfully:", responseData);

  //       // If successful, add the data to the victimBankData list and show options
  //       onNext(16); // Move to the next step

  //       if (responseData.resp.error_code === "0") {
  //         setSuspectBankData({
  //           transferType: "",
  //           bank: "",
  //           acc_no: "",
  //         })

  //         console.log(suspectBankData)

  //           localStorage.removeItem("formSuspectData");
  //       }

  //     } catch (error) {
  //       console.error("Error submitting form data:", error);
  //       setError("Failed to submit form data. Please try again.");
  //     }

  //   }

  //   setSuspectBankData({
  //     transferType: "",
  //     bank: "",
  //     acc_no: "",
  //   })
  //     localStorage.removeItem("formSuspectData");
  //     console.log(window.innerHeight)
  //   const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as per your design
  //   const scrollAmount = isMobile
  //     ? window.innerHeight *1.36
  //     : window.innerHeight * 1.2; // Adjust scrolling based on view
  //   // Perform smooth scroll
  //   window.scrollBy({ top: scrollAmount, behavior: "smooth" });
  // };

  return (
    <div className="question" style={{ marginBottom: "150px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // width:'650px'
            }}
          >
            <h2 className="suspect-bank">Fraudster's bank account details.</h2>
          </div>
          <div className="name-list">
            <p className="bank-para">Money Transfer:</p>
            <Select
              value={banks.find(
                (bank) => bank.value === SuspectFormData.transferType
              )}
              onChange={(selectedOption) =>
                handleSelectTypeChange("transferType", selectedOption)
              }
              options={banks}
              className="dropdown-input"
              placeholder="Select..."
              styles={customStyles} // Apply custom styles
            />

            <p className="bank-para" style={{ marginTop: "20px" }}>
              Select the Bank:
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
                } else if (
                  SuspectFormData.transferType === "66d6e3794d948034147381"
                ) {
                  handleSelectChange("bank", selectedOption);
                } else if (
                  SuspectFormData.transferType === "66d6e36eddd3a195931539"
                ) {
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
              Account No/ Credit/Debit Card No:
            </p>
            <input
              type="text"
              className="text-input account"
              name="acc_no"
              value={SuspectFormData.acc_no}
              onChange={(e) => handleTextChange("acc_no", e.target.value)}
              autoComplete="off"
              placeholder="Enter Account No/ Credit/Debit Card No"
            />
          </div>
          <div style={{ display: "flex", position: "relative", zIndex: "9" }}>
          <button type="button" className="ok-btn" onClick={handleOkClick}>
            OK
          </button>
        </div>
        </div>
        {error && <p className="error-message" style={{ position: 'relative', zIndex: '1000' }}>{error}</p>}
      </div>
    </div>
  );
};

export default SuspectBank;
