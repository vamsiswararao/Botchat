import { useState } from "react";
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
      <label htmlFor="police-station">What is your police station?</label>
      <Select
        id="police-station"
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder="Type to search..."
        aria-label="Police Station"
      />
      <button type="button" className="ok-btn" onClick={submit}>
        OK
      </button>
    </div>
  );
};

export default PoliceStation;
