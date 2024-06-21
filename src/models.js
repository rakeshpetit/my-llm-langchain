import { ChatOllama } from "@langchain/community/chat_models/ollama";

const ollamaLlm = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3:8b-instruct-q6_K",
});

export default ollamaLlm;
