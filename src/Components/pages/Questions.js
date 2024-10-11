import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
//import Number from "../QuestionsList/Number";
//import axios from "axios";
import Help from "../QuestionsList/Help";
import Time from "../QuestionsList/Time";
//import PaymentMethod from "../QuestionsList/PaymentMethod";
import HowLoss from "../QuestionsList/HowLoss";
import Victim from "../QuestionsList/Victim";
import VictimName from "../QuestionsList/VictimName";
//import VictimPhone from "../QuestionsList/VictimPhone";
//import VictimBirth from "../QuestionsList/VictimBirth";
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
import TranslateComponent from "../TranslateComponent";
import Profession from "../QuestionsList/Profession";
import PoliceStation from "../QuestionsList/PoliceStation";

const questionSequence = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18"
];

const ProgressBar = ({ current, total, question }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div
      style={{
        position: "fixed",
        top: 160,
        right: "35%",
        width: "30%",
        padding: "0px",
        zIndex: 1000, // Ensure it stays above other content
        textAlign: "center",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 170,
          right: "35%",
          width: "30%",
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
      <div style={{display:'flex', justifyContent:'center'}}>
        <p>{question}</p>
        <p> / 18</p>
      </div>
    </div>
  );
};

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  //const [victimBanks, setVictimBanks] = useState([{}]);
  const [question, setQuestion] = useState(1);
  const [suspectValue, setSuspectValue] = useState(0)
  const [victimValue, setVictimValue] = useState(0)
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [answerQuestion, setAnswerQuestion] = useState(Array(16).fill(false));

  const [formData, setFormData] = useState({
    help: "",
    how_much: "",
    time: "",
    how_loss: "",
    victim_name: "",
    victim_age: "",
    victim_gender: "",
    victim_Profession: "",
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
    setVictimValue(formData.suspect_bank.length)
  };

  const addSuspectBank = () => {
    setFormData((prevData) => ({
      ...prevData,
      suspect_bank: [
        ...prevData.suspect_bank,
        { id: prevData.suspect_bank.length + 1, data: {} },
      ],
    }));
  setSuspectValue(formData.suspect_bank.length)
  };

  const questionCount = 18 



  // const handleLanguageChange = (e) => {
  //   setLanguage(e.target.value);
  // };
  const handleDataUpdate = (key, value) => {
    console.log(key, value);
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    console.log(answerQuestion)
    const updatedAnswers = [...answerQuestion];
    console.log(currentQuestion)
    updatedAnswers[currentQuestion] = false;  // Mark as unanswered
    setAnswerQuestion(updatedAnswers);
  };

  const handleQuestionChange = (value) => {
    console.log(value);
    setQuestion(value);
  };

  const handleSupportData = (support) => {
    console.log(support);
    setFormData((prevData) => ({
      ...prevData,
      support: support,
    }));
  };

  const handleNextPageClickQuestion = (value) => {
    //const nextQuestion = Math.min(currentQuestion, questionCount - 1);
    const element = document.querySelector(`#question-suspect-bank-${value}`);

    // setCurrentQuestion(nextQuestion);
    element.scrollIntoView({ behavior: "smooth" });
  };

  const handleNextClickQuestion = (currentQuestion) => {
    const nextQuestion = Math.min(currentQuestion, questionCount - 1);
    const element = document.querySelector(`#question-${nextQuestion}`);

    setCurrentQuestion(nextQuestion);
    //setAnswerQuestion(false)
    element.scrollIntoView({ behavior: "smooth" });
  };

  const isQuestionAnswered = (questionIndex) => {
    //console.log(questionIndex.victim_bank);
     switch (questionIndex) {
       case 0:
         return formData.help !== "";
       case 1:
         return formData.time !== "";
       case 2:
         return formData.how_much !== "";
       case 3:
         return true;
       case 4:
         return formData.victim_name !== "" && formData.victim_age !== "";
       case 5:
         return formData.victim_gender !== "";
       case 6:
         return formData.victim_Profession !== "";
       case 7:
         return formData.victim_qualification !== "";
       case 8:
         return formData.victim_address !== "";
      case 9:
          return formData.police_station !== "";
       case 10:
         return true;
       case 11:
         return formData.suspect_call !== "";
       case 12:
         return formData.suspect_speak !== "";
       case 13:
         return formData.suspect_contact !== "";
         case 14:
         return formData.victim_bank !== "";
       // Add more cases as needed for other questions
       default:
         return true;
     }
   };


   useEffect(() => {
    setIsNextDisabled(!isQuestionAnswered(currentQuestion-1));
  }, [formData, currentQuestion]);

  const handleNextQuestion = (optionId, result) => {
    
    console.log(currentQuestion);
    console.log(victimValue,formData.victim_bank.length)
    console.log( suspectValue,formData.suspect_bank.length);
    //console.log(isQuestionAnswered(currentQuestion));
    if (isQuestionAnswered(currentQuestion)) {
      console.log(true);
      const updatedAnswers = [...answerQuestion];
      updatedAnswers[currentQuestion] = false;  // Mark as answered
      setAnswerQuestion(updatedAnswers);
      if(currentQuestion===13 && formData.victim_bank.length > victimValue){
        console.log(1)
        setVictimValue(victimValue+1)
        window.scrollBy({ top:window.innerHeight*1.1 , behavior: 'smooth' });
        const nextQuestion = Math.min(currentQuestion + 1, questionCount - 1);
        console.log(nextQuestion);
        setQuestion(questionSequence[nextQuestion])
        setSuspectValue(1)
      }
      else if(currentQuestion===15 && formData.suspect_bank.length > suspectValue) {
        console.log(2)
        setSuspectValue(suspectValue+1)
        window.scrollBy({ top: window.innerHeight*1.3, behavior: 'smooth' });
        const nextQuestion = Math.min(currentQuestion + 1, questionCount - 1);
        console.log(nextQuestion);
        setCurrentQuestion(nextQuestion);
        setQuestion(questionSequence[nextQuestion]);
      }
      else{
        console.log(3)
        setVictimValue(1)
         if( (currentQuestion===13 && formData.victim_bank.length>1 )){
          const nextQuestion = Math.min(currentQuestion + 2, questionCount - 1);
          console.log(nextQuestion);
          const element = document.querySelector(`#question-${nextQuestion}`);
          setCurrentQuestion(nextQuestion);
          setSuspectValue(suspectValue+1)
          setQuestion(questionSequence[nextQuestion]);
          element.scrollIntoView({ behavior: "smooth" });
         }else{
          console.log(4)
         const nextQuestion = Math.min(currentQuestion + 1, questionCount - 1);
         console.log(nextQuestion);
      const element = document.querySelector(`#question-${nextQuestion}`);
      setCurrentQuestion(nextQuestion);
      setQuestion(questionSequence[nextQuestion]);
      element.scrollIntoView({ behavior: "smooth" });
         }
      }
    } else {
      console.log(false);
      console.log(answerQuestion)
      const updatedAnswers = [...answerQuestion];
      console.log(updatedAnswers)
      updatedAnswers[currentQuestion] = true;  // Mark as unanswered
      setAnswerQuestion(updatedAnswers);
    }
  
  };


  const handlePreviousQuestion = () => {
    console.log(currentQuestion,suspectValue,formData.suspect_bank.length);
    console.log(victimValue,formData.victim_bank.length);
    if(currentQuestion===15 &&  victimValue  <= 0){
      console.log(1)
      window.scrollBy({ top: -768, behavior: 'smooth' });
      setVictimValue(victimValue-1)
    } else if(currentQuestion===16 && suspectValue < 0){
      console.log(2)
      window.scrollBy({ top: -768, behavior: 'smooth' });
      setSuspectValue(suspectValue-1)
      setVictimValue(formData.victim_bank.length-1)
    }else{
      if(currentQuestion===17 ){
        console.log(3)
        setSuspectValue(formData.suspect_bank.length-1)
        const prevQuestion = Math.max(currentQuestion - 1, 1);
        setCurrentQuestion(prevQuestion);
        setQuestion(questionSequence[prevQuestion]);
        document
          .querySelector(`#question-${prevQuestion}`)
          .scrollIntoView({ behavior: "smooth" });
         
      }
      console.log(4)
    const prevQuestion = Math.max(currentQuestion - 1, 0);
    setCurrentQuestion(prevQuestion);
    console.log(prevQuestion)
    setQuestion(questionSequence[prevQuestion]);
    document
      .querySelector(`#question-${prevQuestion}`)
      .scrollIntoView({ behavior: "smooth" });
    }
  };

  const isHeaderVisible =
    (currentQuestion >= 4 && currentQuestion <= 9) ||
    (currentQuestion >= 11 && currentQuestion <= 14);
  const headerTitle = (() => {
    if (
      (currentQuestion >= 4 && currentQuestion <= 9) ||
      currentQuestion === 14
    ) {
      return "Victim";
    }
    if (
      (currentQuestion >= 10 && currentQuestion <= 13) ||
      currentQuestion === 15
    )
      return "Suspect";
    return ""; // Default or empty title
  })();
  //console.log(isHeaderVisible, headerTitle);
  return (
    <div style={{height:'100vh'}}>
      <ProgressBar
        question={question}
        current={currentQuestion}
        total={questionCount}
      />
      {isHeaderVisible && (
        <div className="victim-header">
          {headerTitle && (
            <h1
              className="header-title"
              style={{ margin: 0, textAlign: "center" }}
            >
              {headerTitle}
            </h1>
          )}
        </div>
      )}
      <form>
        <header>
          <div style={{display:'flex',flexDirection:'colum',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
          <img src="\images\LOGO-TS2.jpg" alt="csb-ts" className="cst-logo"/>
          <h1
            className="header-title"
            style={{ textAlign: "center" }}
          >
            1930-Cyber Bot
          </h1>
          <img src="\images\LOGO-INDIA.png" alt="csb-ts" className="csi-logo"/>
          </div>
        </header>
        <div id="question-0" className="page" style={{marginTop:'200px'}}>
          <Help
            onNext={handleNextClickQuestion}
            onHelpSelected={(value) => handleDataUpdate("help", value)}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
          />
        </div>
        <>
          {formData.help === "A" && (
            <>
              <div id="question-1" className="page">
                <Time
                  onNext={handleNextClickQuestion}
                  onTimeSelected={(value) => handleDataUpdate("time", value)}
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>

              <div id="question-2" className="page">
                <HowMuch
                  onNext={handleNextClickQuestion}
                  onHowMuchSelected={(value) =>
                    handleDataUpdate("how_much", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>
              <div id="question-3" className="page">
                <Victim
                  onNext={handleNextClickQuestion}
                  onQuestion={handleQuestionChange}
                />
              </div>

              <div id="question-4" className="page">
                <VictimName
                  onNext={handleNextClickQuestion}
                  onVictimNameSelected={(value) =>
                    handleDataUpdate("victim_name", value)
                  } // Updates victim_name
                  onVictimAgeSelected={(value) =>
                    handleDataUpdate("victim_age", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>
              <div id="question-5" className="page">
                <VictimGender
                  onNext={handleNextClickQuestion}
                  onVictimGenderSelected={(value) =>
                    handleDataUpdate("victim_gender", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>

              <div id="question-6" className="page">
                <Profession
                  onNext={handleNextClickQuestion}
                  onVictimProfessionSelected={(value) =>
                    handleDataUpdate("victim_Profession", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>

              <div id="question-7" className="page">
                <VictimQualification
                  onNext={handleNextClickQuestion}
                  onVictimQualificationSelected={(value) =>
                    handleDataUpdate("victim_qualification", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>

              <div id="question-8" className="page">
                <VictimAddress
                  onNext={handleNextClickQuestion}
                  onVictimAddressSelected={(value) =>
                    handleDataUpdate("victim_address", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>
              <div id="question-9" className="page">
                <PoliceStation
                  onNext={handleNextClickQuestion}
                  onVictimAddressSelected={(value) =>
                    handleDataUpdate("police_station", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>
              <div id="question-10" className="page">
                <Suspect
                  onNext={handleNextClickQuestion}
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>

              <div id="question-11" className="page">
                <SuspectCall
                  onNext={handleNextClickQuestion}
                  onSuspectCallSelected={(value) =>
                    handleDataUpdate("suspect_call", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>

              <div id="question-12" className="page">
                <SuspectSpeak
                  onNext={handleNextClickQuestion}
                  onSuspectSpeakSelected={(value) =>
                    handleDataUpdate("suspect_speak", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>

              <div id="question-13" className="page">
                <SuspectContact
                  onNext={handleNextClickQuestion}
                  onSuspectContactSelected={(value) =>
                    handleDataUpdate("suspect_contact", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>
              <div
                id="question-14"
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
                      onQuestion={handleQuestionChange}
                      answer={answerQuestion}
                    />
                  </div>
                ))}
              </div>

              <div
                id="question-15"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {formData.suspect_bank.map((item, index) => (
                  <div
                    key={item.id}
                    id={`question-suspect-bank-${index}`}
                    className="page"
                  >
                    <SuspectBank
                      key={index}
                      index={index}
                      onNext={handleNextClickQuestion}
                      onSuspectBankSelected={(value) =>
                        handleDataUpdate("suspect_bank", value, index)
                      }
                      addSuspectBank={addSuspectBank}
                      onQuestion={handleQuestionChange}
                      onNextPage={handleNextPageClickQuestion}
                      answer={answerQuestion}
                    />
                  </div>
                ))}
              </div>

              <div id="question-16" className="page">
                <Support
                  onNext={handleNextClickQuestion}
                  submitSupport={handleSupportData}
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>
              <div id="question-17" className="page">
                <HowLoss
                  onNext={handleNextClickQuestion}
                  onHowLossSelected={(value) =>
                    handleDataUpdate("how_loss", value)
                  }
                  onQuestion={handleQuestionChange}
                  answer={answerQuestion}
                />
              </div>
            </>
          )}
        </>
        <p
       className="translate"
        >
          <TranslateComponent />
        </p>
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
              disabled={currentQuestion <= 0}
            >
              <IoIosArrowUp />
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={handleNextQuestion}
              disabled={
                currentQuestion === questionCount || // Disable if it's the last question
                isNextDisabled  // Disable if the current question is not answered
              }
            >
              <IoIosArrowDown />
            </button>
          </div>
          <p className="company-name">Power By Krishanas Digital</p>
        </div>
      </form>
    </div>
  );
};

export default Questions;
