import OpenAI from "openai";
import dotenv from "dotenv";
import { query } from "express";
import { getClosestDocs } from "./embeddings";
import { ChatCompletionMessageParam } from "openai/resources";
import { CompletionRequestBody, PatientInfo } from "./types";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_1,
});

type ExtraInfo = {
  patientInfo: PatientInfo;
  context: string;
};

const getListOfDiseases = (
  query: Array<ChatCompletionMessageParam>,
  extraInfo: ExtraInfo
) => {
  const { context, patientInfo } = extraInfo;
  return openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are an expert at helping doctors analyze patient symptoms, consider medical history, and make well-informed recommendations for treatment or action. You only suggest a list diseases in descreasing order of likelihood and nothing else \n Use html tags for formatting. \n Do not talk about pubmed articles \n PatientInfo: ${JSON.stringify(patientInfo)} \n Here are some pubmed articles that might be related to patient's condition: ${context}`,
          },
        ],
      },
      ...query,
    ],
    response_format: {
      type: "text",
    },
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
};

const getListOfTests = (
  query: Array<ChatCompletionMessageParam>,
  extraInfo: ExtraInfo
) => {
  const { patientInfo, context } = extraInfo;
  return openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are an expert at helping doctors analyze patient symptoms, consider medical history, and make well-informed recommendations for treatment or action. You only suggest a list of tests to confirm the diagnosis and nothing else \n Use html tags for formatting. \n Do not talk about pubmed articles \n PatientInfo: ${JSON.stringify(patientInfo)} \n Here are some pubmed articles that might be related to patient's condition: ${context}`,
          },
        ],
      },
      ...query,
    ],
    response_format: {
      type: "text",
    },
    temperature: 1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
};

const normalChat = async (
  query: Array<ChatCompletionMessageParam>,
  extraInfo: ExtraInfo
) => {
  const { context, patientInfo } = extraInfo;
  return openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are an expert at helping doctors analyze patient symptoms, consider medical history, and make well-informed recommendations for treatment or action \n Use html tags for formatting. \n Do not talk about pubmed articles \n PatientInfo: ${JSON.stringify(patientInfo)} \n Here are some Pubmed articles that might be related to patient's condition: ${context}`,
          },
        ],
      },
      ...query,
    ],
    temperature: 0.1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
};

const aiRouter = async (body: CompletionRequestBody) => {
  const { chat: query, patientInfo } = body;
  const context = await getPubmedDocs(query);

  const { choices } = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: `You are an expert at helping doctors analyze patient symptoms. You only suggest 1 or 2. You have to functions: 1. suggest a list of diseases in decreasing order of likelihood and 2. suggest a list of tests to confirm the diagnosis. Please provide the list of diseases in decreasing order of likelihood. Return the number 1 or 2 to indicate which function you would like to use. if not anything else return the normal chat (3). You can only return 1,2 or 3 \n PatientInfo: ${JSON.stringify(patientInfo)}`,
          },
        ],
      },
      ...query,
    ],
    response_format: {
      type: "text",
    },
    temperature: 0.1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const a = choices[0].message.content;

  switch (a) {
    case "1":
      return getListOfDiseases(query, { context, patientInfo });
    case "2":
      return getListOfTests(query, { context, patientInfo });
    default:
      return normalChat(query, { context, patientInfo });
  }
};

const getKeywords = async (query: Array<ChatCompletionMessageParam>) => {
  const userQueries = query.filter((q) => q.role === "user");
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are an expert at finding the medical keywords in the doctor's query. You only suggest the keywords and nothing else. Do not find more than 20 keywords. Return the keywords in a comma separated list. Be precise and concise. Do not include any other information. You are helping a doctor",
          },
        ],
      },
      ...userQueries,
    ],
    response_format: {
      type: "text",
    },
    temperature: 0.1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.choices[0].message.content;
};

const getPubmedDocs = async (query: Array<ChatCompletionMessageParam>) => {
  const keywords = await getKeywords(query);
  if (!keywords) {
    return "";
  }
  const { documents } = await getClosestDocs(keywords);
  return documents[0].toString();
};

export { aiRouter };
