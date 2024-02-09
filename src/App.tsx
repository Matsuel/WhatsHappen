import './App.css';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import Profil from './Components/Profil/Profil';
import Register from './Components/Register/Register';
import LoginPage from './Components/LoginPage/LoginPage';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profil/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
