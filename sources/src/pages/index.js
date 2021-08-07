import { h, app, text } from "/modules/js/hyperapp.js";
import { Http } from "/modules/js/Http.js";
import { Header } from "/components/header";
import { Top } from "/components/top";
import "./index.css";
import "/layouts/index.css";

const initFeeds = Http({
  url: "https://www.feedrapp.info/?support=true&version=1.3.0&q=https://zenn.dev/kis9a/feed&num=20",
  response: "json",
  action: (state, res) => {
    return {
      ...state,
      feeds: res.responseData.feed.entries,
      loading: false,
    };
  },
});

const initialState = [{ feeds: [], loading: true }, initFeeds];

const viewLoading = () => {
  return h(
    "div",
    {
      id: "loading",
      style: {
        width: "100%",
        textAlign: "left",
        padding: "20px",
        fontSize: "16px",
        fontWeight: "600",
      },
    },
    text("Loading ...")
  );
};

app({
  init: initialState,
  view: ({ feeds, loading }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", { class: "main" }, [
        h("div", { class: "content", style: { minHeight: "500px" } }, [
          h("div", { class: "feed-header" }, h("h2", {}, text("Zenn"))),
          loading && viewLoading(),
          h(
            "div",
            { class: "feeds" },
            feeds &&
              feeds.map((f) =>
                h("a", { class: "feed", rel: "noopener", href: f.link }, [
                  h(
                    "img",
                    {
                      class: "feed-thumbnail",
                      src: f.enclosure.url,
                      alt: f.title,
                    },
                    []
                  ),
                ])
              )
          ),
        ]),
      ]),
      Top(),
    ]),
  subscriptions: (state) => {},
  node: document.getElementById("app"),
});
