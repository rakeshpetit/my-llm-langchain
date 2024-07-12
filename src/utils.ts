import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

import { ollamaLlm } from "./models.js";

const generatePromptTemplate = (prompt) => {
  return ChatPromptTemplate.fromMessages([
    ["system", prompt],
    ["user", "{topic}"],
  ]);
};

// Common function to create a retrieval chain
async function createRetrievalChainCommon(docs: any[]) {
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

export { generatePromptTemplate, createRetrievalChainCommon };
