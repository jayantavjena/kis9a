import { h, text } from "hyperapp";
import { Http } from "hyperapp-fx";
import { dispatchAction } from "/modules/hyperapp-utils.js";
import styles from "./index.module.css";

const viewHome = ({ feeds }) => {
  return h("main", { class: styles.links }, [
    h(
      "div",
      { class: "feeds" },
      feeds &&
        feeds.map((f) =>
          h("a", { class: "feed", rel: "noopener", href: f.link }, [
            h(
              "h2",
              { class: "feed-thumbnail fade-in" },
              h(
                "a",
                {
                  class: "feed",
                  href: f.link,
                  rel: "noopener",
                  target: "_blank",
                },
                text(f.title)
              )
            ),
          ])
        )
    ),
  ]);
};

const getArticles = () =>
  Http({
    url: "https://9806nuljwd.execute-api.ap-northeast-1.amazonaws.com/default/kis9a-rss-feed",
    response: "json",
    action: (state, res) => {
      return dispatchAction(state, (s) => {
        s.feeds = res;
        s.loading = false;
        return s;
      });
    },
  });

const Home = {
  name: "home",
  path: "/",
  view: viewHome,
  state: { feeds: [], loading: true },
  onEnter: (state, _) => {
    const next = {
      ...state,
      ...{ route: Home },
    };
    return [next, getArticles()];
  },
  onLeave: (state, _) => state,
  subs: () => [],
};

export default Home;
