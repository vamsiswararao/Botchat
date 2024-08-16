import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Select from 'react-select';

const options = [
  { value: 'station1', label: 'Hyderabad' },
  { value: 'station2', label: 'Cyberabad' },
  { value: 'station3', label: 'i don`t Know' },
  // Add more options as needed
];

const PoliceStation = ({ onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const submit = () => {
    if (!selectedOption) {
      alert('Please select a police station');
      return;
    }

    // Handle submit action here
    console.log('Selected police station:', selectedOption.label);
    onNext();
  };

  return (
    <div className="question">
            <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className='num'>6 g</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div >
      <h2 htmlFor="police-station">What is your police station?</h2>
      <Select
        id="police-station"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Type to search..."
        aria-label="Police Station"
      />
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="ok-btn" onClick={submit}>
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
