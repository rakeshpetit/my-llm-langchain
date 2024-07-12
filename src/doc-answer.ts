import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import * as dotenv from "dotenv";
import { ollamaLlm } from "./models.js";
import { loadDocsFromFile } from "./fileutils.js";

dotenv.config();

// Function to create a retrieval chain from a URL
async function createRetrievalChainFromUrl(filePath: string) {
  const fileContents = await loadDocsFromFile(filePath);
  const docs = [
    {
      pageContent: fileContents,
      metadata: {
        source: "http://example.com",
      },
    },
  ];

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
  const url = "./docs.txt";
  const retrievalChain = await createRetrievalChainFromUrl(url);

  const response = await retrievalChain.invoke({
    input:
      "Based on the list of these PR comments, what insights can we gain? Can you determine some common feedback provided to developers? Explain the feedback in detail in around 500 to 1000 words. At the end show the number of PRs and comments analysed while producing the text.",
  });

  console.log(response.answer);
}

run();
