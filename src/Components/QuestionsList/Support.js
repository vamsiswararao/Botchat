import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRedoAlt } from "react-icons/fa"; // For the retry icon
const apiUrl = process.env.REACT_APP_API_URL;
const apiImage = process.env.REACT_APP_MY_ID_IMAGE;

const Support = ({ submitSupport, onNext, onQuestion, answer, apiKey, botToken, vist_id,app_ver }) => {
  const [files, setFiles] = useState([]);
  const [successfulUploads, setSuccessfulUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_UPLOAD_SIZE = 100 * 1024 * 1024; // 100MB in bytes

  useEffect(() => {
    const storedFiles = localStorage.getItem("file");
    if (storedFiles) {
      const parsedFileNames = JSON.parse(storedFiles);
      const rehydratedFiles = parsedFileNames.map((fileName) => ({
        name: fileName,
      }));
      setFiles(rehydratedFiles);
    }
  }, []);

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (files.length + selectedFiles.length > apiImage) {
      setErrorMessage(`You can only upload a maximum of ${apiImage} images.`);
      return;
    }

    localStorage.setItem(
      "file",
      JSON.stringify(selectedFiles.map((file) => file.name))
    );
    let errorMessages = "";

    const validFiles = [];
    selectedFiles.forEach((file) => {
      const isImage = file.type.startsWith("image/");
      const isSizeValid = file.size <= MAX_UPLOAD_SIZE;

      if (!isImage) {
        errorMessages += `File is not an image.\n`;
      }
      if (!isSizeValid) {
        errorMessages += `File exceeds 100MB.\n`;
      }
      if (isImage && isSizeValid) {
        validFiles.push(file);
      }
      setErrorMessage(errorMessages);
    });

    if (validFiles.length === 0) {
      setErrorMessage("No valid files selected!");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);

    uploadFiles(validFiles);
  };

  const uploadFiles = async (validFiles) => {
    const formData = new FormData();
    formData.append("api_key", apiKey);
    formData.append("visitor_token", vist_id);
    formData.append("qtion_id", "66f654783112a");
    formData.append("qtion_num", "16");
    formData.append("lac_token", botToken);
    formData.append("app_ver",app_ver);

    validFiles.forEach((file) => {
      formData.append("userImage", file);
    });

    try {
      setIsUploading(true);
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_doc`, {
        method: "POST",
        body: formData,
      });

      const fileData = await response.json();
      if (fileData.resp.error_code === "0") {
        setSuccessfulUploads((prevUploads) => [...prevUploads, ...validFiles]);
        submitSupport(validFiles);
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
    setSuccessfulUploads((prevUploads) => prevUploads.filter((_, i) => i !== index));
  };

  const handleRetryUpload = (file) => {
    uploadFiles([file]); // Retry upload for the specific file
  };

  const handleSubmit = (e) => {
    onNext(17);
    onQuestion(17);
  };

  return (
    <div className="question">
      <div className="upload">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Upload supporting evidence</h2>
          <p className="upload-de">
            Upload screenshots of all the fraudulent transactions, suspect websites, 
            suspect call log screenshots, screenshots of social media, WhatsApp chat, etc.
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
          {errorMessage && (
            <div className="error-message" style={{ color: "red"}}>
              {/* {errorMessage.split("\n").map((msg, index) => (
                <p key={index}>{msg}</p>
              ))} */} {errorMessage}
            </div>
          )}
          <div className="file-preview">
            {files.length > 0 && (
              <ul>
                {files.map((file, index) => {
                  const isUploaded = successfulUploads.includes(file);
                  return (
                    <li key={index} className="file-item">
                      <div className="image-container">
                        {file instanceof File && (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`preview ${index}`}
                            className="preview-image"
                          />
                        )}
                        {!isUploaded && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="remove-button"
                            >
                              <RxCross2 />
                            </button>
                            <div
                              className={`retry-circle ${isUploading ? "rotating" : ""}`} 
                              onClick={() => handleRetryUpload(file)}
                              style={{
                                position: "absolute", // Make the retry icon absolutely positioned
                                top: "50%",           // Position at the vertical center
                                left: "50%",          // Position at the horizontal center
                                transform: "translate(-50%, -50%)", // Center it perfectly
                                width: "30px",        // Increase size for better visibility
                                height: "30px",       // Same as width
                                backgroundColor: "red", // Red background
                                borderRadius: "50%",   // Make it a circle
                                display: "flex",       // Flex to center the icon inside
                                justifyContent: "center", // Center the icon horizontally
                                alignItems: "center",  // Center the icon vertically
                                cursor: "pointer",
                              }}
                            >
                              <FaRedoAlt style={{ color: "white", fontSize: "14px" }} />
                            </div>
                          </>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {successfulUploads.length > 0 && (
            <button
              type="button"
              style={{ width: "95px" }}
              className="ok-btn"
              onClick={handleSubmit}
            >
              {isUploading ? (
                "Uploading..."
              ) : (
                <span>
                  OK <span style={{ fontSize: "15px" }}>({successfulUploads.length})</span>
                </span>
              )}
            </button>
          )}

          {answer[17] && (
            <p className="alert-box">
              Please answer the current question before moving to the next.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
