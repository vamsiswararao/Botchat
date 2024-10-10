import React, { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API_URL;

// const newData=[
//   {id: "A",value: '6660578b2de85', label: 'Telugu'},
//   {id: "B",value: '6660578b2c728', label: 'English'},
//   {id: "C",value: '6660578b2cced', label: 'Hindi'},
//   {id: "D",value: '6660578b2c3e2', label: 'Bengali'},
//   {id: "E",value: '6660578b2d1b6', label: 'Kannada'},
//   {id: "F",value: '6660578b2d4d0', label: 'Marati'},
//   {id: "G",value: '6660578b2d844', label: 'Other'},
//   {id: "H",value: '6660578b2dad8', label: 'Tamil'}
// ]

const SuspectSpeak = ({ onNext, onSuspectSpeakSelected, onQuestion }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showOkButton, setShowOkButton] = useState(true);
  const [error, setError] = useState(null);
  const [speckOptions, setSpeckOptions] = useState([]);
  const vist_id = sessionStorage.getItem("visitor_id");


  useEffect(() => {
    const fetchProfessionData= async () => {
      try {
                const professionResponse = await fetch(`${apiUrl}/cy_ma_lang_list`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    "api_key":"1725993564",
                    "visitor_token":vist_id,
                    "qtion_id":"66f653bf26e9c",
             }
             ),
                });
        
                if (!professionResponse.ok) {
                  throw new Error("Failed to fetch audio options");
                }
        
                const professionData = await professionResponse.json();
                console.log(professionData)
                 setSpeckOptions(
                  professionData.resp.lng_list.map((profession,index) => ({
                    id: String.fromCharCode(65 + index),
                    value: profession.lang_uniq,
                    label:profession.lang_nm
                   })) || []
                 );
                //console.log(toData.resp.aud_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
  
    fetchProfessionData();
  }, []);

  const handleOptionClick = (option, e) => {
    e.preventDefault();
    if (selectedOptions.disabled) {
      return; // Ignore clicks on disabled options
    } 
    //setHelp(option.id);
    //onHelpSelected(option.id);
    setShowOkButton(true); // Show the OK button after a successful click
    setError("");
    // Toggle selection
    setSelectedOptions((prevSelected) =>{
      const updatedCalls = prevSelected.includes(option.value)
        ? prevSelected.filter((option) => option !== option.value)
        : [...prevSelected, option.value]
        onSuspectSpeakSelected(updatedCalls);
      //saveDataToAPI(updatedCalls);
      return updatedCalls;
  });


    
  };


  const saveDataToAPI = async (selectedOptions) => {
    try {
      const response = await fetch(`${apiUrl}/ccrim_bot_add_multichoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            "api_key":"1725993564",
           "visitor_token":vist_id,
           "qtion_id":"66f653bf26e9c",
           "qtion_num":"5b",
           "qtion_option": ["a","b","c","d","e"],
           "option_val":selectedOptions,
     }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const result = await response.json();
      console.log("Data saved successfully:", result);
      // Optionally, handle the result as needed
    } catch (error) {
      console.error("Error saving data:", error);
      setError("Failed to save data, please try again.");
    }
  };

  const handleOkClick = async(e) => {
    e.preventDefault();
   
    if (selectedOptions.length > 0) {
      await saveDataToAPI(selectedOptions);
      onSuspectSpeakSelected(selectedOptions);
      onNext(13);
      onQuestion("14")
    } else {
      setError("Please select an option before proceeding.");
      setShowOkButton(false); // Hide the OK button after an unsuccessful attempt
    }
  };

  // const options = [
  //   { id: "A", label: "Telugu" },
  //   { id: "B", label: "English" },
  //   { id: "C", label: "Hindi" },
  //   { id: "D", label: "Tamil" },
  //   { id: "E", label: "Bengali" },
  //   { id: "F", label: "Gujarati" },
  //   { id: "G", label: "Bodo" },
  //   { id: "H", label: "Kannada" },
  //   { id: "I", label: "Jammu and Kashmir" },
  //   { id: "J", label: "Konkani" },
  //   { id: "K", label: "Malayalam" },
  //   { id: "L", label: "Manipuri" },
  //   { id: "M", label: "Marathi" },
  //   { id: "N", label: "Nepali" },
  //   { id: "O", label: "Odia" },
  //   { id: "P", label: "Punjabi" },
  //   { id: "Q", label: "Sanskrit" },
  //   { id: "R", label: "Santali" },
  //   { id: "S", label: "Sindhi" },
  //   { id: "T", label: "Dogri" },
  //   { id: "U", label: "Assamese" },
  //   { id: "V", label: "Urdu" },
  // ];

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{display:'flex',flexDirection:"column",justifyContent:'flex-end'}}>
          <h2>Language used by the fraudster? *</h2>
          <div className="option-list">
            {speckOptions.map((option) => (
              <button
                key={option.id}
                className={`option-button ${
                  selectedOptions.includes(option.value) ? "selected" : ""
                }`}
                onClick={(e) => handleOptionClick(option, e)}
              >
                <div className="answer-container">
                  <div
                    className="option"
                    style={{
                      backgroundColor: selectedOptions.includes(option.value)
                        ? "#000"
                        : "#fff",
                      color: selectedOptions.includes(option.value)
                        ? "#fff"
                        : "#000",
                    }}
                  >
                    {option.id}
                  </div>
                  <div className="option-label">{option.label}</div>
                </div>
                {selectedOptions.includes(option.value) && (
                  <span className="checkmark">
                    &#10003; {/* Unicode character for checkmark */}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
              {showOkButton && (
                <>
                  <button
                    type="button"
                    className="ok-btn"
                    onClick={handleOkClick}
                  >
                    OK
                  </button>
                  <p className="enter-text">
                    press <strong>Enter ↵</strong>
                  </p>
                </>
              )}
              {error && <div className="error-message">{error}</div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SuspectSpeak;
