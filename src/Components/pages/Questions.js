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

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionCount = 22;

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

  const handleNextQuestion = (optionId) => {
    // if (currentQuestion === 0 && !isPhoneValid) {
    //   alert("Please enter a valid phone number before proceeding.");
    //   return;
    // }

    const nextQuestion = Math.min(currentQuestion + 1, questionCount - 1);
    const element = document.querySelector(`#question-${nextQuestion}`);
    if (element) {
      setCurrentQuestion(nextQuestion);
      element.scrollIntoView({ behavior: "smooth" });
    }
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
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <ProgressBar current={currentQuestion} total={questionCount} />
      <form>
        <div id="question-0">
          <Number  onNext={handleNextQuestion} onPhone={(value) => handleDataUpdate("phone", value)}/>
        </div>

          <>
            <div id="question-1" className="page">
              <Help
                onNext={handleNextQuestion}
                onHelpSelected={(value) => handleDataUpdate("help", value)}
              />
            </div>
            {formData.help === "A" && (
              <>
                <div id="question-2" className="page">
                  <HowMuch
                    onNext={handleNextQuestion}
                    onHowMuchSelected={(value) =>
                      handleDataUpdate("how_much", value)
                    }
                  />
                </div>
                <div id="question-3" className="page">
                  <Time
                    onNext={handleNextQuestion}
                    onTimeSelected={(value) => handleDataUpdate("time", value)}
                  />
                </div>

                <div id="question-4" className="page">
                  <PaymentMethod
                    onNext={handleNextQuestion}
                    onPaymentMethodSelected={(value) =>
                      handleDataUpdate("paymentMethod", value)
                    }
                  />
                </div>

                <div id="question-5" className="page">
                  <HowLoss
                    onNext={handleNextQuestion}
                    onHowLossSelected={(value) =>
                      handleDataUpdate("how_loss", value)
                    }
                  />
                </div>

                <div id="question-6" className="page">
                  <Victim onNext={handleNextQuestion} />
                </div>

                <div id="question-7" className="page">
                  <VictimName
                    onNext={handleNextQuestion}
                    onVictimNameSelected={(value) =>
                      handleDataUpdate("victim_name", value)
                    }
                  />
                </div>

                <div id="question-8" className="page">
                  <VictimPhone
                    onNext={handleNextQuestion}
                    onVictimPhoneSelected={(value) =>
                      handleDataUpdate("victim_phone", value)
                    }
                  />
                </div>

                <div id="question-9" className="page">
                  <VictimBirth
                    onNext={handleNextQuestion}
                    onVictimBirthSelected={(value) =>
                      handleDataUpdate("victim_birth", value)
                    }
                  />
                </div>

                <div id="question-10" className="page">
                  <VictimGender
                    onNext={handleNextQuestion}
                    onVictimGenderSelected={(value) =>
                      handleDataUpdate("victim_gender", value)
                    }
                  />
                </div>

                <div id="question-11" className="page">
                  <VictimQualification
                    onNext={handleNextQuestion}
                    onVictimQualificationSelected={(value) =>
                      handleDataUpdate("victim_qualification", value)
                    }
                  />
                </div>

                <div id="question-12" className="page">
                  <VictimAddress
                    onNext={handleNextQuestion}
                    onVictimAddressSelected={(value) =>
                      handleDataUpdate("victim_address", value)
                    }
                  />
                </div>

                <div id="question-13" className="page">
                  <PoliceStation
                    onNext={handleNextQuestion}
                    onPoliceStationSelected={(value) =>
                      handleDataUpdate("police_station", value)
                    }
                  />
                </div>

                <div id="question-14" className="page">
                  <Suspect onNext={handleNextQuestion} />
                </div>

                <div id="question-15" className="page">
                  <SuspectCall
                    onNext={handleNextQuestion}
                    onSuspectCallSelected={(value) =>
                      handleDataUpdate("suspect_call", value)
                    }
                  />
                </div>

                <div id="question-16" className="page">
                  <SuspectSpeak
                    onNext={handleNextQuestion}
                    onSuspectSpeakSelected={(value) =>
                      handleDataUpdate("suspect_speak", value)
                    }
                  />
                </div>

                <div id="question-17" className="page">
                  <SuspectContact
                    onNext={handleNextQuestion}
                    onSuspectContactSelected={(value) =>
                      handleDataUpdate("suspect_contact", value)
                    }
                  />
                </div>

                <div id="question-18" className="page">
                  <VictimBank
                    onNext={handleNextQuestion}
                    onVictimBankSelected={(value) =>
                      handleDataUpdate("victim_bank", value)
                    }
                  />
                </div>

                <div id="question-19" className="page">
                  <SuspectBank
                    onNext={handleNextQuestion}
                    onSuspectBankSelected={(value) =>
                      handleDataUpdate("suspect_bank", value)
                    }
                  />
                </div>

                <div id="question-20" className="page">
                  <Support
                    onNext={handleNextQuestion}
                    submitSupport={handleSupportData}
                  />
                </div>
                <div id="question-21" className="page">
                  <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', height:'100vh'}}>
                  <h1>click the below Submit button and save the details </h1>
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
          style={{ position: "fixed", bottom: "20px", right: "180px" }}
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
            disabled={currentQuestion === questionCount}
          >
            <IoIosArrowDown />
          </button>
        </div>
        <p style={{background:'#007bff', fontSize:'14px',height:'30px',color:'#ccc',paddingRight:'5px',paddingTop:'10px'}}>Power By Krishanas Digital</p>
        </div>
      </form>
    </>
  );
};

export default Questions;
