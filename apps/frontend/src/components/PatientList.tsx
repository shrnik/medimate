"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import { Patient, getPatients } from "../lib/storage";
import { Link } from "react-router-dom";

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  return (
    <ScrollArea className="h-[400px] border rounded-lg p-4">
      {patients.map((patient) => (
        <Link key={patient.id} to={`/chat/${patient.id}`}>
          <Button variant="ghost" className="w-full justify-start mb-2">
            {patient.name} - {patient.age} years old
          </Button>
        </Link>
      ))}
    </ScrollArea>
  );
}
