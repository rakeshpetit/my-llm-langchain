import {
  stringOutputParser,
  csvOutputParser,
  informationParser,
} from "./src/parsers.js";
import { promptArchitect } from "./src/prompts/index.js";
import { generatePromptTemplate } from "./src/utils.js";

// const response = await stringOutputParser({
//   topic: "Dad",
// });

// const response = await csvOutputParser({
//   topic: "sad",
// });

// const response = await informationParser({
//   phrase: "My name is John. I am 25 years old. I live in New York.",
// });

const promptTemplate = generatePromptTemplate(promptArchitect);
const response = await stringOutputParser({
  topic: "Cyber Security and Privacy officer",
  promptTemplate,
});

console.log(response);
