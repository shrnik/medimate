import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import ChatbotPage from './pages/ChatbotPage';

const App: React.FC = () => {
  // State to track which page is currently displayed
  const [currentPage, setCurrentPage] = useState<'home' | 'chatbot'>('home');

  const navigate = (page: 'home' | 'chatbot') => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'home' && <HomePage navigateToChatbot={() => navigate('chatbot')} />}
      {currentPage === 'chatbot' && <ChatbotPage navigateToHome={() => navigate('home')} />}
    </div>
  );
};

export default App;
