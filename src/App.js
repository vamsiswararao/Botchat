import "./App.css";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Login from "./Components/pages/Login";
import OtpInput from "./Components/pages/otpInput";
import Questions from "./Components/pages/Questions";
import Final from "./Components/pages/Final";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<First />} /> */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OtpInput />} />

          {/* Protected Routes */}
          <Route
            path="/questions"
            element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              // <ProtectedRoute>
                <Final />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
