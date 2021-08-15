import { h, app, text } from "/modules/js/hyperapp.js";
import { Http } from "/modules/js/Http.js";
import { Header } from "/components/header";
import { Top } from "/components/top";
import "./index.css";
import "/layouts/index.css";
import "/modules/css/fade.css";

const path = window.location.href;
if (path !== "https://me.kis9a.com" && path.charAt(path.length - 1) !== "/") {
  window.location.replace(path + "/");
}

const initFeeds = Http({
  url: "https://9806nuljwd.execute-api.ap-northeast-1.amazonaws.com/default/kis9a-rss-feed",
  response: "json",
  action: (state, res) => {
    return {
      ...state,
      feeds: res,
      loading: false,
    };
  },
});

const initialState = [{ feeds: [], loading: true }, initFeeds];

const viewLoading = () => {
  return h(
    "div",
    {
      class: "loading fade-in",
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
                      class: "feed-thumbnail fade-in",
                      src: f.enclosures[0].url,
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
  subscriptions: () => [],
  node: document.getElementById("app"),
});
