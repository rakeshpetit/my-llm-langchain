import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL;

const ollamaLlm = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3:8b-instruct-q6_K",
});

const openRouterLlm = new ChatOpenAI(
  {
    modelName: "meta-llama/llama-3-8b-instruct:free",
    temperature: 0.8,
    maxTokens: 300,
    openAIApiKey: OPENROUTER_API_KEY,
  },
  {
    basePath: `${OPENROUTER_BASE_URL}/api/v1`,
    baseOptions: {
      headers: {
        "HTTP-Referer": "https://localhost:3000/",
        "X-Title": "Langchain.js Testing",
      },
    },
  }
);

export { ollamaLlm, openRouterLlm };
