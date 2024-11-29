"use client";

import PatientForm from "../components/PatientForm";
import PatientList from "../components/PatientList";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Doctor&apos;s Assistant</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Patient List</h2>
          <PatientList />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add New Patient</h2>
          <PatientForm />
        </div>
      </div>
    </main>
  );
}
