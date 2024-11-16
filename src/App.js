import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/pages/Login";
import OtpInput from "./Components/pages/otpInput";
import Questions from "./Components/pages/Questions";
import Final from "./Components/pages/Final";
import ProtectedRoute from "./Components/ProtectedRoute";
import First from "./Components/pages/First";
import NotFound from "./Components/pages/NotFound"; // Import the NotFound component
import ErrorPage from "./Components/pages/ErrorPage";
import Success from "./Components/pages/Success";
import TranslateComponent from "./Components/TranslateComponent";



function App() {
  return (
    <Router>
      <div className="App">
        <div className="translate">
        < TranslateComponent />
        </div>
      
        <Routes>
          <Route path="/:id" element={ <First />} />
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/login"  element={<Login />} />
          <Route path="/otp" element={ <OtpInput /> } />

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
                    <Route
            path="/submited"
            element={
              // <ProtectedRoute>
                <Success />
              // </ProtectedRoute>
            }
          />
            <Route path="*" element={<ErrorPage />} />    
                  <Route path="*" element={<NotFound />} />                                  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
