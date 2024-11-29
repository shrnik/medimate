import { ChatCompletionMessageParam } from "openai/resources";

export type PatientInfo = {
  age: number;
  name: string;
  gender: string;
  symptoms: string[];
};

export type CompletionRequestBody = {
  chat: Array<ChatCompletionMessageParam>;
  patientInfo: PatientInfo;
};
