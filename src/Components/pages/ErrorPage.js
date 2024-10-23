import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const { visitorData } = location.state || {};
  console.log(location.state);
  console.log(visitorData);
  console.log(visitorData?.resp);
  console.log(visitorData?.resp?.message);

  // Check if visitorData and visitorData.resp exist before accessing message
  const errorMessage =
    visitorData?.resp?.message || "An error occurred. No details available.";

  return (
    <div className="login-container">
      <header>
        <div
          style={{
            display: "flex",
            flexDirection: "colum",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src="\images\LOGO-TS2.jpg" alt="csb-ts" className="cst-logo" />
          <h1
            className="header-title"
            style={{ padding: 20, textAlign: "center" }}
          >
            1930-Cyber Bot
          </h1>
          <img src="\images\LOGO-INDIA.png" alt="csb-ts" className="csi-logo" />
        </div>
      </header>
      {/* <h1>Error Message</h1> */}
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorPage;
