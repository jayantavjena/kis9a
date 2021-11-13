import path from "path";
import { getAllFiles } from "./fsTools.mjs";

export const createIndexes = (p) => {
  const filesPaths = getAllFiles(p, []);
  const indexes = [];
  for (var f of filesPaths) {
    indexes.push({ name: path.basename(f) });
  }
  return indexes;
};
