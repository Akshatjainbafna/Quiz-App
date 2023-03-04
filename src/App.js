import logo from './logo.svg';
import './App.css';
import HomePage from './components/home.component';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/welcomePage.component';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route path="/dashboard" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
