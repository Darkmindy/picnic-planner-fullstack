// src/components/HomePage.tsx
import React from 'react';
import { logOut } from '../../api/api';
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    setUser(null);
    navigate("/login");
  };
  return (
    <>

      <div>Home Page - Accessible to both users and admins</div>
      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
};

export default HomePage;