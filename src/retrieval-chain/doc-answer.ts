import { loadDocsFromFile } from "../fileutils.js";
import { createRetrievalChainCommon } from "../utils.js";

// Function to create a retrieval chain from a file
async function createRetrievalChainFromFile(filePath: string) {
  const fileContents = await loadDocsFromFile(filePath);
  const docs = [
    {
      pageContent: fileContents,
      metadata: {
        source: "http://example.com",
      },
    },
  ];

  return createRetrievalChainCommon(docs);
}

// Main function to run the retrieval chain from file
async function runFromFile() {
  const filePath = "./docs.txt";
  const retrievalChain = await createRetrievalChainFromFile(filePath);

  const response = await retrievalChain.invoke({
    input:
      "Based on the list of these PR comments, what insights can we gain? Can you determine some common feedback provided to developers? Explain the feedback in detail in around 500 to 1000 words. At the end show the number of PRs and comments analysed while producing the text.",
  });
  console.log(response.answer);
}

runFromFile();
