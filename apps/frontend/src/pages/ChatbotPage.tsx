import React from 'react';
import Chatbot from '../components/Chatbot';
import './ChatbotPage.css';

interface ChatbotPageProps {
  navigateToHome: () => void;
}

const ChatbotPage: React.FC<ChatbotPageProps> = ({ navigateToHome }) => {
  return (
    <div className="chatbot-page">
      <button onClick={navigateToHome} className="navigate-button">
        Back to Home
      </button>
      <Chatbot />
    </div>
  );
};

export default ChatbotPage;
