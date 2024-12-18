export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  medicalHistory: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const getPatients = (): Patient[] => {
  if (typeof window === "undefined") return [];
  const patients = localStorage.getItem("patients");
  return patients ? JSON.parse(patients) : [];
};

export const getPatient = (patientId: string): Patient | undefined => {
  const patients = getPatients();
  return patients.find((patient) => patient.id === patientId);
};

export const savePatient = (patient: Patient) => {
  const patients = getPatients();
  const updatedPatients = [...patients, patient];
  localStorage.setItem("patients", JSON.stringify(updatedPatients));
  // emit event
  if (typeof window !== "undefined") {
    window.dispatchEvent(new StorageEvent("storage", { key: "patients" }));
  }
};

export const getChatMessages = (patientId: string): ChatMessage[] => {
  if (typeof window === "undefined") return [];
  const messages = localStorage.getItem(`chat_${patientId}`);
  return messages ? JSON.parse(messages) : [];
};

export const saveChatMessage = (message: ChatMessage, patientId: string) => {
  const messages = getChatMessages(patientId);
  const updatedMessages = [...messages, message];
  localStorage.setItem(`chat_${patientId}`, JSON.stringify(updatedMessages));
};
