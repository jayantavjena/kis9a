import { setDir } from "./fsTools.mjs";
import path from "path";
import fs from "fs";

export const outputIndexes = (str, wp) => {
  const pathDir = path.dirname(wp);
  !fs.existsSync(pathDir) && setDir(pathDir);
  fs.writeFileSync(wp, str, (err) => {
    if (err) console.error(err);
  });
};
