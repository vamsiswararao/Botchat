import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Number from "../Number";
import Help from "../Help";
import Time from "../Time";
import PaymentMethod from "../PaymentMethod";
import HowLoss from "../HowLoss";
import Victim from "../Victim";
import VictimName from "../VictimName";
import VictimPhone from "../VictimPhone";
import VictimBirth from "../VictimBirth";
import VictimGender from "../VictimGender";
import VictimQualification from "../VictimQualification";
import VictimAddress from "../VictimAddress";
import PoliceStation from "../PoliceStation";
import Suspect from "../Suspect";
import SuspectCall from "../SuspectCall";
import SuspectSpeak from "../SuspectSpeak";
import SuspectContact from "../SuspectContact";
import VictimBank from "../VictimBank";
import SuspectBank from "../SuspectBank";
import Support from "../Support";
import HowMuch from "../HowMuch";


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

const Scroll = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [help, setHelp] = useState("");
  const questionCount = 21;

  const [formData, setFormData] = useState({
    phone: "",
    help: "",
    how_much:'',
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


  
  const handleHelpData = (help) => {
    setHelp(help)
    console.log(help);
    setFormData((prevData) => ({
      ...prevData,
      help: help,
    }));
  };

  const handleHowMuchData = (howMuch) => {
    console.log(howMuch);
    setFormData((prevData) => ({
      ...prevData,
      how_much: howMuch,
    }));
  };
  const handleTimeData = (time) => {
    console.log(time);
    setFormData((prevData) => ({
      ...prevData,
      time: time,
    }));
  };


  const handlePaymentMethodData = (data) => {
    console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      paymentMethod: data,
    }));
  };


  const handleHowLossData = (HowLoss) => {
    console.log(HowLoss);
    setFormData((prevData) => ({
      ...prevData,
      how_loss: HowLoss,
    }));
  };


  const handleVictimNameData = (victimName) => {
    console.log(victimName);
    setFormData((prevData) => ({
      ...prevData,
      victim_name: victimName,
    }));
  };

  
  const handleVictimPhoneData = (victimPhone) => {
    console.log(victimPhone);
    setFormData((prevData) => ({
      ...prevData,
      victim_phone: victimPhone,
    }));
  };


  const handleVictimBirthData = (victimBirth) => {
    console.log(victimBirth);
    setFormData((prevData) => ({
      ...prevData,
      victim_birth: victimBirth,
    }));
  };


  const handleVictimGenderData = (victimGender) => {
    console.log(victimGender);
    setFormData((prevData) => ({
      ...prevData,
      victim_gender: victimGender,
    }));
  };

  const handleVictimQualificationData = (victimQualification) => {
    console.log(victimQualification);
    setFormData((prevData) => ({
      ...prevData,
      victim_qualification: victimQualification,
    }));
  };

  const handleVictimAddressData   = (victimAddress) => {
    console.log(victimAddress);
    setFormData((prevData) => ({
      ...prevData,
      victim_address:victimAddress,
    }));
  };

  const handlePoliceStationData   = (policeStation) => {
    console.log(policeStation);
    setFormData((prevData) => ({
      ...prevData,
      police_station: policeStation,
    }));
  };
  

  const handleSuspectCallData  = (suspectCall) => {
    console.log(suspectCall);
    setFormData((prevData) => ({
      ...prevData,
      suspect_call: suspectCall,
    }));
  };


  const handleSuspectSpeakData  = (suspectSpeck) => {
    console.log(suspectSpeck);
    setFormData((prevData) => ({
      ...prevData,
      suspect_speak: suspectSpeck,
    }));
  };

  const handleSuspectContactData = (suspectContact) => {
    console.log(suspectContact);
    setFormData((prevData) => ({
      ...prevData,
      suspect_contact: suspectContact,
    }));
  };

  const handleVictimBankData = (VictimBank) => {
    console.log(VictimBank);
    setFormData((prevData) => ({
      ...prevData,
      victim_bank: VictimBank,
    }));
  };
  const handleSuspectBankData = (suspectBank) => {
    console.log(suspectBank);
    setFormData((prevData) => ({
      ...prevData,
      suspect_bank: suspectBank,
    }));
  };
  // const handleSupportData = (support) => {
  //   console.log(support);
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     support: support,
  //   }));
  // };


  const handleNextQuestion = (optionId) => {
    if (currentQuestion === 0 && !isPhoneValid) {
      alert("Please enter a valid phone number before proceeding.");
      return;
    }

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

  const handlePhoneValid = (valid, value) => {
    setIsPhoneValid(valid);
    handlePhoneData(value);
  };

  const handleSubmit = async(e,support) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      support: support,
    }));
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
          <Number onPhoneValid={handlePhoneValid} onNext={handleNextQuestion} />
        </div>
        {isPhoneValid && (
          <>
            <div id="question-1" className="page">
              <Help onNext={handleNextQuestion} onHelpSelected={handleHelpData} />
            </div>
            {help === "A" && (
              <>
                <div id="question-2" className="page">
                  <HowMuch onNext={handleNextQuestion} onHowMuchSelected={handleHowMuchData} />
                </div>
                <div id="question-3" className="page">
                  <Time onNext={handleNextQuestion} onTimeSelected={handleTimeData} />
                </div>

                <div id="question-4" className="page">
                  <PaymentMethod onNext={handleNextQuestion} onPaymentMethodSelected={handlePaymentMethodData} />
                </div>

                <div id="question-5" className="page">
                  <HowLoss onNext={handleNextQuestion} onHowLossSelected={handleHowLossData}/>
                </div>

                <div id="question-6" className="page">
                  <Victim onNext={handleNextQuestion} />
                </div>

                <div id="question-7" className="page">
                  <VictimName onNext={handleNextQuestion} onVictimNameSelected={handleVictimNameData}/>
                </div>

                <div id="question-8" className="page">
                  <VictimPhone onNext={handleNextQuestion}  onVictimPhoneSelected={handleVictimPhoneData}/>
                </div>

                <div id="question-9" className="page">
                  <VictimBirth onNext={handleNextQuestion}  onVictimBirthSelected={handleVictimBirthData}/>
                </div>

                <div id="question-10" className="page">
                  <VictimGender onNext={handleNextQuestion}  onVictimGenderSelected={handleVictimGenderData}/>
                </div>

                <div id="question-11" className="page">
                  <VictimQualification onNext={handleNextQuestion} onVictimQualificationSelected={handleVictimQualificationData}/>
                </div>

                <div id="question-12" className="page">
                  <VictimAddress onNext={handleNextQuestion} onVictimAddressSelected={handleVictimAddressData}/>
                </div>

                <div id="question-13" className="page">
                  <PoliceStation onNext={handleNextQuestion} onPoliceStationSelected={handlePoliceStationData}/>
                </div>

                <div id="question-14" className="page">
                  <Suspect onNext={handleNextQuestion} />
                </div>

                <div id="question-15" className="page">
                  <SuspectCall onNext={handleNextQuestion} onSuspectCallSelected={handleSuspectCallData}/>
                </div>

                <div id="question-16" className="page">
                  <SuspectSpeak onNext={handleNextQuestion} onSuspectSpeakSelected={handleSuspectSpeakData}/>
                </div>

                <div id="question-17" className="page">
                  <SuspectContact onNext={handleNextQuestion} onSuspectContactSelected={handleSuspectContactData}/>
                </div>

                <div id="question-18" className="page">
                  <VictimBank onNext={handleNextQuestion} onVictimBankSelected={handleVictimBankData}/>
                </div>

                <div id="question-19" className="page">
                  <SuspectBank onNext={handleNextQuestion} onSuspectBankSelected={handleSuspectBankData}/>
                </div>

                <div id="question-20" className="page">
                  <Support submit={handleSubmit} />
                </div>
              </>
            )}
          </>
        )}
        <div
          className="navigation-buttons"
          style={{ position: "fixed", bottom: "10px", right: "10px" }}
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
      </form>
    </>
  );
};

export default Scroll;
