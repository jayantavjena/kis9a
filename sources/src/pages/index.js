import { h, app, text } from "/modules/js/hyperapp.js";
import { Header } from "/components/header";
import { Top } from "/components/top";
import { fadeIn } from "/modules/js/fadeInOut";
import "./index.css";
import "/layouts/index.css";
import { RSS } from "/modules/js/rss.js";

const viewLoading = () => {
  return h(
    "main",
    {
      id: "loading",
      style: {
        width: "100%",
        textAlign: "left",
        padding: "20px 40px",
        fontSize: "16px",
        fontWeight: "600",
        opacity: 0,
      },
    },
    text("Loading ...")
  );
};

app({
  view: () =>
    h("div", { class: "home-container" }, [Header(), viewLoading(), Top()]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});

window.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("rss-feeds");
  const rss = new RSS(el, "https://zenn.dev/kis9a/feed", {
    limit: 20,
    entryTemplate:
      '<a class="feed" style="opacity: 0" href="{url}" target="_blank"><img class="feed-thumbnail" src="{enclosureUrl}" alt="{author} {title}" /></a>',
  });
  return rss.render().then(() => {
    const el = document.getElementsByClassName("feed");
    if (el) {
      for (var e of el) {
        fadeIn(e, 500);
      }
    }
    document.getElementById("loading").style.display = "none";
  });
});

window.onload = function () {
  const el = document.getElementById("loading");
  if (el) {
    fadeIn(el, 100);
  }
};
