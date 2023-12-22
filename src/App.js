import './App.css';
import WelcomePage from './Components/WelcomePage/WelcomePage.tsx';
import Register from './Components/Register/Register.tsx';
import LoginPage from './Components/LoginPage/LoginPage.tsx';
import Home from './Components/Home/Home.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
