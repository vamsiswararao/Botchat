import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
const apiUrl = process.env.REACT_APP_API_URL;

const Support = ({ submitSupport, onNext, onQuestion, answer, apiKey,botToken,vist_id }) => {
  const [files, setFiles] = useState([]);
  const [successfulUploads, setSuccessfulUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //const vist_id = sessionStorage.getItem("visitor_id");
  const MAX_UPLOAD_SIZE = 100 * 1024 * 1024; // 100MB in bytes

  useEffect(() => {
    const storedFiles = localStorage.getItem("file");
    if (storedFiles) {
      // Files were stored in the previous session, rehydrate the state
      const parsedFileNames = JSON.parse(storedFiles);
      const rehydratedFiles = parsedFileNames.map((fileName) => ({
        name: fileName,
      }));
      setFiles(rehydratedFiles); // Save back to state for proper handling
    }
  }, []);

  // Upload files as soon as the user selects them
  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);

    // Store only file names in localStorage, but use actual File objects in state
    localStorage.setItem(
      "file",
      JSON.stringify(selectedFiles.map((file) => file.name))
    );
    let errorMessages = "";

    // Validate file types and sizes
    const validFiles = [];

    selectedFiles.forEach((file) => {
      const isImage = file.type.startsWith("image/");
      const isSizeValid = file.size <= MAX_UPLOAD_SIZE;

      if (!isImage) {
        errorMessages +=`File  is not an image.\n`;
      }
      if (!isSizeValid) {
        errorMessages +=`File  exceeds 100MB.\n`;
      }
      if (isImage && isSizeValid) {
        validFiles.push(file); // Only push valid files
      }
      setErrorMessage(errorMessages);
    });

    if (validFiles.length === 0) {
      setErrorMessage("No valid files selected!");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    //setErrorMessage("");

    const formData = new FormData();
    formData.append("api_key", apiKey);
    formData.append("visitor_token", vist_id);
    formData.append("qtion_id", "66f654783112a");
    formData.append("qtion_num", "16");
    formData.append("lac_token",botToken)

    validFiles.forEach((file) => {
      formData.append("userImage", file); // Append each valid file
    });

    try {
      setIsUploading(true);
      const response = await fetch(`${apiUrl}/ccrim_bot_add_doc`, {
        method: "POST",
        body: formData,
      });

      const fileData = await response.json();
      //console.log(fileData)
      if (fileData.resp.error_code === "0") {
        setSuccessfulUploads((prevUploads) => [...prevUploads, ...validFiles]);
        submitSupport(files);
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
            <div className="error-message" style={{ color: "red" }}>
              {errorMessage.split("\n").map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
          )}
          <div className="file-preview">
            {files.length > 0 && (
              <ul>
                {files.map((file, index) => (
                  <li key={index} className="file-item">
                    <div className="image-container">
                      {/* Only create object URLs for actual File objects */}
                      {file instanceof File ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview ${index}`}
                          className="preview-image"
                        />
                      ) : (
                        <p>{file.name}</p>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="remove-button"
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  </li>
                ))}
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
                  OK <span style={{ fontSize: "15px" }}>({files.length})</span>
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
