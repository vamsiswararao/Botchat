import React, { useState } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimBirth = ({onNext,onVictimBirthSelected}) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDayChange = (e) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleOkClick = (e) => {
  e.preventDefault();
    // Combine the day, month, and year values into a full date
    const dateOfBirth = `${day}-${month}-${year}`;
    onVictimBirthSelected(dateOfBirth)
    console.log('Date of Birth:', dateOfBirth);
    onNext()
  
  };

  return (
    <div className="question">
            <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className='num'>7 c</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div>
      <h2 htmlFor="lose-money">What is your (Victim) date of birth?</h2>
      <div style={{ display: 'flex', marginRight: '20px' }}>
        <div>
          <h2>Day</h2>
          <input
            className="day-input"
            value={day}
            onChange={handleDayChange}
            placeholder="DD"
            id="lose-money-day"
          />
        </div>
        <div>
          <h2>Month</h2>
          <input
           className="day-input"
            value={month}
            onChange={handleMonthChange}
            placeholder="MM"
            id="lose-money-month"
          />
        </div>
        <div>
          <h2>Year</h2>
          <input
           className="day-input"
            value={year}
            onChange={handleYearChange}
            placeholder="YYYY"
            id="lose-money-year"
          />
        </div>
      </div>
      <div style={{display:"flex",alignItems:'center'}}>
              <button type="button" className="ok-btn" onClick={handleOkClick}>
                ok
              </button>
              <p className="enter-text">press <strong>Enter ↵</strong></p>
            </div>
    </div>
    </div>
    </div>
  );
};

export default VictimBirth;
