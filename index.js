import {
  stringOutputParser,
  csvOutputParser,
  informationParser,
} from "./src/parsers.js";
import { rephraseWithOptions } from "./src/prompts/index.js";
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

const promptTemplate = generatePromptTemplate(rephraseWithOptions);
const response = await stringOutputParser({
  topic: `"Let's rock and roll!"`,
  promptTemplate,
});

console.log(response);
