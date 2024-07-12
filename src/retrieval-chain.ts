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
// Function to create a retrieval chain from a URL
async function createRetrievalChainFromUrl(url: string) {
  // Load documents from the URL
  const loader = new CheerioWebBaseLoader(url);
  const docs = await loader.load();

  // Split documents into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const splitDocs = await splitter.splitDocuments(docs);

  // Create embeddings
  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text:latest",
  });

  // Create vector store
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  // Create prompt
  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question from the following context: 
    {context}
    Question: {input}`
  );

  // Create chain
  const chain = await createStuffDocumentsChain({
    llm: ollamaLlm,
    prompt,
  });

  // Create retriever
  const retriever = vectorstore.asRetriever({ k: 2 });

  // Create retrieval chain
  return await createRetrievalChain({
    combineDocsChain: chain,
    retriever,
  });
}
// Main function to run the retrieval chain
async function run() {
  const url = "https://thoughtbot.com/blog/understanding-open-source-llms";
  const retrievalChain = await createRetrievalChainFromUrl(url);

  const response = await retrievalChain.invoke({
    input: "What does thoughtbot do? Can they help me build a mobile app?",
  });

  console.log(response.answer);
}

run();
