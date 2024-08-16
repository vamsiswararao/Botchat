import { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";


const VictimPhone=()=>{
    const [victimPhone, setVictimPhone] = useState('');

    const handleInputChange = (event) => {
      setVictimPhone(event.target.value);
    };
    
  const submit = () => {
    // Handle submit action here
    console.log('Submitted name:', victimPhone);
  };
    return(
        <div className="question">
                      <div style={{display:'flex'}}>
            <div style={{display:'flex'}}>
            <h2 className='num'>6b</h2>
            <FaLongArrowAltRight className='num' />
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
      <h2 htmlFor="victim-name">What is your (Victim) phone number? *</h2>
      <input
      className='text-input'
        value={victimPhone}
        onChange={handleInputChange}
        placeholder="Type your answer here..."
        id="victim-name"
      />
          <div style={{ display: "flex", alignItems: "center" }}>
            <button type="button" className="ok-btn">
              ok
            </button>
            <p className="enter-text">
              press <strong>Enter ↵</strong>
            </p>
          </div>
    </div>
    </div>
    </div>
    )
}

export default VictimPhone