import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import PicnicPlanner from './components/PicnicPlanner/PicnicPlanner';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminPage from './pages/AdminPage/AdminPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planner" element={<PicnicPlanner />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
