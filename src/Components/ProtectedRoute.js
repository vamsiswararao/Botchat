import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';


const ProtectedRoute = ({ children }) => {
  const authId= Cookies.get('visitor_id');
  //const token = Cookies.get('bot_token');
  const id = sessionStorage.getItem("access_id");
 // const authId = sessionStorage.getItem("visitor_id"); // retrieve auth ID from sessionStorage
  return authId && id ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

