import fs from "fs";
import path from "path";
import crypto from "crypto";
import cwd from "./cwd.mjs";

const excludes = [
  /^\/.github\//,
  /^\/infrastructure\//,
  /^\/manifest\.json/,
  /^\/favicon\./,
  /^\/precache-manifest\./,
  /^\/service-worker\.js/,
];

const makePrecaches = (srcDir, options) => {
  const res = Object.assign({}, {}, options || {});
  if (fs.lstatSync(srcDir).isDirectory()) {
    const files = fs.readdirSync(srcDir);
    FILE_ENTRTY: for (const entry of files) {
      const epath = path.join(srcDir, entry);
      if (fs.lstatSync(epath).isDirectory()) {
        makePrecaches(epath, options);
      } else {
        const eurl = epath.replace(/\\/g, "/").replace(options.baseDir, "");
        for (const p of excludes) {
          if (eurl.match(p)) {
            continue FILE_ENTRTY;
          }
        }
        const s = fs.readFileSync(epath, { encoding: "utf8" });
        const hash = crypto.createHash("sha256");
        hash.update(s);
        options.entries.push({
          revision: hash.digest("hex"),
          url: eurl,
        });
      }
    }
  }
  return res;
};

const v = makePrecaches("./dist", {
  baseDir: "dist",
  entries: [],
});

const precacheManifest = `
/* eslint-disable no-undef */
self.__precacheManifest = (self.__precacheManifest || []).concat(${JSON.stringify(
  v.entries,
  null,
  2
)});
`;

fs.writeFileSync(
  path.join(cwd, "dist/precache-manifest.7d876d7d79b651716dd0.js"),
  precacheManifest,
  { encoding: "utf8" }
);
