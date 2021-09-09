import fs from "fs";
import path from "path";
import cwd from "./cwd.mjs";
import { getAllFiles, setDir } from "./fsTools.mjs";

const syncDir = (from, to) => {
  from = path.join(cwd, from);
  to = path.join(cwd, to);
  const filePaths = getAllFiles(from, []);
  filePaths &&
    filePaths.forEach((filePath) => {
      const pathBase = path.relative(from, filePath);
      const pathTarget = path.join(to, pathBase);
      const pathDir = path.dirname(pathTarget);
      !fs.existsSync(pathDir) && setDir(pathDir);
      fs.copyFileSync(filePath, pathTarget);
    });
};

export default syncDir;
