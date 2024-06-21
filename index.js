import {
  stringOutputParser,
  csvOutputParser,
  informationParser,
} from "./src/parsers.js";

// const response = await stringOutputParser({
//   topic: "Dad",
// });

// const response = await csvOutputParser({
//   topic: "sad",
// });

const response = await informationParser({
  phrase: "My name is John. I am 25 years old. I live in New York.",
});

console.log(response);
