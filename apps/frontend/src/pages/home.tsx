import React from "react";
import "../styles/home.css";

import { Link } from "react-router-dom";

interface Patient {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const patients: Patient[] = [
    { id: 1, name: "Patient 1" },
    { id: 2, name: "Patient 2" },
    { id: 3, name: "Patient 3" },
  ];

  return (
    <div className="home-container">
      <div className="patient-history">
        <h2>Patient History</h2>
        <ul>
          {patients.map((patient) => (
            <li key={patient.id}>{patient.name}</li>
          ))}
        </ul>
      </div>
      <Link to="/form">
          <button className="add-patient-button">Add New Patient</button>
        </Link>
    </div>
  );
};

export default Home;
