import {
  stringOutputParser,
  csvOutputParser,
  informationParser,
} from "./src/parsers.js";
import { emoji } from "./src/prompts/index.js";
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

const promptTemplate = generatePromptTemplate(emoji);
const response = await stringOutputParser({
  topic: `Time to party`,
  promptTemplate,
});

console.log(response);
