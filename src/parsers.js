import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import defaultModel from "./models.js";
import defaultPromptTemplate, { synonyms } from "./prompt-templates.js";

const defaultParser = new StringOutputParser();
const stringOutputParser = async ({
  topic = "Who created you?",
  model = defaultModel,
  promptTemplate = defaultPromptTemplate,
  parser = defaultParser,
}) => {
  const chain = promptTemplate.pipe(model).pipe(parser);
  const response = await chain.invoke({
    topic,
  });
  return response;
};

const csvOutputParser = async ({
  topic,
  model = defaultModel,
  promptTemplate = synonyms,
  parser = new CommaSeparatedListOutputParser(),
}) => {
  const chain = promptTemplate.pipe(model).pipe(parser);
  const response = await chain.invoke({
    topic,
  });
  return response;
};

export { stringOutputParser, csvOutputParser };
