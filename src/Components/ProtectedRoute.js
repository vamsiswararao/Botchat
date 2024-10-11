import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authId = sessionStorage.getItem("visitor_id"); // retrieve auth ID from sessionStorage
  return authId ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

