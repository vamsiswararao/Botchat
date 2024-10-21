import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./First.css"; // Ensure this path is correct
import Help from "../QuestionsList/Help";
import TranslateComponent from "../TranslateComponent";
import PopupBoxComponent from "../PopupBoxComponent";
import Cookies from "js-cookie";
import appVersion from '../../version';
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_AUTH_TOKEN;
//const vist_id = sessionStorage.getItem("visitor_id");

const First = () => {
  const { id } = useParams();
  //console.log(id);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  //const botToken = sessionStorage.getItem("visitor_id");
  const botToken = Cookies.get("bot_token");
  const app_ver = appVersion.app_ver;
  console.log(app_ver)

  //const id="1234567890"

  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const visitorResponse = await fetch(`${apiUrl}/v1/ccrim_bot_vist_ip`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: apiKey,
            visitor_token: id,
            lac_token: botToken,
            "app_ver":app_ver
            
          }),
        });

        if (!visitorResponse.ok) {
          throw new Error("Failed to fetch Address options");
        }
        const vistorData = await visitorResponse.json();
        console.log(vistorData);
        // setResponseStatus(vistorData);
        // console.log(vistorData.resp);
        if (vistorData.resp.error_code === "0") {
          if (vistorData.resp.sess_sts !== 0) {
            if (vistorData.resp.submitted === 0) {
              navigate("/questions", { replace: true }); // Navigate on success
            } else {
              Cookies.set("visitor_id", vistorData.resp.visitor_id, {
                path: "/",
                sameSite: "Strict",
                expires: 7,
              });
              setResponseStatus(vistorData);
            }
          } else {
            Cookies.set("visitor_id", vistorData.resp.visitor_id, {
              path: "/",
              sameSite: "Strict",
              expires: 7,
            });
            const keysToRemove = [
              "gender",
              "howMuch",
              "Profession",
              "policeStation",
              "qualification",
              "suspectCall",
              "suspectContact",
              "suspectSpeck",
              "time",
              "victimAge",
              "victimName",
              "zip",
              "file",
              "des",
              "address1",
              "city",
              "formData",
              "district",
              "phoneNumber",
              "formSuspectData",
              "formVictimData",
            ];

            // Loop through the keys and remove them from localStorage
            keysToRemove.forEach((key) => {
              localStorage.removeItem(key);
            });
          }
        } else {
          navigate("/", { replace: true }); // Navigate on success
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVisitorData();
  }, [id, navigate,botToken,app_ver]);

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
        {error && <div className="error-msg">{error}</div>}
      </div>
      <p className="translate">
        <TranslateComponent />
      </p>
      {responseStatus &&
        responseStatus.resp &&
        responseStatus.resp.error_code === "0" &&
        responseStatus.resp.submitted === 1 && (
          <PopupBoxComponent responseStatus={responseStatus} />
        )}
    </div>
  );
};

export default First;
