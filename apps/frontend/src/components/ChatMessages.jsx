import React from 'react';
import './ChatMessages.css';

const ChatMessages = ({ messages }) => {
  return (
    <div className="chat-messages">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
