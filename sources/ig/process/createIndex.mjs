import path from "path";
import { getAllFiles } from "./fsTools.mjs";

export const createIndexes = (p) => {
  const filesPaths = getAllFiles(p, []);
  const indexes = [];
  for (var f of filesPaths) {
    if (path.extname(f) === ".png") {
      const fname = path.basename(f);
      const dirname = path.basename(path.dirname(f));
      indexes.push({ name: path.join(dirname, fname) });
    }
  }
  return indexes;
};
