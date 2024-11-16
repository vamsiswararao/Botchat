import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
// import Record from "../QuestionsList/Record";

const ErrorPage = () => {
  const location = useLocation();
  const { visitorData } = location.state || {};
  // console.log(location.state);
  // console.log(visitorData);
  // console.log(visitorData?.resp);
  // console.log(visitorData?.resp?.message);

  // Check if visitorData and visitorData.resp exist before accessing message
  const errorMessage =
    visitorData?.resp?.message || "Bot Not Authorized ";

  return (
    <div className="login-container">
     <Header/>
      {/* <h1>Error Message</h1> */}
      <p>{errorMessage}</p>
      {/* <Record/> */}
    </div>
  );
};

export default ErrorPage;
