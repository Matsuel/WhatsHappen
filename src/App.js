import './App.css';
import WelcomePage from './Components/WelcomePage/WelcomePage.tsx';
import SingUpPage from './Components/SignUpPage/SignUpPage.tsx';
import LoginPage from './Components/LoginPage/LoginPage.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SingUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
