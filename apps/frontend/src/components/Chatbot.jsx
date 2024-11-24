import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    setMessages([...messages, { text, sender: 'user' }]);
    // Add bot reply (for now, static)
    setMessages((prev) => [...prev, { text: "I'm here to help!", sender: 'bot' }]);
  };

  return (
    <div className="chatbot">
      <ChatMessages messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default Chatbot;
