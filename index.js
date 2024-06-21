import { stringOutputParser } from "./src/parsers.js";

const response = await stringOutputParser({
  topic: "Dad",
});

console.log(response);
