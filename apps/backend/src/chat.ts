import OpenAI from "openai";
import dotenv from "dotenv";
import { query } from "express";
import { getClosestDocs } from "./embeddings";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_1,
});

const getListOfDiseases = (
  query: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) => {
  return openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are an expert at helping doctors analyze patient symptoms, consider medical history, and make well-informed recommendations for treatment or action. You only suggest a list diseases in descreasing order of likelihood and nothing else",
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
  query: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) => {
  return openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are an expert at helping doctors analyze patient symptoms, consider medical history, and make well-informed recommendations for treatment or action. You only suggest a list of tests to confirm the diagnosis and nothing else",
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
  query: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) => {
  return openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are an expert at helping doctors analyze patient symptoms, consider medical history, and make well-informed recommendations for treatment or action",
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

const aiRouter = async (
  query: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) => {
  let docs = "";
  if (query?.[0].content?.[0]) {
    if ((query[0].content[0] as any)?.text) {
      const { documents } = await getClosestDocs(
        (query[0].content[0] as any)?.text
      );
      docs = documents[0].toString();
    }
  }
  const { choices } = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are an expert at helping doctors analyze patient symptoms. You only suggest 1 or 2. You have to functions: 1. suggest a list of diseases in decreasing order of likelihood and 2. suggest a list of tests to confirm the diagnosis. Please provide the list of diseases in decreasing order of likelihood. Return the number 1 or 2 to indicate which function you would like to use. if not anything else return the normal chat (3). You can only return 1,2 or 3",
          },
        ],
      },
      {
        role: "user",
        content: [{ type: "text", text: docs }],
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
      return getListOfDiseases(query);
    case "2":
      return getListOfTests(query);
    default:
      return normalChat(query);
  }
};

export { aiRouter };
