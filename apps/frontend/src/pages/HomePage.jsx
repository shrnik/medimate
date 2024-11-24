import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/chatbot');
  };

  return (
    <div className="home-page">
      <h1>MediMate</h1>
      <div className="welcome-container">
        <button className="new-patient-btn" onClick={handleNavigation}>
          Add new Patient
        </button>
      </div>
    </div>
  );
};

export default HomePage;
