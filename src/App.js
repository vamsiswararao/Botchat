import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/pages/Login';
import OtpInput from './Components/pages/otpInput';
import Scroll from './Components/pages/Scroll';
//import TypeFormComponent from './Components/TypeFormComponent';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Scroll />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OtpInput />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
