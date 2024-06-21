import { stringOutputParser, csvOutputParser } from "./src/parsers.js";

// const response = await stringOutputParser({
//   topic: "Dad",
// });

const response = await csvOutputParser({
  topic: "sad",
});

console.log(response);
