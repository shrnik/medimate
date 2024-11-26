import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

const Form: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform any form submission logic here
    navigate("/chat"); // Navigate to the chat page
  };

  return (
    <div className="form-container">
      <h1>Add New Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" required />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" name="gender" required />
        </div>
        <button type="submit">Diagnose</button>
      </form>
    </div>
  );
};

export default Form;
