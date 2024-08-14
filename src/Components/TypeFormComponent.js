import React, { useState, useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaLongArrowAltRight} from "react-icons/fa";
import Number from './Number';
import LossAmount from './LossAmount';
import Third from './Third';
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

const TypeFormComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Create refs for each question
  const questionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const handlePreviousQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    questionRefs[Math.max(currentQuestion - 1, 0)].current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questionRefs.length - 1));
    questionRefs[Math.min(currentQuestion + 1, questionRefs.length - 1)].current.scrollIntoView({ behavior: 'smooth' });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleNextStep = () => {
    setCurrentQuestion((prevStep) => {
      const nextStep = prevStep + 1;
      questionRefs[nextStep].current.scrollIntoView({ behavior: 'smooth' });
      return nextStep;
    });
    
  };

  return (
    <form onSubmit={submit}>
      {/** Render the current question based on state */}
      <div ref={questionRefs[0]}>
        {currentQuestion === 0 && (
          <div className='page'>
            <h2>1</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <Number />
          </div>
        )}
      </div>

      <div ref={questionRefs[1]}>
        {currentQuestion === 1 && (
          <div className='page'>
            <h2>2</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <LossAmount />
          </div>
        )}
      </div>

      <div ref={questionRefs[2]}>
        {currentQuestion === 2 && (
          <div className='page'>
            <h2>3</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <Third />
          </div>
        )}
      </div>

      <div ref={questionRefs[3]}>
        {currentQuestion === 3 && (
          <div className='page'>
            <h2>4</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <PaymentMethod />
          </div>
        )}
      </div>

      <div ref={questionRefs[4]}>
        {currentQuestion === 4 && (
          <div className='page'>
            <h2>5</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <HowLoss />
          </div>
        )}
      </div>

      <div ref={questionRefs[5]}>
        {currentQuestion === 5 && (
          <div className='page'>
            <h2>6</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <Victim onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[6]}>
        {currentQuestion === 6 && (
          <div className='page'>
            <h2>6 a</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <VictimName onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[7]}>
        {currentQuestion === 7 && (
          <div className='page'>
            <h2>6 b</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <VictimPhone onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[8]}>
        {currentQuestion === 8 && (
          <div className='page'>
            <h2>6 c</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <VictimBirth onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[9]}>
        {currentQuestion === 9 && (
          <div className='page'>
            <h2>6 d</h2>
            <FaLongArrowAltRight  style={{margin:"20px 5px"}}/>
            <VictimGender onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[10]}>
        {currentQuestion === 10 && (
          <div className='page'>
            <h2>6 e</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <VictimQualification onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[11]}>
        {currentQuestion === 11 && (
          <div className='page'>
            <h2>6 f</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <VictimAddress onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[12]}>
        {currentQuestion === 12 && (
          <div className='page'>
            <h2>6 g</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <PoliceStation onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[13]}>
        {currentQuestion === 13 && (
          <div className='page'>
            <h2>7</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <Suspect onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[14]}>
        {currentQuestion === 14 && (
          <div className='page'>
            <h2>7 a</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <SuspectCall onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[15]}>
        {currentQuestion === 15 && (
          <div className='page'>
            <h2>7 b</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <SuspectSpeak onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[16]}>
        {currentQuestion === 16 && (
          <div className='page'>
            <h2>7 c</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <SuspectContact onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[17]}>
        {currentQuestion === 17 && (
          <div className='page'>
            <h2>8</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <VictimBank onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[18]}>
        {currentQuestion === 18 && (
          <div className='page'>
            <h2>9</h2>
            <FaLongArrowAltRight style={{margin:"20px 5px"}}/>
            <SuspectBank onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div ref={questionRefs[19]}>
        {currentQuestion === 19 && (
          <div className='page'>
            <h2>10</h2>
            <FaLongArrowAltRight style={{margin:"0px 5px"}}/>
            <Support onNext={handleNextStep} />
          </div>
        )}
      </div>
      <div className="navigation-buttons" style={{ position: 'fixed', bottom: '10px', right: '10px' }}>
        <button
          type="button"
          className="back-btn"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <IoIosArrowUp />
        </button>
        <button
          type="button"
          className="next-btn"
          onClick={handleNextQuestion}
          disabled={currentQuestion === questionRefs.length - 1}
        >
          <IoIosArrowDown />
        </button>
      </div>
    </form>
  );
};

export default TypeFormComponent;
