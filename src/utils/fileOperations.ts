import { readFileSync } from "fs";
import { join } from "path";
import fs from "fs";

export const getDataFromJsonFile = (filename: string) => {
  const filePath = join(__dirname.replace("utils", "data"), filename);
  const fileContent = readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
};

export const writeToJsonFile = (fileName: string, data: string) => {
  const filePath = join(__dirname.replace("utils", "data"), fileName);
  fs.writeFile(filePath, data, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("File written successfully");
    }
  });
};
