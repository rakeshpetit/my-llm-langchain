import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import * as dotenv from "dotenv";

import { ollamaLlm } from "./models.js";

dotenv.config();

// Create prompt
const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the user's question from the following context: 
  {context}
  Question: {input}`
);

// Create Chain
const chain = await createStuffDocumentsChain({
  llm: ollamaLlm,
  prompt,
});

// Use Cheerio to scrape content from webpage and create documents
const loader = new CheerioWebBaseLoader("https://thoughtbot.com/");
const docs = await loader.load();

// Text Splitter
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});
const splitDocs = await splitter.splitDocuments(docs);
// console.log(splitDocs);

// Instantiate Embeddings function
const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text:latest",
});

// Create Vector Store
const vectorstore = await MemoryVectorStore.fromDocuments(
  splitDocs,
  embeddings
);

// Create a retriever from vector store
const retriever = vectorstore.asRetriever({ k: 2 });

// Create a retrieval chain
const retrievalChain = await createRetrievalChain({
  combineDocsChain: chain,
  retriever,
});

const response = await retrievalChain.invoke({
  input: "What does thoughtbot do? Can they help me build a mobile app?",
});

console.log(response.answer);
