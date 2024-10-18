import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/pages/Login";
import OtpInput from "./Components/pages/otpInput";
import Questions from "./Components/pages/Questions";
import Final from "./Components/pages/Final";
import ProtectedRoute from "./Components/ProtectedRoute";
import First from "./Components/pages/First";
import NotFound from "./Components/pages/NotFound"; // Import the NotFound component



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/:id" element={ <First />} />
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/login"  element={<ProtectedRoute><Login /></ProtectedRoute>} />
          <Route path="/otp" element={<ProtectedRoute> <OtpInput /> </ProtectedRoute>} />

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
              <ProtectedRoute>
                <Final />
              </ProtectedRoute>
            }
          />
                  <Route path="*" element={<NotFound />} />                                  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
