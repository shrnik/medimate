import React from 'react';
import './App.css';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="App">
      <h1 className="title">MediMate</h1>
      <div className="welcome">
        <p>👋 <strong>Welcome!</strong></p>
        <p>I'm MediMate</p>
        <p>Ask me anything about the symptoms.</p>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
