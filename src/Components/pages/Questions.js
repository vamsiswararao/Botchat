import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Number from "../QuestionsList/Number";
import Help from "../QuestionsList/Help";
import Time from "../QuestionsList/Time";
import PaymentMethod from "../QuestionsList/PaymentMethod";
import HowLoss from "../QuestionsList/HowLoss";
import Victim from "../QuestionsList/Victim";
import VictimName from "../QuestionsList/VictimName";
import VictimPhone from "../QuestionsList/VictimPhone";
import VictimBirth from "../QuestionsList/VictimBirth";
import VictimGender from "../QuestionsList/VictimGender";
import VictimQualification from "../QuestionsList/VictimQualification";
import VictimAddress from "../QuestionsList/VictimAddress";
import PoliceStation from "../QuestionsList/PoliceStation";
import Suspect from "../QuestionsList/Suspect";
import SuspectCall from "../QuestionsList/SuspectCall";
import SuspectSpeak from "../QuestionsList/SuspectSpeak";
import SuspectContact from "../QuestionsList/SuspectContact";
import VictimBank from "../QuestionsList/VictimBank";
import SuspectBank from "../QuestionsList/SuspectBank";
import Support from "../QuestionsList/Support";
import HowMuch from "../QuestionsList/HowMuch";
import { useNavigate } from "react-router-dom";


const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#ddd",
        padding: "0px",
        zIndex: 1000, // Ensure it stays above other content
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "#007bff", // Blue color
          height: "3px",
          transition: "width 0.3s ease",
        }}
      />
    </div>
  );
};


const Header = ({ visible, title }) => {
  if (!visible) return null;
  return (
    <header
      style={{
        position: "fixed",
        top: 10,
        left: "10%",
        width: "80%",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderBottom: "1px solid #dee2e6",
        zIndex: 1000, // Ensure it stays above other content
      }}
    >
      <h1 style={{ margin: 0, textAlign: "center" }}>{title}</h1>
    </header>
  );
};

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    help: "",
    how_much: "",
    time: "",
    paymentMethod: "",
    how_loss: "",
    victim_name: "",
    victim_phone: "",
    victim_birth: "",
    victim_gender: "",
    victim_qualification: "",
    victim_address: "",
    police_station: "",
    suspect_call: "",
    suspect_speak: "",
    suspect_contact: "",
    victim_bank: "",
    suspect_bank: "",
    support: "",
  });
const questionCount = formData.help? 22:2;
  const handlePhoneData = (phone) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: phone,
    }));
  };

  const handleDataUpdate = (key, value) => {
    console.log(key, value);
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // const handleHelpData = (help) => {
  //   setHelp(help)
  //   console.log(help);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     help: help,
  //   }));
  // };

  // const handleHowMuchData = (howMuch) => {
  //   console.log(howMuch);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     how_much: howMuch,
  //   }));
  // };
  // const handleTimeData = (time) => {
  //   console.log(time);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     time: time,
  //   }));
  // };

  // const handlePaymentMethodData = (data) => {
  //   console.log(data);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     paymentMethod: data,
  //   }));
  // };

  // const handleHowLossData = (HowLoss) => {
  //   console.log(HowLoss);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     how_loss: HowLoss,
  //   }));
  // };

  // const handleVictimNameData = (victimName) => {
  //   console.log(victimName);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     victim_name: victimName,
  //   }));
  // };

  // const handleVictimPhoneData = (victimPhone) => {
  //   console.log(victimPhone);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     victim_phone: victimPhone,
  //   }));
  // };

  // const handleVictimBirthData = (victimBirth) => {
  //   console.log(victimBirth);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     victim_birth: victimBirth,
  //   }));
  // };

  // const handleVictimGenderData = (victimGender) => {
  //   console.log(victimGender);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     victim_gender: victimGender,
  //   }));
  // };

  // const handleVictimQualificationData = (victimQualification) => {
  //   console.log(victimQualification);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     victim_qualification: victimQualification,
  //   }));
  // };

  // const handleVictimAddressData   = (victimAddress) => {
  //   console.log(victimAddress);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     victim_address:victimAddress,
  //   }));
  // };

  // const handlePoliceStationData   = (policeStation) => {
  //   console.log(policeStation);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     police_station: policeStation,
  //   }));
  // };

  // const handleSuspectCallData  = (suspectCall) => {
  //   console.log(suspectCall);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     suspect_call: suspectCall,
  //   }));
  // };

  // const handleSuspectSpeakData  = (suspectSpeck) => {
  //   console.log(suspectSpeck);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     suspect_speak: suspectSpeck,
  //   }));
  // };

  // const handleSuspectContactData = (suspectContact) => {
  //   console.log(suspectContact);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     suspect_contact: suspectContact,
  //   }));
  // };

  // const handleVictimBankData = (VictimBank) => {
  //   console.log(VictimBank);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     victim_bank: VictimBank,
  //   }));
  // };
  const handleSupportData = (support) => {
    console.log(support);
    setFormData((prevData) => ({
      ...prevData,
      support: support,
    }));
  };

  const handleNextClickQuestion = (currentQuestion) => {
    // if (currentQuestion === 0 && !isPhoneValid) {
    //   alert("Please enter a valid phone number before proceeding.");
    //   return;
    // }
    
    const nextQuestion = Math.min(currentQuestion, questionCount - 1);
    const element = document.querySelector(`#question-${nextQuestion}`);
    console.log(currentQuestion)
      setCurrentQuestion(nextQuestion);
      element.scrollIntoView({ behavior: "smooth" });
  };



  const handleNextQuestion = (optionId) => {
    // if (currentQuestion === 0 && !isPhoneValid) {
    //   alert("Please enter a valid phone number before proceeding.");
    //   return;
    // }
    
    const nextQuestion = Math.min(currentQuestion + 1, questionCount - 1);
    const element = document.querySelector(`#question-${nextQuestion}`);
    console.log(currentQuestion)
      setCurrentQuestion(nextQuestion);
      element.scrollIntoView({ behavior: "smooth" });
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = Math.max(currentQuestion - 1, 0);
    setCurrentQuestion(prevQuestion);
    document
      .querySelector(`#question-${prevQuestion}`)
      .scrollIntoView({ behavior: "smooth" });
  };



  const handleSubmit = async (e, support) => {
    console.log(support);
    e.preventDefault();
    console.log(formData);
    const apiUrl = "https://enrbgth6q54c8.x.pipedream.net"; // Replace with your actual API endpoint

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const result = await response.json();
      console.log("API response:", result);
      navigate("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const isHeaderVisible = (currentQuestion >= 7 || currentQuestion >= 12) && currentQuestion !== 14;
  const headerTitle = (() => {
    if ((currentQuestion >= 7 && currentQuestion <= 13) || currentQuestion === 18) return "Victim";
    if ((currentQuestion >= 15 && currentQuestion <= 17) || currentQuestion === 19) return "Suspect";
    return ""; // Default or empty title
  })();
console.log(currentQuestion)
  return (
    <>
      <ProgressBar current={currentQuestion} total={questionCount} />
    { isHeaderVisible && (
    <header
      style={{
        position: "fixed",
        top: 5,
        left: "10%",
        width: "80%",
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderBottom: "1px solid #dee2e6",
        zIndex: 1000, // Ensure it stays above other content
      }}
    >
      {headerTitle &&(<h1 style={{ margin: 0, textAlign: "center" }}>{headerTitle}</h1>)}
    </header>
  )}
      <form>
        <div id="question-0">
          <Number  onNext={handleNextQuestion} onPhone={(value) => handleDataUpdate("phone", value)}/>
        </div>

          <>
            <div id="question-1" className="page">
              <Help
                onNext={handleNextClickQuestion}
                onHelpSelected={(value) => handleDataUpdate("help", value)}
              />
            </div>
            {formData.help === "A" && (
              <>
                <div id="question-2" className="page">
                  <HowMuch
                    onNext={handleNextClickQuestion}
                    onHowMuchSelected={(value) =>
                      handleDataUpdate("how_much", value)
                    }
                  />
                </div>
                <div id="question-3" className="page">
                  <Time
                    onNext={handleNextClickQuestion}
                    onTimeSelected={(value) => handleDataUpdate("time", value)}
                  />
                </div>

                <div id="question-4" className="page">
                  <PaymentMethod
                    onNext={handleNextClickQuestion}
                    onPaymentMethodSelected={(value) =>
                      handleDataUpdate("paymentMethod", value)
                    }
                  />
                </div>

                <div id="question-5" className="page">
                  <HowLoss
                    onNext={handleNextClickQuestion}
                    onHowLossSelected={(value) =>
                      handleDataUpdate("how_loss", value)
                    }
                  />
                </div>

                <div id="question-6" className="page">
                  <Victim onNext={handleNextClickQuestion} />
                </div>

                <div id="question-7" className="page">
                  <VictimName
                    onNext={handleNextClickQuestion}
                    onVictimNameSelected={(value) =>
                      handleDataUpdate("victim_name", value)
                    }
                  />
                </div>

                <div id="question-8" className="page">
                  <VictimPhone
                    onNext={handleNextClickQuestion}
                    onVictimPhoneSelected={(value) =>
                      handleDataUpdate("victim_phone", value)
                    }
                  />
                </div>

                <div id="question-9" className="page">
                  <VictimBirth
                    onNext={handleNextClickQuestion}
                    onVictimBirthSelected={(value) =>
                      handleDataUpdate("victim_birth", value)
                    }
                  />
                </div>

                <div id="question-10" className="page">
                  <VictimGender
                    onNext={handleNextClickQuestion}
                    onVictimGenderSelected={(value) =>
                      handleDataUpdate("victim_gender", value)
                    }
                  />
                </div>

                <div id="question-11" className="page">
                  <VictimQualification
                    onNext={handleNextClickQuestion}
                    onVictimQualificationSelected={(value) =>
                      handleDataUpdate("victim_qualification", value)
                    }
                  />
                </div>

                <div id="question-12" className="page">
                  <VictimAddress
                    onNext={handleNextClickQuestion}
                    onVictimAddressSelected={(value) =>
                      handleDataUpdate("victim_address", value)
                    }
                  />
                </div>

                <div id="question-13" className="page">
                  <PoliceStation
                    onNext={handleNextClickQuestion}
                    onPoliceStationSelected={(value) =>
                      handleDataUpdate("police_station", value)
                    }
                  />
                </div>

                <div id="question-14" className="page">
                  <Suspect onNext={handleNextClickQuestion} />
                </div>

                <div id="question-15" className="page">
                  <SuspectCall
                    onNext={handleNextClickQuestion}
                    onSuspectCallSelected={(value) =>
                      handleDataUpdate("suspect_call", value)
                    }
                  />
                </div>

                <div id="question-16" className="page">
                  <SuspectSpeak
                    onNext={handleNextClickQuestion}
                    onSuspectSpeakSelected={(value) =>
                      handleDataUpdate("suspect_speak", value)
                    }
                  />
                </div>

                <div id="question-17" className="page">
                  <SuspectContact
                    onNext={handleNextClickQuestion}
                    onSuspectContactSelected={(value) =>
                      handleDataUpdate("suspect_contact", value)
                    }
                  />
                </div>

                <div id="question-18" className="page">
                  <VictimBank
                    onNext={handleNextClickQuestion}
                    onVictimBankSelected={(value) =>
                      handleDataUpdate("victim_bank", value)
                    }
                  />
                </div>

                <div id="question-19" className="page">
                  <SuspectBank
                    onNext={handleNextClickQuestion}
                    onSuspectBankSelected={(value) =>
                      handleDataUpdate("suspect_bank", value)
                    }
                  />
                </div>

                <div id="question-20" className="page">
                  <Support
                    onNext={handleNextClickQuestion}
                    submitSupport={handleSupportData}
                  />
                </div>
                <div id="question-21" className="page">
                  <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100vh'}}>
                  <h1 className="submit-title" >Click the below Submit button and save the details </h1>
                  <button className="submit-button" onClick={handleSubmit}>
                    Submit
                  </button>
                  </div>
                </div>
              </>
            )}
          </>
          <div  className="navigation-buttons" style={{ display:'flex',justifyContent:'center',alignItems:'center', position: "fixed", bottom: "0px", right: "0px" }}>
        <div
         className="navigation-buttons"
        >
          <button
            type="button"
            className="back-btn"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === -1}
          >
            <IoIosArrowUp />
          </button>
          <button
            type="button"
            className="next-btn"
            onClick={handleNextQuestion}
            disabled={currentQuestion > 21}
          >
            <IoIosArrowDown />
          </button>
        </div>
        <p className="company-name">Power By Krishanas Digital</p>
        </div>
      </form>
    </>
  );
};

export default Questions;
