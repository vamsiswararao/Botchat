import React, { useCallback, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Cookies from "js-cookie";
import Time from "../QuestionsList/Time";
import HowLoss from "../QuestionsList/HowLoss";
import Victim from "../QuestionsList/Victim";
import VictimName from "../QuestionsList/VictimName";
//import VictimGender from "../QuestionsList/VictimGender";
import VictimQualification from "../QuestionsList/VictimQualification";
import VictimAddress from "../QuestionsList/VictimAddress";
import Suspect from "../QuestionsList/Suspect";
import SuspectCall from "../QuestionsList/SuspectCall";
import SuspectSpeak from "../QuestionsList/SuspectSpeak";
//import SuspectContact from "../QuestionsList/SuspectPlatform";
import VictimBank from "../QuestionsList/VictimBank";
import SuspectBank from "../QuestionsList/SuspectBank";
import Support from "../QuestionsList/Support";
import HowMuch from "../QuestionsList/HowMuch";
import TranslateComponent from "../TranslateComponent";
import Profession from "../QuestionsList/Profession";
import PoliceStation from "../QuestionsList/PoliceStation";
import appVersion from "../../version";
import Header from "./Header";
import SuspectPlatform from "../QuestionsList/SuspectPlatform";
import BankUpload from "../QuestionsList/BankUpload";
const apiKey = process.env.REACT_APP_AUTH_TOKEN;

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
  "18",
];

const ProgressBar = ({ current, total, question }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div>
      <div className="bar-text">
        <div className="bar-line">
          <div
            style={{
              width: `${progress}%`,
              backgroundColor: "#007bff", // Blue color
              height: "3px",
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p>{question}</p>
          <p>&nbsp;/&nbsp;17</p>
        </div>
      </div>
    </div>
  );
};

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [question, setQuestion] = useState(1);
  //const [suspectValue, setSuspectValue] = useState(0);
  //const [victimValue, setVictimValue] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [answerQuestion, setAnswerQuestion] = useState(Array(16).fill(false));
  const vist_id = Cookies.get("visitor_id");
  const botToken = Cookies.get("bot_token");
  const app_ver = appVersion.app_ver;

  // useEffect(() => {
  //   //Retrieve localStorage keys and their lengths
  //   const keys = Object.keys(localStorage);
  //   const keyLengths = keys.map(key => ({ key, length: key.length }));

  //   console.log(keyLengths.length);

  //   //Update the answerQuestion array to fill 'true' for the length of keyLengths
  //   const updatedAnswers = answerQuestion.map((item, index) =>
  //     index-1 < keyLengths.length ? true : item
  //   );
  //   const element = document.querySelector(`#question-${keyLengths.length-1}`);
  //   element.scrollIntoView({ behavior: "smooth" });
  //   console.log()
  //   setAnswerQuestion(updatedAnswers);
  //   console.log(keyLengths.length)
  //   setQuestion(keyLengths.length)
  //   setCurrentQuestion(keyLengths.length)
  // }, []);

  // useEffect(() => {
  //   // Save the current question to localStorage whenever it changes
  //   localStorage.setItem('currentQuestion', question);
  // }, [question]);

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
    suspect_contact: {"contactValues":[],"contactIds":[]},
    victim_bank: [{ id: 1, data: {} }],
    suspect_bank: [{ id: 1, data: {} }],
    support: "",
    address: "",
    supports: "",
    bank_file: [],
    phone_number:'',
  });

  useEffect(() => {
    if (formData.time !== "") {
      const element = document.querySelector(`#question-2`);

      setCurrentQuestion(2);
      setQuestion(2);
      //setAnswerQuestion(false)
      element.scrollIntoView({ behavior: "auto" });
    }
  }, [formData.time]);

  const addVictimBank = () => {
    setFormData((prevData) => ({
      ...prevData,
      victim_bank: [
        ...prevData.victim_bank,
        { id: prevData.victim_bank.length + 1, data: {} },
      ],
    }));
    //setVictimValue(formData.suspect_bank.length);
  };

  const addSuspectBank = () => {
    setFormData((prevData) => ({
      ...prevData,
      suspect_bank: [
        ...prevData.suspect_bank,
        { id: prevData.suspect_bank.length + 1, data: {} },
      ],
    }));
    //setSuspectValue(formData.suspect_bank.length);
  };

  const questionCount = 18;

  const handleDataUpdate = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
    const updatedAnswers = [...answerQuestion];
    updatedAnswers[currentQuestion] = false; // Mark as unanswered
    setAnswerQuestion(updatedAnswers);
  };

  const handleQuestionChange = (value) => {
    setQuestion(value - 1);
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

  // function clearStorageAndRedirectHome() {
  //   setTimeout(() => {
  //     // Clear all data from localStorage and sessionStorage
  //     localStorage.clear();
  //     sessionStorage.clear();

  //     console.log("Local and session storage cleared. Redirecting to the home page.");

  //     // Redirect to the home page (assuming '/' is the home page)
  //     window.location.replace('/');
  //     // Alternatively, you can use: window.location.href = '/';
  //   }, 15 * 60 * 1000); // 15 minutes in milliseconds (900000 ms)
  // }

  // // Call the function
  // clearStorageAndRedirectHome();

  const policeStation = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      police_station: value,
    }));
    const updatedAnswers = [...answerQuestion];
    updatedAnswers[currentQuestion] = false; // Mark as unanswered
    // console.log(updatedAnswers)
    setAnswerQuestion(updatedAnswers);
  };

  const Address = (value) => {

    setFormData((prevData) => ({
      ...prevData,
      address: value,
    }));
    const updatedAnswers = [...answerQuestion];
    updatedAnswers[currentQuestion] = false; // Mark as unanswered
    //console.log(updatedAnswers)
    setAnswerQuestion(updatedAnswers);
  };

  const isQuestionAnswered = useCallback((questionIndex) => {
    //console.log(formData.suspect_call.contactValues[0])
  //   console.log(questionIndex)
  // console.log(formData.victim_name ,
  //   formData.victim_age,
  //   formData.victim_gender);
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
        return formData.bank_file[0] !== undefined;
      case 5:
        return true;
      case 6:
        return (
          formData.victim_name !== "" &&
          formData.victim_age !== "" &&
          formData.victim_gender !== ""
        );
      case 7:
        return formData.victim_Profession !== "";
      case 8:
        return formData.victim_qualification !== "";
      case 9:
        return (
          formData.police_station.district !== undefined &&
          formData.police_station.policeStation !== undefined
        );
      case 10:
        return (
          formData.address.zip !== undefined &&
          formData.address.city !== undefined
        );
      case 11:
        return true;
      case 12:
        return formData.suspect_call !== "";
      case 13:
        return true;
      case 14:
        return formData.suspect_speak !== "";
      case 15:
        return formData.suspect_contact !== "";
      case 16:
        return formData.victim_bank.data !== "";
      case 17:
        return formData.supports !== "";
      // Add more cases as needed for other questions
      default:
        return true;
    }
  },[formData]);

  useEffect(() => {
    setIsNextDisabled(!isQuestionAnswered(currentQuestion - 1));
  }, [formData, currentQuestion,isQuestionAnswered]);

  // Scroll to a specific question element smoothly
  const scrollToQuestion = (questionIndex) => {
    const element = document.querySelector(`#question-${questionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Move to the next question based on various conditions
  const handleNextQuestion = (optionId, result) => {
    // console.log(currentQuestion, formData.victim_bank.length, victimValue);
    // const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as per your design
    // const scrollAmount = isMobile
    //   ? window.innerHeight *1.36
    //   : window.innerHeight * 1.2;
  
    if (isQuestionAnswered(currentQuestion)) {
      const updatedAnswers = [...answerQuestion];
      updatedAnswers[currentQuestion] = false; // Mark current question as answered
      setAnswerQuestion(updatedAnswers);

      // Case: victim bank handling
      // if  (currentQuestion === 13 && victimValue === 1) {
      //   console.log("7");
      //   setVictimValue(victimValue + 1);
      //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      //   setNextQuestion(currentQuestion + 1);
      //   setSuspectValue(1);

      //   // Case: suspect bank handling
      // }  else if (currentQuestion === 14 && victimValue < formData.victim_bank.length) {
      //   console.log("2");
      //   setVictimValue(victimValue + 1);
      //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      //   //setNextQuestion(currentQuestion + 1);
      //   setSuspectValue(1);

      //   // Case: suspect bank handling
      //  }
      //else if  (currentQuestion === 14 &&victimValue > formData.victim_bank.length) {
      //   console.log("8");
      //   setVictimValue(victimValue + 1);
      //   //window.scrollBy({ top: window.innerHeight * 1.2, behavior: 'smooth' });
      //   setNextQuestion(currentQuestion + 1);
      //   setSuspectValue(1);

      //   // Case: suspect bank handling
      // }
      // else if (currentQuestion === 15 && suspectValue < formData.suspect_bank.length) {
      //   console.log("3");
      //   setSuspectValue(suspectValue + 1);
      //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });

      // } else {
      //   setVictimValue(1);
      //   // Skipping two questions for victim bank handling
      //   if (currentQuestion === 13 && formData.victim_bank.length === 1) {
      //     console.log("4");
      //     setNextQuestion(currentQuestion + 2);
      //     setSuspectValue(1);
      //   } else {
      //     console.log("5");
      setNextQuestion(currentQuestion + 1);
      //}
      //}
    } else {
      // console.log("6");
      const updatedAnswers = [...answerQuestion];
      updatedAnswers[currentQuestion] = true; // Mark current question as unanswered
      setAnswerQuestion(updatedAnswers);
    }
  };

  // Move to the previous question
  const handlePreviousQuestion = () => {
    // const isMobile = window.innerWidth <= 768; // Adjust the width breakpoint as per your design
    // const scrollAmount = isMobile
    //   ? -window.innerHeight *1.36
    //   : -window.innerHeight * 1.25;
    // console.log(currentQuestion, formData.victim_bank.length, victimValue,suspectValue);

    // if(currentQuestion ===16 && victimValue ===1){
    //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    //   setVictimValue(victimValue + 1);
    //   console.log("A")
    // }else if (currentQuestion === 16 && victimValue <= (formData.suspect_bank.length)) {
    //   console.log("B")
    //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    //   setVictimValue(victimValue + 1);

    // }else if (currentQuestion === 16 && victimValue === (formData.suspect_bank.length+1)) {
    //   console.log("C")
    //   setPreviousQuestion(currentQuestion - 1);

    // }   else if(currentQuestion ===15 && suspectValue ===1){
    //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    //   setVictimValue(suspectValue + 1);
    //   console.log("A")
    // }else if (currentQuestion === 15 && suspectValue <= (formData.victim_bank.length)) {
    //   console.log("B")
    //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    //   setVictimValue(suspectValue + 1);

    // }else if (currentQuestion === 15 && victimValue === (formData.victim_bank.length+1)) {
    //   console.log("C")
    //   setPreviousQuestion(currentQuestion - 1);

    // }

    // if (currentQuestion === 15 && victimValue < formData.victim_bank.length) {
    //   console.log("A")
    //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    //   setVictimValue(victimValue + 1);

    // } else if (currentQuestion === 16 && suspectValue < formData.suspect_bank.length) {
    //   console.log("D")
    //   window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    //   setSuspectValue(suspectValue + 1);
    //   setVictimValue(formData.victim_bank.length + 1);

    // } else {
    //   if (currentQuestion === 18) {
    //     console.log("B")
    //     setSuspectValue(formData.suspect_bank.length + 1);
    //   }

    //   // Don't allow going to a question earlier than question 2
    //   if (currentQuestion !== 2) {
    //     console.log("c")
    //     setPreviousQuestion(currentQuestion - 1);
    //   }
    // }

    if (currentQuestion !== 2) {
      setPreviousQuestion(currentQuestion - 1);
    }
  };

  // const handlePreviousQuestion = () => {
  //   console.log(currentQuestion, formData.victim_bank.length, victimValue);
  //   if (currentQuestion === 15 && victimValue < formData.victim_bank.length) {
  //     window.scrollBy({ top: -window.innerHeight * 1.3, behavior: 'smooth' });
  //     setVictimValue(victimValue + 1);

  //   } else if (currentQuestion === 16 && suspectValue < formData.suspect_bank.length) {
  //     window.scrollBy({ top: -window.innerHeight * 1.3, behavior: 'smooth' });
  //     setSuspectValue(suspectValue + 1);
  //     setVictimValue(formData.victim_bank.length + 1);

  //   } else {
  //     if (currentQuestion === 17) {
  //       setSuspectValue(formData.suspect_bank.length + 1);
  //     }

  //     // Don't allow going to a question earlier than question 2
  //     if (currentQuestion !== 2) {
  //       setPreviousQuestion(currentQuestion - 1);
  //     }
  //   }
  // };

  // Helper function to set the next question with boundaries

  const setNextQuestion = (nextIndex) => {
    const nextQuestion = Math.min(nextIndex, questionCount - 1);
    setCurrentQuestion(nextQuestion);
    setQuestion(questionSequence[nextQuestion - 1]);
    scrollToQuestion(nextQuestion);
  };

  // Helper function to set the previous question with boundaries
  const setPreviousQuestion = (prevIndex) => {
    const prevQuestion = Math.max(prevIndex, 1);
    setCurrentQuestion(prevQuestion);
    setQuestion(questionSequence[prevQuestion - 1]);
    scrollToQuestion(prevQuestion);
  };

  const isHeaderVisible =
    (currentQuestion >= 6 && currentQuestion <= 10) ||
    (currentQuestion >= 12 && currentQuestion <= 16);
  const headerTitle = (() => {
    if (currentQuestion >= 6 && currentQuestion <= 10) {
      return "Victim Details";
    }
    if (currentQuestion >= 10 && currentQuestion <= 16)
      return "Fraudster Details";
    return ""; // Default or empty title
  })();

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <ProgressBar
        question={question}
        current={currentQuestion}
        total={questionCount}
      />

      {isHeaderVisible && (
        <div className="victim-header" >
          {headerTitle && (
            <h1 className="header" style={{ textAlign: "center" }}>
              {headerTitle}
            </h1>
          )}
          {headerTitle === "Victim Details" && (
            <p style={{ textAlign: "center", marginTop: "-15px" }}>
              Enter the details of the victim
            </p>
          )}
        </div>
      )}
      <form>
        <Header />

        <div id="question-1" className="page">
          <Time
            onNext={handleNextClickQuestion}
            onTimeSelected={(value) => handleDataUpdate("time", value)}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>

        <div id="question-2" className="page">
          <HowMuch
            onNext={handleNextClickQuestion}
            onHowMuchSelected={(value) => handleDataUpdate("how_much", value)}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>
        <div
          id="question-3"
          style={{ display: "flex", flexDirection: "column" }}
        >
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
                apiKey={apiKey}
                botToken={botToken}
                vist_id={vist_id}
                app_ver={app_ver}
              />
            </div>
          ))}
        </div>
        <div id="question-4" className="page">
          <BankUpload
            onNext={handleNextClickQuestion}
            submitSupport={(value) => handleDataUpdate("bank_file", value)}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>
        <div id="question-5" className="page">
          <Victim
            onNext={handleNextClickQuestion}
            onQuestion={handleQuestionChange}
          />
        </div>

        <div id="question-6" className="page">
          <VictimName
            onNext={handleNextClickQuestion}
            onVictimNameSelected={(value) =>
              handleDataUpdate("victim_name", value)
            }
            onVictimAgeSelected={(value) =>
              handleDataUpdate("victim_age", value)
            }
            onVictimGenderSelected={(value) =>
              handleDataUpdate("victim_gender", value)
            }
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>
        <div id="question-7" className="page">
          <Profession
            onNext={handleNextClickQuestion}
            onVictimProfessionSelected={(value) =>
              handleDataUpdate("victim_Profession", value)
            }
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>

        <div id="question-8" className="page">
          <VictimQualification
            onNext={handleNextClickQuestion}
            onVictimQualificationSelected={(value) =>
              handleDataUpdate("victim_qualification", value)
            }
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>

        <div id="question-9" className="page">
          <PoliceStation
            onNext={handleNextClickQuestion}
            onVictimAddressSelected={policeStation}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>

        <div id="question-10" className="page">
          <VictimAddress
            onNext={handleNextClickQuestion}
            onVictimAddressSelected={Address}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>
        <div id="question-11" className="page">
          <Suspect
            onNext={handleNextClickQuestion}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>

        <div id="question-12" className="page">
          <SuspectCall
            onNext={handleNextClickQuestion}
            onSuspectCallSelected={(value) =>
              handleDataUpdate("suspect_call", value)
            }
            onPhoneNumber={(value) =>
              handleDataUpdate("phone_number", value)
            }
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>
        <div id="question-13" className="page">
          <Support
            onNext={handleNextClickQuestion}
            submitSupport={(value) => handleDataUpdate("supports", value)}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>
        <div id="question-14" className="page">
          <SuspectSpeak
            onNext={handleNextClickQuestion}
            onSuspectSpeakSelected={(value) =>
              handleDataUpdate("suspect_speak", value)
            }
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>

        <div id="question-15" className="page">
          <SuspectPlatform
            onNext={handleNextClickQuestion}
            onSuspectContactSelected={(value) =>
              handleDataUpdate("suspect_contact", value)
            }
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>
        {/* <div
          id="question-14"
          style={{ display: "flex", flexDirection: "column" }}
        >
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
                apiKey={apiKey}
                botToken={botToken}
                vist_id={vist_id}
                app_ver={app_ver}
              />
            </div>
          ))}
        </div> */}

        <div
          id="question-16"
         className="page"
        >
          {/* {formData.suspect_bank.map((item, index) => (
            <div
              key={item.id}
              id={`question-suspect-bank-${index}`}
              className="page"
            > */}
              <SuspectBank
                // key={index}
                // index={index}
                onNext={handleNextClickQuestion}
                onSuspectBankSelected={(value) =>
                  handleDataUpdate("suspect_bank", value)
                }
                addSuspectBank={addSuspectBank}
                onQuestion={handleQuestionChange}
                onNextPage={handleNextPageClickQuestion}
                answer={answerQuestion}
                apiKey={apiKey}
                botToken={botToken}
                vist_id={vist_id}
                app_ver={app_ver}
              />
            {/* </div>
          ))} */}
        </div>
        <div id="question-17" className="page">
          <HowLoss
            onNext={handleNextClickQuestion}
            onHowLossSelected={(value) => handleDataUpdate("how_loss", value)}
            onQuestion={handleQuestionChange}
            answer={answerQuestion}
            apiKey={apiKey}
            botToken={botToken}
            vist_id={vist_id}
            app_ver={app_ver}
          />
        </div>
        <p className="translate">
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
            zIndex: "1000",
          }}
        >
          <div className="navigation-buttons">
            <button
              type="button"
              className="back-btn"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion < 2}
            >
              <IoIosArrowUp />
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={handleNextQuestion}
              disabled={
                currentQuestion === questionCount || // Disable if it's the last question
                isNextDisabled // Disable if the current question is not answered
              }
            >
              <IoIosArrowDown />
            </button>
            {/* <img         style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          height:'10px',
          zIndex: '1000', // Make sure it's above other elements
        }} src="\images\cloud3.png" alt="cloud"/> */}
          </div>
          <p className="company-name">Power By Krishanas Digital</p>
        </div>
      </form>
    </div>
  );
};

export default Questions;
