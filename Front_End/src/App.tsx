import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import PicnicPlanner from './components/PicnicPlanner';
import Navbar from './components/Navbar';
import LoginPage from "./pages/LoginPage/LoginPage";
import "./App.css";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Router>
      <LoginPage/>
      <Navbar />
      <div className="app">
        <header>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/planner" element={<PicnicPlanner />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
