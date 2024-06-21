import { ChatPromptTemplate } from "@langchain/core/prompts";

const promptTemplate = ChatPromptTemplate.fromTemplate(
  "Tell me a joke about {topic}"
);

export default promptTemplate;
