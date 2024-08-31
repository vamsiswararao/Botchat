import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Select from 'react-select';

const options = [
  { value: 'station1', label: 'Hyderabad' },
  { value: 'station2', label: 'Cyberabad' },
  { value: 'station3', label: 'i don`t Know' },
  // Add more options as needed
];

const PoliceStation = ({ onNext,onPoliceStationSelected }) => {
  const [policeStation, setPoliceStation] = useState(null);

  const handleChange = (selectedOption) => {
    setPoliceStation(selectedOption);
    handleOkClick() 
  };

  const handleOkClick= (e) => {
    onPoliceStationSelected(policeStation)
    console.log('Selected police station:',policeStation);
    onNext(14);
  };

  // const customSelectStyles = {
  //   container: (provided) => ({
  //     ...provided,
  //     width: "100%", // Adjust the width as needed
  //   }),
  // };

  return (
    <div className="question">
            <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className='num'>7 g</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div >
      <h2 htmlFor="police-station">What is your police station?</h2>
      <div className="select-container">
      <Select
        id="police-station"
        value={policeStation}
        onChange={handleChange}
        options={options}
        placeholder="Type to search..."
        aria-label="Police Station"
        
        className="dropdown-input"
      />
      </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="ok-btn" onClick={handleOkClick}>
              Ok
            </button>
            <p className="enter-text">
              press <strong>Enter ↵</strong>
            </p>
          </div>
    </div>
    </div>
    </div>
  );
};

export default PoliceStation;
