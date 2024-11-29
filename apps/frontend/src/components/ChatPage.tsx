"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import ChatInterface from "./ChatInterface";
import { Patient, getPatients } from "../lib/storage";
import { Link, useParams } from "react-router-dom";

export default function ChatPage() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const patients = getPatients();
    const foundPatient = patients.find((p) => p.id === patientId);
    setPatient(foundPatient || null);
  }, [patientId]);

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link to="/">
          <Button variant="outline">← Back to Patient List</Button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Chat with {patient.name}</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ChatInterface patientId={patient.id} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Patient Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {patient.name}
            </p>
            <p>
              <strong>Age:</strong> {patient.age}
            </p>
            <p>
              <strong>Gender:</strong> {patient.gender}
            </p>
            <p>
              <strong>Medical History:</strong> {patient.medicalHistory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
