import React from 'react';
import './HomePage.css';

interface HomePageProps {
  navigateToChatbot: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToChatbot }) => {
  return (
    <div className="home-page">
      <h1>MediMate</h1>
      <p>Welcome to MediMate!</p>
      <button onClick={navigateToChatbot} className="navigate-button">
        Add New Patient
      </button>
    </div>
  );
};

export default HomePage;
