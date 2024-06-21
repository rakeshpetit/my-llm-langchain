import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";
import defaultModel from "./models.js";
import defaultPromptTemplate, {
  informationExtractor,
  synonyms,
} from "./prompt-templates.js";
import { StructuredOutputParser } from "langchain/output_parsers";

const stringOutputParser = async ({
  topic = "Who created you?",
  model = defaultModel,
  promptTemplate = defaultPromptTemplate,
  parser = new StringOutputParser(),
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

const structuredOutputParser = StructuredOutputParser.fromNamesAndDescriptions({
  name: "name of the person",
  age: "age of the person",
  location: "location of the person",
});
const informationParser = async ({
  phrase,
  model = defaultModel,
  promptTemplate = informationExtractor,
  parser = structuredOutputParser,
}) => {
  const chain = promptTemplate.pipe(model).pipe(parser);
  const response = await chain.invoke({
    phrase,
    formatInstructions: parser.getFormatInstructions(),
  });
  return response;
};

export { stringOutputParser, csvOutputParser, informationParser };
