import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import TypeFormComponent from './Components/TypeFormComponent';
import OtpInput from './Components/otpInput';
import PhoneNumber from './Components/PhoneNumber';
import Home from './Components/Home';
import Scroll from './Components/Scroll';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Scroll />} />
          <Route path="/otp" element={<OtpInput />} />
          <Route path="/phone" element={<PhoneNumber />} />
          <Route path="/typeform" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
