import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRedoAlt,FaFilePdf } from "react-icons/fa"; // For the retry icon
import { v4 as uuidv4 } from "uuid"; // Import uuidv4 for generating unique IDs
const apiUrl = process.env.REACT_APP_API_URL;
const apiImage = process.env.REACT_APP_MY_ID_IMAGE;

const Support = ({
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

  // const toBase64 = (file) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (error) => reject(error);
  //   });


  useEffect(() => {
    const storedFiles = localStorage.getItem("file");
    if (storedFiles) {
      const parsedFiles = JSON.parse(storedFiles);
      setFiles(parsedFiles);
      submitSupport(parsedFiles);
    }
  }, [submitSupport]);

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    // console.log(event.target.files);
    if (files.length + selectedFiles.length > apiImage) {
      setErrorMessage(`You can only upload a maximum of ${apiImage} images.`);
      return;
    }

    let errorMessages = "";
    const validFiles = selectedFiles.filter((file) => {
      const isImage =
        file.type.startsWith("image/") || file.type === "application/pdf" ;
      const isSizeValid = file.size <= MAX_UPLOAD_SIZE;

      if (!isImage) errorMessages = "Please upload the image or PDF files." ;
      if (!isSizeValid) errorMessages = "Please upload the file below 10MB.";

      return isImage && isSizeValid;
    });

    setErrorMessage(errorMessages);

    if (!errorMessages) {
      const filesWithBase64 = await Promise.all(
        validFiles.map(async (file) => ({
          file,
          url: URL.createObjectURL(file),
          uuid: uuidv4(),
          name: file.name,
          type: file.type,
          status:"pending"
        }))
      );

      localStorage.setItem(
        "file",
        JSON.stringify([...files, ...filesWithBase64])
      );
      submitSupport(filesWithBase64);
      setFiles((prevFiles) => [...prevFiles, ...filesWithBase64]);

      uploadFiles(filesWithBase64);
    }


  };

  const uploadFiles = async (validFiles) => {
    try {
      setIsUploading(true);

      for (const { file, uuid } of validFiles) {
        const formData = new FormData();
        formData.append("api_key", apiKey);
        formData.append("visitor_token", vist_id);
        formData.append("qtion_id", "66f654783112a");
        formData.append("qtion_num", "13");
        formData.append("lac_token", botToken);
        formData.append("app_ver", app_ver);
        formData.append("userImage", file);
        formData.append("ref_id", uuid);
        formData.append("type", "2");

        const response = await fetch(`${apiUrl}/v1/ccrim_bot_add_doc`, {
          method: "POST",
          body: formData,
        });
        const fileData = await response.json();
        // console.log(fileData);
        if (fileData.resp.error_code === "0") {
          // setSuccessfulUploads((prevUploads) => [
          //   ...prevUploads,
          //   { name, uuid },
          // ]);
          setFiles((prevFiles) =>
            prevFiles.map((f) => (f.uuid === uuid ? { ...f, status: "uploaded" } : f))
          );
  
          // Update the status of the file to "uploaded" in local storage
          const updatedFiles = JSON.parse(localStorage.getItem("file")).map((f) =>
            f.uuid === uuid ? { ...f, status: "uploaded" } : f
          );
          localStorage.setItem("file", JSON.stringify(updatedFiles));
  
          submitSupport(updatedFiles);

        } else {
          setErrorMessage(fileData.resp.message);
          console.error(fileData.resp.message);
          break; // Stops the loop if an error occurs
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
          qtion_num: "13",
          option_val: "670fce3010e33775926208",
          lac_token: botToken,
          app_ver: app_ver,
          ref_id: uuid,
        }),
      });

      const result = await response.json();
      if (result.resp.error_code === "0") {
        setFiles((prevFiles) => prevFiles.filter((file) => file.uuid !== uuid));
        // setSuccessfulUploads((prevUploads) =>
        //   prevUploads.filter((uploadedFile) => uploadedFile.uuid !== uuid)
        // );
        setErrorMessage("");

        // Update localStorage by removing the deleted file
        const updatedFiles = JSON.parse(localStorage.getItem("file")).filter(
          (file) => file.uuid !== uuid
        );
        localStorage.setItem("file", JSON.stringify(updatedFiles));
        submitSupport(updatedFiles);
      } else {
        setErrorMessage("Failed to delete the file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleRetryUpload = (file) => {
    uploadFiles([file]); // Retry upload for the specific file
  };

  const handleSubmit = () => {
    onNext(14);
    onQuestion(15);
  };

  return (
    <div className="question">
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Upload supporting evidence</h2>
          <p className="victim-para">
            Upload screenshots of fraudulent or fake websites, call logs
            involving suspects, evidence from social media conversations (such
            as Instagram, Facebook, Telegram, etc.), and WhatsApp chats.
            {/* , and APK
            files. */}
            {/* Upload screenshots of suspect websites, suspect call log
            screenshots, screenshots of social media (Instagram, Facebook,
            Telegram, etc.), screenshots of WhatsApp chat, and APK files. */}
          </p>
          <input
            type="file"
            id="file-uploads"
            multiple
            onChange={handleFileChange}
            className="file-inputs"
            style={{ display: "none" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
position: "relative", zIndex: "9" 
            }}
          >
            <label htmlFor="file-uploads" className="upload-file">
              Choose Files
            </label>
            <button
              type="button"
              style={{ width: "95px",zIndex:'1'}}
              className="ok-btn"
              onClick={handleSubmit}
            >
              OK {files.length > 0 && <span>{` (${files.length})`}</span>}
            </button>
          </div>
          {errorMessage && (
            <div className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}
          <div className="file-preview">
            {files.length > 0 && (
              <ul>
                {files.map(({ url, uuid, name,type,status }, index) => (
                    <li key={uuid} className="file-item">
                      <div className="image-container">
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
                        >
                          <RxCross2 />
                        </button>
                        {status !=="uploaded" && (
                          <div
                            className={`retry-circle ${
                              isUploading ? "rotating" : ""
                            }`}
                            onClick={() => handleRetryUpload({ url, uuid, name })}
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
                            <FaRedoAlt
                              style={{ color: "white", fontSize: "14px" }}
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;

