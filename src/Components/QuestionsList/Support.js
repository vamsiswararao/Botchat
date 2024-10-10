import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
const apiUrl = process.env.REACT_APP_API_URL;

const Support = ({ submitSupport, onNext, onQuestion }) => {
  const [files, setFiles] = useState([]);
  const [successfulUploads, setSuccessfulUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const vist_id = sessionStorage.getItem("visitor_id");

  // Upload files as soon as the user selects them
  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    console.log(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const formData = new FormData();
    formData.append("api_key", "1725993564");
    formData.append("visitor_token", vist_id);
    formData.append("qtion_id", "66f654783112a");
    // for (let i = 0; i < selectedFiles.length; i++) {
    //   formData.append('userImages', selectedFiles[i]);
    // }

    console.log(files);
    formData.append("userimage", files[0]);

    console.log(formData);

    try {
      setIsUploading(true);
      const response = await fetch(`${apiUrl}/ccrim_bot_add_doc`, {
        method: "POST",
        body: formData,
      });

      const fileData = await response.json();
      console.log(fileData);
      if (fileData.error_code === "0") {
        console.log("Files uploaded successfully");
        setSuccessfulUploads((prevUploads) => [
          ...prevUploads,
          ...selectedFiles,
        ]);
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    onNext(17);
    onQuestion(17);
  };

  return (
    <div className="question">
      <div className="upload">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2> Upload supporting evidence</h2>
          <p className="upload-de">
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
              {isUploading ? (
                "Uploading..."
              ) : (
                <>
                  OK <span style={{ fontSize: "15px" }}>({files.length})</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
