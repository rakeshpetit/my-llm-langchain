import { ChatPromptTemplate } from "@langchain/core/prompts";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["user", "Tell me a joke about {topic}"],
]);

export default promptTemplate;
