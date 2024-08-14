import React, { useState } from 'react';

const VictimBirth = () => {
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

  const handleSubmit = () => {
    // Combine the day, month, and year values into a full date
    const dateOfBirth = `${day}-${month}-${year}`;
    console.log('Date of Birth:', dateOfBirth);
    // You can perform further actions here, such as validation or submitting the dateOfBirth
  };

  return (
    <div className="question">
      <label htmlFor="lose-money">What is your (Victim) date of birth?</label>
      <div style={{ display: 'flex', marginRight: '20px' }}>
        <div>
          <h5>Day</h5>
          <input
            className="day-input"
            value={day}
            onChange={handleDayChange}
            placeholder="DD"
            id="lose-money-day"
          />
        </div>
        <div>
          <h5>Month</h5>
          <input
           className="day-input"
            value={month}
            onChange={handleMonthChange}
            placeholder="MM"
            id="lose-money-month"
          />
        </div>
        <div>
          <h5>Year</h5>
          <input
           className="day-input"
            value={year}
            onChange={handleYearChange}
            placeholder="YYYY"
            id="lose-money-year"
          />
        </div>
      </div>
      <button type="button" className="ok-btn" onClick={handleSubmit}>
        Ok
      </button>
    </div>
  );
};

export default VictimBirth;
