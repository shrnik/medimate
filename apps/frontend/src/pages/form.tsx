import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(() => {
    const storedPatients = localStorage.getItem("patients");
    return storedPatients ? JSON.parse(storedPatients) : [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const age = formData.get("age") as string;
    const gender = formData.get("gender") as string;

    const newPatient = { name, age, gender };

    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);

    // Store the updated list in localStorage
    localStorage.setItem("patients", JSON.stringify(updatedPatients));

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
