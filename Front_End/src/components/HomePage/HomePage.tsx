// src/components/HomePage.tsx
import React from 'react';
import { logOut } from '../../api/api';
import { useAuth } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { setUser, accessToken, setAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut(accessToken)
      setUser(null);
      setAccessToken("");
      setRefreshToken("");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
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