import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const Support = ({ submitSupport, onNext }) => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // Upload files as soon as the user selects them
  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("https://enrbgth6q54c8.x.pipedream.net", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Files uploaded successfully");
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    //navigate("/success");
    onNext(19);
  };

  return (
    <div className="question">
      <div className="upload">
        <div style={{ display: "flex" }}>
          <h2 className="num">9/10</h2>
          <FaLongArrowAltRight className="num" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2> Upload Supporting evidence</h2>
          <p>
            Upload screenshots of all the fraudulent transactions, suspect
            websites, suspect call log screenshots, screenshots of social media
            (Instagram, Facebook, Telegram, etc.), screenshots of WhatsApp chat,
            and APK files.
          </p>
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            className="file-input"
            style={{ display: "none" }}
          />
          <label htmlFor="file-upload" className="upload-file">
            Choose File
          </label>
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
          {files.length > 0 && (
            <button
              type="button"
              style={{ width: "95px" }}
              className="ok-btn"
              onClick={handleSubmit}
            >
              Ok <span style={{ fontSize: "15px" }}>({files.length})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
