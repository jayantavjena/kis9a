import esbuild from "esbuild";
import http from "http";
import fs from "fs";
import path from "path";
import os from "os";
import cwd from "./cwd.mjs";
import syncDir from "./syncDir.mjs";
import { createIndexes } from "./createIndex.mjs";
import { outputIndexes } from "./outputIndex.mjs";

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const isMinify = mode == "production";
const usePort = process.env.PORT ? process.env.PORT : 8888;
const profile = process.env.PROFILE;
const homeDir = os.homedir();
const imagesPath = path.join(homeDir, profile, "images");

const esbuildServer = (serverOptions, options) => {
  esbuild.serve(serverOptions, options).then((result) => {
    const { host, port } = result;
    http
      .createServer((req, res) => {
        const options = {
          hostname: host,
          port: port,
          path: req.url,
          method: req.method,
          headers: req.headers,
        };
        const proxyReq = http.request(options, (proxyRes) => {
          if (proxyRes.statusCode === 404) {
            const indexPath = path.join(cwd, "dist", "index.html");
            const data = fs.readFileSync(indexPath, "utf8");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
          }
          res.writeHead(proxyRes.statusCode, proxyRes.headers);
          proxyRes.pipe(res, { end: true });
        });
        req.pipe(proxyReq, { end: true });
      })
      .listen(usePort);
  });
};

esbuildServer(
  {
    servedir: "dist",
  },
  {
    entryPoints: ["pages/index.js"],
    outdir: "dist",
    bundle: true,
    sourcemap: false,
    minify: isMinify,
    loader: {
      ".png": "dataurl",
      ".jpg": "dataurl",
      ".jpeg": "dataurl",
      ".webp": "dataurl",
      ".svg": "text",
    },
  }
);

const imageIndexes = createIndexes(imagesPath);
const imagesJson = JSON.stringify(imageIndexes);
const imagesJsonOutputPath = path.join(cwd, "dist/data/images.json");
outputIndexes(imagesJson, imagesJsonOutputPath);
syncDir("public", "dist");
