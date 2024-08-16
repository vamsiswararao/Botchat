import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Support = ({ onNext }) => {
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const submit = () => {
    // Handle submit action here
    console.log("Submitted name:", value);
    onNext();
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className='num'>10</h2>
          <FaLongArrowAltRight className='num' />
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
          <h2 htmlFor="victim-name">Upload supporting evidence?</h2>
          <p>
            Upload screenshots of all the fraudulent transactions, suspect
            websites, suspect call{" "}
          </p>
          <input
            className="text-input"
            value={value}
            onChange={handleInputChange}
            placeholder="Type your answer here..."
            id="victim-name"
          />
          <button type="button" className="ok-btn" onClick={submit}>
            ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
