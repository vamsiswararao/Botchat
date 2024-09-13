import React from "react";
import { useNavigate } from "react-router-dom";
import "./First.css"; // Ensure this path is correct

const First = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/login");
  };

  return (
    <div className="main-container">
      <img
        alt="police"
        src="https://newsmeter.in/h-upload/2020/11/17/287607-965016-hyderabad-commissionerate.jpg"
      />
      <button className="start_btn" onClick={handleStart}>
        Start
      </button>
    </div>
  );
};

export default First;
