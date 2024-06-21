import { StringOutputParser } from "@langchain/core/output_parsers";
import defaultModel from "./models.js";
import defaultPromptTemplate from "./prompt-templates.js";

const defaultParser = new StringOutputParser();
async function stringOutputParser({
  topic = "Who created you?",
  model = defaultModel,
  promptTemplate = defaultPromptTemplate,
  parser = defaultParser,
}) {
  const chain = promptTemplate.pipe(model).pipe(parser);
  const response = await chain.invoke({
    topic,
  });
  return response;
}

export { stringOutputParser };
