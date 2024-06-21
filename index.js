import { ChatOllama } from "@langchain/community/chat_models/ollama";

const ollamaLlm = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "llama3:8b-instruct-q6_K",
});

const response = await ollamaLlm.invoke("Who created you?");
console.log(response.content);
