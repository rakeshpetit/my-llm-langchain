import { ChatPromptTemplate } from "@langchain/core/prompts";

const generatePromptTemplate = (prompt) => {
  return ChatPromptTemplate.fromMessages([
    ["system", prompt],
    ["user", "{topic}"],
  ]);
};

export { generatePromptTemplate };
