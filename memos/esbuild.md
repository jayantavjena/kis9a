[EsBuild/esbuild.config.js at d34773602b1e2072faf1ca1884dbae56dd9f40f0 · vladcorn/EsBuild · GitHub](https://github.com/vladcorn/EsBuild/blob/d34773602b1e2072faf1ca1884dbae56dd9f40f0/esbuild.config.js)

[GitHub - LukeSheard/esbuild-scripts: An extremely fast create-react-app replacement.](https://github.com/LukeSheard/esbuild-scripts)

```
import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import serve, { error, log } from "create-serve";
import syncDir from "./syncDir.js";
syncDir("../public", "../dist");

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const isWatch = process.argv.includes("-w");
const port = process.env.PORT ? process.env.PORT : 8080;
const isMinify = mode == "production";

const esbuildServe = async (options = {}, serveOptions = {}) => {
  esbuild
    .build({
      ...options,
      watch: isWatch && {
        onRebuild(err) {
          serve.update();
          err ? error("× Failed") : log("✓ Updated");
        },
      },
    })
    .catch(() => process.exit(1));

  if (isWatch) {
    serve.start(serveOptions);
  }
};

esbuildServe(
  {
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
  },
  {
    port: port,
    root: "dist",
  }
);
```
