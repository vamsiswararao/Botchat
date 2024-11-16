import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRedoAlt, FaFilePdf } from "react-icons/fa"; // PDF icon
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique IDs
const apiUrl = process.env.REACT_APP_API_URL;
const apiImage = process.env.REACT_APP_MY_ID_IMAGE;

const BankUpload = ({
  submitSupport,
  onNext,
  onQuestion,
  answer,
  apiKey,
  botToken,
  vist_id,
  app_ver,
}) => {
  const [files, setFiles] = useState([]);
  // const [successfulUploads, setSuccessfulUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  useEffect(() => {
    const storedFiles = localStorage.getItem("BankFile");
    if (storedFiles) {
      const parsedFiles = JSON.parse(storedFiles);
      setFiles(parsedFiles);
      submitSupport(parsedFiles);
    }
  }, []);

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (files.length + selectedFiles.length > apiImage) {
      setErrorMessage(`You can only upload a maximum of ${apiImage} files.`);
      return;
    }

    let errorMessages = "";
    const validFiles = selectedFiles.filter((file) => {

      const isImageOrPdf = file.type.startsWith("image/") || file.type === "application/pdf";
      const isSizeValid = file.size <= MAX_UPLOAD_SIZE;

      if (!isImageOrPdf) errorMessages = "Only images or PDF files are allowed.";
      if (!isSizeValid) errorMessages = "File must be below 10MB.";

      return isImageOrPdf && isSizeValid;
    });

    setErrorMessage(errorMessages);

    if (!errorMessages) {
      const filesWithUrls = validFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        uuid: uuidv4(),
        name: file.name,
        type: file.type,
        status: "pending"
      }));

      localStorage.setItem("BankFile", JSON.stringify([...files, ...filesWithUrls]));
      submitSupport(filesWithUrls);
      setFiles((prevFiles) => [...prevFiles, ...filesWithUrls]);

      uploadFiles(filesWithUrls);
    }
  };

  const uploadFiles = async (validFiles) => {
    try {
      setIsUploading(true);
      for (const { file, uuid, } of validFiles) {
        const formData = new FormData();
        formData.append("api_key", apiKey);
        formData.append("visitor_token", vist_id);
        formData.append("qtion_id", "66f654783112a");
        formData.append("qtion_num", "4");
        formData.append("lac_token", botToken);
        formData.append("app_ver", app_ver);
        formData.append("userImage", file);
        formData.append("ref_id", uuid);
        formData.append("type", "1");

        const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_doc`, {
          method: "POST",
          body: formData,
        });

        const fileData = await response.json();
        if (fileData.resp.error_code === "0") {
          // setSuccessfulUploads((prevUploads) => [
          //   ...prevUploads,
          //   { name, uuid },
          // ]);
          setFiles((prevFiles) =>
            prevFiles.map((f) => (f.uuid === uuid ? { ...f, status: "uploaded" } : f))
          );

          const updatedFiles = JSON.parse(localStorage.getItem("BankFile")).map((f) =>
            f.uuid === uuid ? { ...f, status: "uploaded" } : f
          );
          localStorage.setItem("BankFile", JSON.stringify(updatedFiles));
          submitSupport(updatedFiles);
        } else {
          setErrorMessage(fileData.resp.message);
          break;
        }
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = async (index, uuid) => {
    try {
      const response = await fetch(`${apiUrl}/v1/ccrim_bot_remove_doc`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          visitor_token: vist_id,
          qtion_id: "66f654783112a",
          qtion_num: "4",
          option_val: "670fce3010e33775926208",
          lac_token: botToken,
          app_ver: app_ver,
          ref_id: uuid,
          type: "1",
        }),
      });

      const result = await response.json();
      if (result.resp.error_code === "0") {
        setFiles((prevFiles) => prevFiles.filter((file) => file.uuid !== uuid));
        // setSuccessfulUploads((prevUploads) =>
        //   prevUploads.filter((uploadedFile) => uploadedFile.uuid !== uuid)
        // );

        const updatedFiles = JSON.parse(
          localStorage.getItem("BankFile")
        ).filter((file) => file.uuid !== uuid);
        localStorage.setItem("BankFile", JSON.stringify(updatedFiles));
        submitSupport(updatedFiles);
      } else {
        setErrorMessage("Failed to delete the file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleRetryUpload = (file) => {
    uploadFiles([file]);
  };

  const handleSubmit = () => {
    onNext(5);
    onQuestion(6);
  };

  return (
    <div className="question">
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>
            Upload fraudulent transactions
            <span style={{ color: "red" }}>*</span>
          </h2>
          <p className="victim-para">
            Upload screenshots of all the fraudulent transactions.
          </p>
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileChange}
            className="file-input"
            style={{ display: "none" }}
          />
          <div
            style={{ 
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <label htmlFor="file-upload" className="upload-file">
              Choose Files
            </label>
            {files.length > 0 && (
              <button
                type="button"
                style={{ width: "95px",zIndex:'9' }}
                className="ok-btn"
                onClick={handleSubmit}
          
              >
                {isUploading ? "Uploading..." : `OK (${files.length})`}
              </button>
            )}
          </div>
          {errorMessage && (
            <div
              className="error-message"
              style={{ color: "red", width: "50%" }}
            >
              {errorMessage}
            </div>
          )}
          <div className="file-preview">
            {files.length > 0 && (
              <ul>
                {files.map(({ url,  uuid, name, type, status }, index) => (
                  <li key={uuid} className="file-item">
                    <div className="file-container">
                      {type === "application/pdf" ? (
                        <div className="pdf-preview">
                          <FaFilePdf size={50} color="red" />
                          <p style={{fontSize:'8px'}}>{name}</p>
                        </div>
                      ) : (
                        <img 
                          src={url}
                          alt={`${name}`}
                          className="preview-image"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index, uuid)}
                        className="remove-button"
                        style={{ zIndex:'9'}}
                      >
                        <RxCross2 />
                      </button>
                      {status !== "uploaded" && (
                        <div
                          className={`retry-circle ${
                            isUploading ? "rotating" : ""
                          }`}
                          onClick={() =>
                            handleRetryUpload({ url,  uuid, name })
                          }
                          style={{
                            position: "absolute",
                            top: "20%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "20px",
                            height: "20px",
                            backgroundColor: "red",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                           
                          }}
                        >
                          <FaRedoAlt style={{ color: "white", fontSize: "14px" }}/>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {answer[4] && (
              <p className="alert-box alert" >
                Please answer the current question before moving to the next.
              </p>
            )} 
      </div>

    </div>
  );
};

export default BankUpload;
