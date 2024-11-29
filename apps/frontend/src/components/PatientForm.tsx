"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Patient, savePatient } from "../lib/storage";

export default function PatientForm() {
  const [patient, setPatient] = useState<Omit<Patient, "id">>({
    name: "",
    age: 0,
    gender: "",
    medicalHistory: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      ...patient,
      id: Date.now().toString(),
    };
    savePatient(newPatient);
    setPatient({ name: "", age: 0, gender: "", medicalHistory: "" });
    //   router.refresh() // This will cause the PatientList to re-render with the new data
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={patient.name}
          onChange={(e) => setPatient({ ...patient, name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={patient.age}
          onChange={(e) =>
            setPatient({ ...patient, age: parseInt(e.target.value) })
          }
          required
        />
      </div>
      <div>
        <Label htmlFor="gender">Gender</Label>
        <Input
          id="gender"
          value={patient.gender}
          onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="medicalHistory">Medical History</Label>
        <Textarea
          id="medicalHistory"
          value={patient.medicalHistory}
          onChange={(e) =>
            setPatient({ ...patient, medicalHistory: e.target.value })
          }
          required
        />
      </div>
      <Button type="submit">Add Patient</Button>
    </form>
  );
}
