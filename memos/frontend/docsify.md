html

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Memos</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta
      name="description"
      content="A task runner / simpler Make alternative written in Go"
    />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/docsify-themeable@0/dist/css/theme-simple.css"
    />
    <style>
      #logo {
        transition: all 0.7s ease;
      }
      #logo:hover {
        -webkit-transform: rotateZ(360deg);
        -ms-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
      }
      .app-name-link img {
        width: 125px;
      }
      :root {
        --base-font-size: 14px;
        --theme-color: #29beb0;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      window.$docsify = {
        name: "Memos",
        repo: "kis9a/kis9a",
        themeColor: "red",
        loadSidebar: true,
        auto2top: true,
        maxLevel: 3,
        subMaxLevel: 3,
      };
    </script>
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/docsify-themeable/dist/js/docsify-themeable.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/docsify-tabs"></script>
    <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-bash.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/prismjs/components/prism-yaml.min.js"></script>
  </body>
</html>

```
