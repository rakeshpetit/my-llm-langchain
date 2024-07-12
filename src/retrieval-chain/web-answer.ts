import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { createRetrievalChainCommon } from "../utils.js";

// Function to create a retrieval chain from a URL
async function createRetrievalChainFromUrl(url: string) {
  // Load documents from the URL
  const loader = new CheerioWebBaseLoader(url);
  const docs = await loader.load();

  return createRetrievalChainCommon(docs);
}

// Main function to run the retrieval chain from URL
async function runFromUrl() {
  const url = "https://thoughtbot.com/blog/understanding-open-source-llms";
  const retrievalChain = await createRetrievalChainFromUrl(url);

  const response = await retrievalChain.invoke({
    input: "What does thoughtbot do? Can they help me build a mobile app?",
  });

  console.log(response.answer);
}

runFromUrl();
