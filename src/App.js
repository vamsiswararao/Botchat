import "./App.css";
import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom";
import Login from "./Components/pages/Login";
import OtpInput from "./Components/pages/otpInput";
import Questions from "./Components/pages/Questions";
import Final from "./Components/pages/Final";
import First from "./Components/pages/First";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OtpInput />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/success" element={<Final />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
