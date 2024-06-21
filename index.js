import { StringOutputParser } from "@langchain/core/output_parsers";
import ollamaLlm from "./src/models.js";
import promptTemplate from "./src/prompt-templates.js";

const chain = promptTemplate.pipe(ollamaLlm).pipe(new StringOutputParser());

const response = await chain.invoke({
  topic: "Who created you?",
});

console.log(response);
