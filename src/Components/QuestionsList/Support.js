import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";


const Support = ({ submitSupport, onNext }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      submitSupport(files);  // Pass the selected files to the submit function
        onNext(); // Navigate to the next step
    }
      
  };

  return (
    <div className="question">
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <h2 className="num">11</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Upload supporting evidence?</h2>
          <p>
            Screenshots of all the fraudulent transactions, suspect websites,
            suspect call logs, social media (Instagram, Facebook, Telegram, etc.),
            chat logs (WhatsApp, etc.), and APK files.
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="file-input"
          />
          <div className="file-preview">
            {files.length > 0 && (
              <ul>
                {files.map((file, index) => (
                  <li key={index} className="file-item">
                    {file.type.startsWith("image/") ? (
                      <div className="image-container">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview ${index}`}
                          className="preview-image"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="remove-button"
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    ) : (
                      <div className="file-name-container">
                        <p>{file.name}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="remove-button-text"
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          { files.length > 0 &&(
          <button
            type="button"
            className="ok-btn"
            onClick={handleSubmit}
          >
            ok <span style={{fontSize:'15px'}}>({files.length})</span>
          </button>
          )
}
        </div>
      </div>
    </div>
  );
};

export default Support;