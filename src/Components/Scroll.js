import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Number from './Number';
import LossAmount from './LossAmount';
import Time from './Time';
import PaymentMethod from './PaymentMethod';
import HowLoss from './HowLoss';
import Victim from './Victim';
import VictimName from './VictimName';
import VictimPhone from './VictimPhone';
import VictimBirth from './VictimBirth';
import VictimGender from './VictimGender';
import VictimQualification from './VictimQualification';
import VictimAddress from './VictimAddress';
import PoliceStation from './PoliceStation';
import Suspect from './Suspect';
import SuspectCall from './SuspectCall';
import SuspectSpeak from './SuspectSpeak';
import SuspectContact from './SuspectContact';
import VictimBank from './VictimBank';
import SuspectBank from './SuspectBank';
import Support from './Support';

const ProgressBar = ({ current, total }) => {
  const progress = ((current + 1) / total) * 100;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#ddd',
        padding: '0px',
        zIndex: 1000, // Ensure it stays above other content
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: '#007bff', // Blue color
          height: '3px',
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  );
};


const Scroll = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionCount = 20;

  const handleNextQuestion = () => {
    const nextQuestion = Math.min(currentQuestion + 1, questionCount-1);
    setCurrentQuestion(nextQuestion);
    document.querySelector(`#question-${nextQuestion}`).scrollIntoView({ behavior: 'smooth' });
    console.log(nextQuestion)
  };

  const handlePreviousQuestion = () => {
    const prevQuestion = Math.max(currentQuestion - 1, 0);
    setCurrentQuestion(prevQuestion);
    document.querySelector(`#question-${prevQuestion}`).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ProgressBar current={currentQuestion} total={questionCount} />
    <form>

      <div id="question-0">
       <Number />
      </div>

     <div id="question-1" className='page'>
        <LossAmount />
      </div>
 
      <div id="question-2" className='page'>
        <Time />
      </div>

      <div id="question-3" className='page'>
        <PaymentMethod />
      </div>

      <div id="question-4" className='page'>
        <HowLoss />
      </div>

      <div id="question-5" className='page'>
        <Victim />
      </div>

      <div id="question-6" className='page'>
        <VictimName />
      </div>

      <div id="question-7" className='page'>
        <VictimPhone />
      </div>

      <div id="question-8" className='page'>
        <VictimBirth />
      </div>

      <div id="question-9" className='page'>
        <VictimGender />
      </div>

      <div id="question-10" className='page'>
        <VictimQualification />
      </div>

      <div id="question-11" className='page'>
        <VictimAddress />
      </div>

      <div id="question-12" className='page'>
        <PoliceStation />
      </div>

      <div id="question-13" className='page'>
        <Suspect />
      </div>

      <div id="question-14" className='page'>
        <SuspectCall />
      </div>

      <div id="question-15" className='page'>
        <SuspectSpeak />
      </div>

      <div id="question-16" className='page'>
        <SuspectContact />
      </div>

      <div id="question-17" className='page'>
        <VictimBank />
      </div>

      <div id="question-18" className='page'>
        <SuspectBank />
      </div>

      <div id="question-19" className='page'>
        <Support />
      </div>

      <div className="navigation-buttons" style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
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
