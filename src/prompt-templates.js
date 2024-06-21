import { ChatPromptTemplate } from "@langchain/core/prompts";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["user", "Tell me a joke about {topic}"],
]);

const shortDescription = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful assistant."],
  ["user", "Tell me something about {topic} in 50 words"],
]);

const synonyms = ChatPromptTemplate.fromTemplate(
  "List 5 synonyms for the word {topic} separated by commas. Only return the synonyms and nothing else in the output."
);

const informationExtractor = ChatPromptTemplate.fromTemplate(
  "Extract the name, age, and location of the person from the following phrase. \n{formatInstructions}\n{phrase}"
);

export { shortDescription, synonyms, informationExtractor };

export default promptTemplate;
