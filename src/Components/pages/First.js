import React from "react";
import "./First.css"; // Ensure this path is correct
import Help from "../QuestionsList/Help";

const First = () => {
  return (
    <div className="first-container">
      <header>
        <div
          style={{
            display: "flex",
            flexDirection: "colum",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <img src="\images\LOGO-TS2.jpg" alt="csb-ts" className="cst-logo" />
          <h1 className="header-title" style={{ textAlign: "center" }}>
            1930-Cyber Bot
          </h1>
          <img src="\images\LOGO-INDIA.png" alt="csb-ts" className="csi-logo" />
        </div>
      </header>
      <div className="help-container">
      <Help />
      </div>
    </div>
  );
};

export default First;
