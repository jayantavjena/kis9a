import { h, app, text } from "/modules/js/hyperapp.js";
import { Header } from "/components/header";
import "./index.css";
import "/layouts/index.css";
import { RSS } from "/modules/js/rss.js";

app({
  view: () =>
    h("div", { class: "home-container" }, [
      Header(),
      h(
        "h3",
        {
          id: "loading",
          style: { width: "100%", textAlign: "left", padding: "40px" },
        },
        text("Loading...")
      ),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});

window.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("rss-feeds");
  const rss = new RSS(el, "https://zenn.dev/kis9a/feed", {
    limit: 20,
    entryTemplate:
      '<a class="feed" href="{url}" target="_blank"><img class="feed-thumbnail" src="{enclosureUrl}" alt="{author} {title}" /></a>',
  });
  return rss.render().then(() => {
    document.getElementById("loading").style.display = "none";
  });
});
