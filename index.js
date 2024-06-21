import { stringOutputParser } from "./src/parser.js";

const response = await stringOutputParser("Dad");

console.log(response);
