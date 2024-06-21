import * as path from "path";
import {
  stringOutputParser,
  csvOutputParser,
  informationParser,
} from "./src/parsers.js";
import { jsDeveloper } from "./src/prompts/index.js";
import { generatePromptTemplate } from "./src/utils.js";
import { appendToFile, readMarkdownFile } from "./src/fileutils.js";

// const response = await stringOutputParser({
//   topic: "Dad",
// });

// const response = await csvOutputParser({
//   topic: "sad",
// });

// const response = await informationParser({
//   phrase: "My name is John. I am 25 years old. I live in New York.",
// });

const markdownFilePath = path.join("input.md");
const promptTemplate = generatePromptTemplate(jsDeveloper);

const main = async () => {
  try {
    const topic = await readMarkdownFile(markdownFilePath);
    const response = await stringOutputParser({
      topic,
      promptTemplate,
    });
    await appendToFile(markdownFilePath, `\n\n${response}`);
    console.log("Response appended to the file successfully.");
  } catch (err) {
    console.error("Error reading the markdown file:", err);
  }
};

main();
