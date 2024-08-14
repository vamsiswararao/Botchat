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
            <h4 style={{marginTop:'0px'}}>6 b</h4>
            <FaLongArrowAltRight style={{marginTop:'0px'}} />
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
      <label htmlFor="victim-name">What is your (Victim) phone number? *</label>
      <input
      className='text-input'
        value={victimPhone}
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
    )
}

export default VictimPhone