import { app, h, text } from "/modules/js/hyperapp.js";
import { Link } from "/components/link";
import "/layouts/index.css";
import "./index.css";

app({
  view: () =>
    h("div", { class: "container" }, [
      h("main", { style: { padding: "20px" } }, [
        h("h1", {}, text("Not Found")),
        Link("home"),
      ]),
    ]),
  node: document.getElementById("app"),
});
