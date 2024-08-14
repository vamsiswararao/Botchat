import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Typeform from "react-typeform";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion"; // Adjust the import path as needed
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Number from "./Number";
//import './Home.css'; // Ensure this CSS file is imported

const Home = () => {
  const [number, setNumber] = useState("");
  const [value, setValue] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      id: 2,
      question: "How Can We Help You?",
      options: [
        { id: "A", label: "Did you lose an amount in Cybercrimes?" },
        {
          id: "B",
          label: "Have you faced Cybercrime in Non-financial cyber fraud?",
        },
        { id: "C", label: "To know the status of the complaint?" },
      ],
    },
    {
      id: 3,
      question: "When did you lose the amount?",
      options: [
        { id: "A", label: "In less than 24 hours" },
        { id: "B", label: "Between 24 hours to 48 hours" },
        { id: "C", label: "Between 48 hours to 72 hours" },
        { id: "D", label: "Above 72 hours" },
      ],
    },
    {
      id: 4,
      question: "How did you send the amount(Payment Method)?",
      options: [
        {
          id: "A",
          label: "UPI-related fraud (Attach all banks names list to drop down)",
        },
        { id: "B", label: "E-Wallet related fraud" },
        { id: "C", label: "Debit/credit fraud/ Sim swap fraud" },
        { id: "D", label: "internet banking-related fraud" },
        { id: "E", label: "Demat / depository fraud" },
        { id: "F", label: "Business email compromise/email takeover " },
        { id: "G", label: "Aadhar enable payment system [AEPS] " },
      ],
    },
    {
      id: 5,
      question: "Have you reported the incident to any authority?",
      options: [
        { id: "A", label: "Yes, to the police" },
        { id: "B", label: "Yes, to a financial institution" },
        { id: "C", label: "No" },
        { id: "D", label: "I am in the process of reporting" },
      ],
    },
    // Add more questions as needed
  ];

  const handleAnswerSelect = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    console.log(currentQuestionIndex);
    if (number) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const submit = () => {
    // Your submit logic here
    console.log("Form submitted");
    console.log("Phone number:", value);
    console.log("Selected answers:", selectedAnswers);
  };

  return (
    <div onSubmit={submit}>
      {currentQuestionIndex === 0 ? (
        <div className="question">
          <Number/>
          <label htmlFor="phone-number">Please verify your phone number:</label>
          <PhoneInput
            defaultCountry="IN"
            value={number}
            onChange={setNumber}
            placeholder="Enter phone number"
            id="phone-number"
          />
          <button type="button" className="ok-btn" onClick={handleNextQuestion}>
            OK
          </button>
        </div>
      ) : currentQuestionIndex < questions.length ? (
        <div>
          <MultipleChoiceQuestion
            question={questions[currentQuestionIndex].question}
            options={questions[currentQuestionIndex].options}
            onSelect={(selectedOption) =>
              handleAnswerSelect(
                questions[currentQuestionIndex].id,
                selectedOption
              )
            }
            onNext={handleNextQuestion}
          />
          <div className="navigation-buttons">
            <button
              type="button"
              className="back-btn"
              onClick={handlePreviousQuestion}
            >
              <IoIosArrowUp />
            </button>
            <button
              type="button"
              className="next-btn"
              onClick={handleNextQuestion}
            >
              <IoIosArrowDown />
            </button>
          </div>
          <div className="question">
            <label htmlFor="lose-money">How did you lose money?</label>
            <p>Write in detail about how you lost the money.</p>
            <input
              value={value}
              onChange={setValue}
              placeholder="Type your answer here..."
              id="lose-money"
            />
            <button type="button" className="ok-btn" onClick={submit}>
              Submit
            </button>
          </div>
          <div className="question">
            <label htmlFor="lose-money">Your(Victim) ?</label>
            <p>answer the set of questions about your self.</p>
            <button type="button" className="ok-btn" onClick={submit}>
              Continue
            </button>
          </div>
          <div className="question">
            <label htmlFor="lose-money">What is your (Victim) name?</label>
            <input
              value={value}
              onChange={setValue}
              placeholder="Type your answer here..."
              id="lose-money"
            />
            <button type="button" className="ok-btn" onClick={submit}>
              Submit
            </button>
          </div>
          <div className="question">
            <label htmlFor="lose-money">What is your (Victim) phone number?</label>
            <input
            className="text-input"
              value={value}
              onChange={setValue}
              placeholder="Type your answer here..."
              id="lose-money"
            />
            <button type="button" className="ok-btn" onClick={submit}>
              Submit
            </button>
          </div>
          <div className="question">
            <label htmlFor="lose-money">What is your (Victim) date of birth?</label>
           <div style={{display:'flex',marginRight:'20px'}}>
            <div>
            <h5>Day</h5>
            <input
              className="day-input"
              value={value}
              onChange={setValue}
              placeholder="DD"
              id="lose-money"
            />
            </div>
            <div>
             <h5>Month</h5>
            <input
              className="day-input"
              value={value}
              onChange={setValue}
              placeholder="MM"
              id="lose-money"
            /> 
            </div>
            <div>
             <h5>Year</h5>
            <input
              className="day-input"
              value={value}
              onChange={setValue}
              placeholder="YYYY"
              id="lose-money"
            />
            </div>
            </div>
            <button type="button" className="ok-btn" onClick={submit}>
              Ok
            </button>
          </div>
          
        </div>
      ) : (
        <div className="question">
          <label htmlFor="lose-money">How did you lose money?</label>
          <p>Write in detail about how you lost the money.</p>
          <input
            value={value}
            onChange={setValue}
            placeholder="Type your answer here..."
            id="lose-money"
          />
          <button type="button" className="ok-btn" onClick={submit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
