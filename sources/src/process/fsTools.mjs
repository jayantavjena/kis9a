import path from "path";
import fs from "fs";

export const getAllFiles = (dir, filePaths = []) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filePaths = getAllFiles(filePath, filePaths);
    } else {
      filePaths.push(filePath);
    }
  });
  return filePaths;
};

export const setDir = (pathDir) => {
  try {
    fs.mkdirSync(pathDir, { recursive: true });
  } catch (error) {
    console.error(error.message);
  }
};
