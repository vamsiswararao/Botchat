import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./First.css"; // Ensure this path is correct
import Help from "../QuestionsList/Help";
import TranslateComponent from "../TranslateComponent";
import PopupBoxComponent from "../PopupBoxComponent";
import Cookies from "js-cookie";
import appVersion from '../../version';
const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_AUTH_TOKEN;


const First = () => {
  const { id } = useParams();
  //console.log(id);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [visitorID, setVisitorID] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  //const botToken = sessionStorage.getItem("visitor_id");
  const vist_id= Cookies.get('visitor_id');
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

       
        if (vistorData.resp.error_code === "0") {
          if(vistorData.resp.visitor_id===vist_id){
            setVisitorID(vistorData.resp.visitor_id)
            console.log("A")
          if (vistorData.resp.sess_sts !== 0) {
            if (vistorData.resp.submitted === 0) {
              navigate("/questions", { replace: true }); // Navigate on success
            } else {
              Cookies.set("visitor_id", vistorData.resp.visitor_id, {
                path: "/",
                sameSite: "Strict",
                expires: 7,
              });
              navigate("/submited",{ replace: true, state: { visitorData: vistorData }  });
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
        } else{
          console.log("B")
          Cookies.remove('visitor_id');
          Cookies.remove('botToken')
          setVisitorID(vistorData.resp.visitor_id)
          Cookies.set("visitor_id", vistorData.resp.visitor_id, {
            path: "/",
            sameSite: "Strict",
            expires: 7,
          })

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
          navigate("/",{ replace: true, state: { visitorData: vistorData }  });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVisitorData();
  }, [id, navigate,botToken,app_ver,vist_id]);

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
        <Help vist_id={visitorID}/>
        {error && <div className="error-msg">{error}</div>}
      </div>
      <p className="translate">
        <TranslateComponent />
      </p>
      {responseStatus &&
        responseStatus.resp &&
        responseStatus.resp.error_code === "0" &&
        responseStatus.resp.submitted === 1 && (
          <PopupBoxComponent responseStatus={responseStatus}  />
        )}
    </div>
  );
};

export default First;
