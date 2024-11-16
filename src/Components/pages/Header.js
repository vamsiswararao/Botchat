import React from "react";
// import TranslateComponent from "../TranslateComponent";

export default function Header() {
  return (
    <header > 
      {/* <p className="translate">
          <TranslateComponent />
        </p> */}
      <div
        style={{
          display: "flex",
          flexDirection: "colum",
          justifyContent: "space-between",         
        }}
      >
        <img src="\images\LOGO-INDIA.png" alt="csb-ts" className="csi-logo" />
        <h1 className="header-title"  >
          1930-Cyber Bot
        </h1>
        <img src="\images\LOGO-TS4.png" alt="csb-ts" className="cst-logo" />
      </div>
    </header>
  );
}
