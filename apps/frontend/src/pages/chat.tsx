import React, { useEffect, useState } from "react";
import "../styles/chat.css";
import { Button } from "../components/ui/button";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [patients, setPatients] = useState<
    { name: string; age: string; gender: string }[]
  >([]);

  useEffect(() => {
    // Load patients from localStorage when the component mounts
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput(""); // Clear the input after sending
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
      </div>
      <div className="chat-content">
        {/* Sidebar to display patients */}
        <div className="chat-sidebar">
          <h3>Patients</h3>
          <ul>
            {patients.map((patient, index) => (
              <li key={index}>{patient.name}</li>
            ))}
          </ul>
        </div>
        {/* Main Chat Area */}
        <div className="chat-main">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className="chat-message">
                {message}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="chat-input"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
