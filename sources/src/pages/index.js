import { h, app, text } from "/modules/js/hyperapp.js";
import { Header } from "/components/header";
import "./index.css";
import "/layouts/index.css";
import { RSS } from "/modules/js/rss.js";

const defaultState = {
  loading: false,
};

const initialState = [defaultState];

app({
  init: initialState,
  view: ({ loading }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", { id: "rss-feeds" }, [
        loading &&
          h(
            "h1",
            { style: { width: "100%", textAlign: "left", padding: "20px" } },
            text("Loading...")
          ),
      ]),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});

window.onload = function () {
  const rss = new RSS(
    document.querySelector("#rss-feeds"),
    "https://zenn.dev/kis9a/feed",
    {
      limit: 20,
      entryTemplate:
        '<a class="feed" href="{url}" target="_blank"><img class="feed-thumbnail" src="{enclosureUrl}" alt="{author} {title}" /></a>',
    }
  );
  rss.render().then(() => {});
};
