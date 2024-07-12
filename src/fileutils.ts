import * as fs from "fs";

const fsPromises = fs.promises;

const readMarkdownFile = async (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const appendToFile = async (
  filePath: string,
  content: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, content, "utf8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

async function loadDocsFromFile(filePath) {
  try {
    const data = await fsPromises.readFile(filePath, "utf-8");
    return data;
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    throw error;
  }
}

export { readMarkdownFile, appendToFile, loadDocsFromFile };
