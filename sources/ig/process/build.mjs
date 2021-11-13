import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import { createIndexes } from "./createIndex.mjs";
import { outputIndexes } from "./outputIndex.mjs";
import cwd from "./cwd.mjs";
import syncDir from "./syncDir.mjs";
import path from "path";
import os from "os";

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const profile = process.env.PROFILE;
const homeDir = os.homedir();
const imagesPath = path.join(homeDir, profile, "images");
const isMinify = mode == "production";

esbuild
  .build({
    entryPoints: ["pages/index.js"],
    outdir: "dist",
    bundle: true,
    sourcemap: false,
    plugins: [cssModulesPlugin()],
    minify: isMinify,
    loader: {
      ".png": "dataurl",
      ".jpg": "dataurl",
      ".jpeg": "dataurl",
      ".webp": "dataurl",
      ".svg": "text",
    },
  })
  .catch(() => process.exit(1));

esbuild.build({
  entryPoints: ["pages/index.css"],
  outdir: "dist",
  minify: isMinify,
});

const imageIndexes = createIndexes(imagesPath);
const imagesJson = JSON.stringify(imageIndexes);
const imagesJsonOutputPath = path.join(cwd, "dist/data/images.json");
outputIndexes(imagesJson, imagesJsonOutputPath);
syncDir("public", "dist");
