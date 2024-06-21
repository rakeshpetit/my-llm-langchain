import { stringOutputParser } from "./src/parser.js";

const response = await stringOutputParser({
  topic: "Dad",
});

console.log(response);
