import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
//import Number from "../QuestionsList/Number";
//import axios from "axios";
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
import Suspect from "../QuestionsList/Suspect";
import SuspectCall from "../QuestionsList/SuspectCall";
import SuspectSpeak from "../QuestionsList/SuspectSpeak";
import SuspectContact from "../QuestionsList/SuspectContact";
import VictimBank from "../QuestionsList/VictimBank";
import SuspectBank from "../QuestionsList/SuspectBank";
import Support from "../QuestionsList/Support";
import HowMuch from "../QuestionsList/HowMuch";
import PoliceStation from "../QuestionsList/PoliceStation";
import TranslateComponent from "../TranslateComponent";
import Profession from "../QuestionsList/Profession";

//import Translate from "../QuestionsList/Translate";
// const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY'; // Replace with your API key

// const translateText = async (text, targetLang) => {
//   try {
//     const response = await axios.post(
//       `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
//       {
//           q: "this is English translation",
//           target: targetLang,
//           source: "en",
//       }
//     );
//     //return response.data.data.translations[0].translatedText;
//     console.log(response.data.data.translations[0].translatedText)
//   } catch (error) {
//     console.error('Translation API error:', error);
//     return text; // Fallback to original text in case of error
//   }
// };

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
  const [victimBanks, setVictimBanks] = useState([{}]);

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
    victim_bank: [{ id: 1, data: {} }],
    suspect_bank: [{ id: 1, data: {} }],
    support: "",
  });
  const addVictimBank = () => {
    setFormData((prevData) => ({
      ...prevData,
      victim_bank: [
        ...prevData.victim_bank,
        { id: prevData.victim_bank.length + 1, data: {} },
      ],
    }));
  };

  const addSuspectBank = () => {
    setFormData((prevData) => ({
      ...prevData,
      suspect_bank: [
        ...prevData.suspect_bank,
        { id: prevData.suspect_bank.length + 1, data: {} },
      ],
    }));
  };

  const removeVictimBank = (index) => {
    const updatedVictimBanks = victimBanks.filter((_, i) => i !== index);
    setVictimBanks(updatedVictimBanks);
  };

  const questionCount = formData.help === "A" ? 20 : 0;
  // const handlePhoneData = (phone) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     phone: phone,
  //   }));
  // };

  // const translateQuestions = async () => {
  //   const questions = [
  //     "Help",
  //     "How much",
  //     "Time",
  //     "Payment Method",
  //     "How Loss",
  //     "Victim",
  //     "Victim Name",
  //     "Victim Phone",
  //     "Victim Birth",
  //     "Victim Gender",
  //     "Victim Qualification",
  //     "Victim Address",
  //     "Suspect",
  //     "Suspect Call",
  //     "Suspect Speak",
  //     "Suspect Contact",
  //     "Support"
  //   ];

  //   const translations = {};
  //   for (const question of questions) {
  //     translations[question] = await translateText(question, language);
  //   }
  //   setTranslatedTexts(translations);
  // };

  // React.useEffect(() => {
  //   translateQuestions();
  // }, [language]);

  const isQuestionAnswered = (questionIndex) => {
    console.log(questionIndex, formData.help);
    switch (questionIndex) {
      case 0:
        return formData.help !== "";
      case 1:
        return formData.time !== "";
      case 2:
        return formData.how_much !== "";
      case 3:
        return formData.paymentMethod !== "";
      case 4:
        return true;
      case 5:
        return formData.victim_name !== "";
      case 6:
        return formData.victim_phone !== "";
      case 7:
        return formData.victim_birth !== "";
      case 8:
        return formData.victim_gender !== "";
      case 9:
        return formData.victim_qualification !== "";
      case 10:
        return formData.victim_address !== "";
      case 12:
        return true;
      case 13:
        return formData.suspect_call !== "";
      case 14:
        return formData.suspect_speak !== "";
      case 15:
        return formData.suspect_contact !== "";
      // Add more cases as needed for other questions
      default:
        return true;
    }
  };

  // const handleLanguageChange = (e) => {
  //   setLanguage(e.target.value);
  // };
  const handleDataUpdate = (key, value) => {
    console.log(key, value);
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSupportData = (support) => {
    console.log(support);
    setFormData((prevData) => ({
      ...prevData,
      support: support,
    }));
  };

  const handleNextClickQuestion = (currentQuestion) => {
    const nextQuestion = Math.min(currentQuestion, questionCount - 1);
    const element = document.querySelector(`#question-${nextQuestion}`);

    setCurrentQuestion(nextQuestion);
    element.scrollIntoView({ behavior: "smooth" });
  };

  const handleNextQuestion = (optionId, result) => {
    console.log(currentQuestion);
    if (
      currentQuestion === 6 ||
      currentQuestion === 13 ||
      isQuestionAnswered(currentQuestion)
    ) {
      console.log(true);
      const nextQuestion = Math.min(currentQuestion + 1, questionCount - 1);
      const element = document.querySelector(`#question-${nextQuestion}`);
      setCurrentQuestion(nextQuestion);
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log(false);
      alert("Please answer the current question before moving to the next.");
    }
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = Math.max(currentQuestion - 1, 0);
    setCurrentQuestion(prevQuestion);
    document
      .querySelector(`#question-${prevQuestion}`)
      .scrollIntoView({ behavior: "smooth" });
  };

  // const handleSubmit = async (e, support) => {
  //   console.log(support);
  //   e.preventDefault();
  //   console.log(formData);
  //   const apiUrl = "https://enrbgth6q54c8.x.pipedream.net"; // Replace with your actual API endpoint

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok.");
  //     }

  //     const result = await response.json();
  //     console.log("API response:", result);
  //     navigate("/success");
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  const isHeaderVisible = currentQuestion >= 4 || currentQuestion >= 10;
  const headerTitle = (() => {
    if (currentQuestion >= 4 && currentQuestion <= 9) return "Victim";
    if (currentQuestion >= 11 && currentQuestion <= 15) return "Suspect";
    return ""; // Default or empty title
  })();
  console.log(currentQuestion);
  return (
    <>
      <ProgressBar current={currentQuestion} total={questionCount} />
      {isHeaderVisible && (
        <header>
          {headerTitle && (
            <h1
              className="header-title"
              style={{ margin: 0, textAlign: "center" }}
            >
              {headerTitle}
            </h1>
          )}
        </header>
      )}
      <p style={{marginLeft:'60px',marginTop:'120px'}}> <TranslateComponent /></p>
      <form>
        {/* <div id="question-0">
          <Number
            onNext={handleNextQuestion}
            onPhone={(value) => handleDataUpdate("phone", value)}
          />
        </div> */}

        <>
          <div id="question-0" className="page">
            <Help
              onNext={handleNextClickQuestion}
              onHelpSelected={(value) => handleDataUpdate("help", value)}
            />
          </div>
          {formData.help === "A" && (
            <>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>

              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>
              <div id="question-1" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div>

              <div id="question-1" className="page">
                <Time
                  onNext={handleNextClickQuestion}
                  onTimeSelected={(value) => handleDataUpdate("time", value)}
                />
              </div>

              <div id="question-2" className="page">
                <HowMuch
                  onNext={handleNextClickQuestion}
                  onHowMuchSelected={(value) =>
                    handleDataUpdate("how_much", value)
                  }
                />
              </div>

              {/* <div id="question-3" className="page">
                <PaymentMethod
                  onNext={handleNextClickQuestion}
                  onPaymentMethodSelected={(value) =>
                    handleDataUpdate("paymentMethod", value)
                  }
                />
              </div> */}

              <div id="question-3" className="page">
                <Victim onNext={handleNextClickQuestion} />
              </div>

              <div id="question-4" className="page">
                <VictimName
                  onNext={handleNextClickQuestion}
                  onVictimNameSelected={(value) =>
                    handleDataUpdate("victim_name", value)
                  }
                />
              </div>

              <div id="question-5" className="page">
                <VictimPhone
                  onNext={handleNextClickQuestion}
                  onVictimPhoneSelected={(value) =>
                    handleDataUpdate("victim_phone", value)
                  }
                />
              </div>

              <div id="question-6" className="page">
                <VictimBirth
                  onNext={handleNextClickQuestion}
                  onVictimBirthSelected={(value) =>
                    handleDataUpdate("victim_birth", value)
                  }
                />
              </div>

              <div id="question-7" className="page">
                <VictimGender
                  onNext={handleNextClickQuestion}
                  onVictimGenderSelected={(value) =>
                    handleDataUpdate("victim_gender", value)
                  }
                />
              </div>

              <div id="question-8" className="page">
                <Profession
                  onNext={handleNextClickQuestion}
                  onVictimProfessionSelected={(value) =>
                    handleDataUpdate("victim_Profession", value)
                  }
                />
              </div>

              <div id="question-9" className="page">
                <VictimQualification
                  onNext={handleNextClickQuestion}
                  onVictimQualificationSelected={(value) =>
                    handleDataUpdate("victim_qualification", value)
                  }
                />
              </div>

              <div id="question-10" className="page">
                <VictimAddress
                  onNext={handleNextClickQuestion}
                  onVictimAddressSelected={(value) =>
                    handleDataUpdate("victim_address", value)
                  }
                />
              </div>

              {/* <div id="question-12" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onPoliceStationSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                />
              </div> */}

              <div id="question-11" className="page">
                <Suspect onNext={handleNextClickQuestion} />
              </div>

              <div id="question-12" className="page">
                <SuspectCall
                  onNext={handleNextClickQuestion}
                  onSuspectCallSelected={(value) =>
                    handleDataUpdate("suspect_call", value)
                  }
                />
              </div>

              <div id="question-13" className="page">
                <SuspectSpeak
                  onNext={handleNextClickQuestion}
                  onSuspectSpeakSelected={(value) =>
                    handleDataUpdate("suspect_speak", value)
                  }
                />
              </div>

              <div id="question-14" className="page">
                <SuspectContact
                  onNext={handleNextClickQuestion}
                  onSuspectContactSelected={(value) =>
                    handleDataUpdate("suspect_contact", value)
                  }
                />
              </div>
              <div id="question-15" className="page">
                <PaymentMethod
                  onNext={handleNextClickQuestion}
                  onPaymentMethodSelected={(value) =>
                    handleDataUpdate("paymentMethod", value)
                  }
                />
              </div>
              <div
                id="question-16"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* Render multiple VictimBank instances */}
                {formData.victim_bank.map((item, index) => (
                  <div
                    key={item.id}
                    id={`question-victim-bank-${index}`}
                    className="page"
                  >
                    <VictimBank
                      index={index}
                      onNext={handleNextClickQuestion}
                      onVictimBankSelected={(value) =>
                        handleDataUpdate("victim_bank", value, index)
                      }
                      addVictimBank={addVictimBank}
                    />
                  </div>
                ))}
              </div>

              <div
                id="question-17"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {formData.suspect_bank.map((item, index) => (
                  <div
                    key={item.id}
                    id={`question-suspect-bank-${index}`}
                    className="page"
                  >
                    <SuspectBank
                      index={index}
                      onNext={handleNextClickQuestion}
                      onSuspectBankSelected={(value) =>
                        handleDataUpdate("suspect_bank", value, index)
                      }
                      addSuspectBank={addSuspectBank}
                    />
                    {victimBanks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVictimBank(index)}
                      >
                        Remove This Bank
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div id="question-18" className="page">
                <Support
                  onNext={handleNextClickQuestion}
                  submitSupport={handleSupportData}
                />
              </div>
              <div id="question-19" className="page">
                <HowLoss
                  onNext={handleNextClickQuestion}
                  onHowLossSelected={(value) =>
                    handleDataUpdate("how_loss", value)
                  }
                />
              </div>
              {/* <div id="question-19" className="page">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <h1 className="submit-title">
                    Click the below Submit button and save the details
                  </h1>
                  <button className="submit-button" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div> */}
            </>
          )}
        </>
        <div
          className="navigation-buttons"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            bottom: "0px",
            right: "0px",
          }}
        >
          <div className="navigation-buttons">
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
              disabled={
                questionCount === 0
                  ? -1
                  : !isQuestionAnswered(currentQuestion) ||
                    currentQuestion === 20
              }
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
