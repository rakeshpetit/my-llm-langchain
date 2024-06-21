import * as fs from "fs";

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

export { readMarkdownFile, appendToFile };
