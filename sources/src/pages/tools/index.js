import { app, h, text } from "/modules/js/hyperapp.js";
import { Hyperway, routeTo } from "/modules/js/hyperway.js";
import { Header } from "/components/header";
import "/layouts/index.css";
import "./index.css";

const Link = ({ to }, t) =>
  h("a", { class: `link`, onclick: routeTo(to) }, text(t));

const defaultState = {
  view: "default",
};

const initialState = [defaultState];

const viewRoute = (view) => {
  switch (view) {
    case "default":
      return viewDefaults();
    case "draw":
      return viewDraw();
    default:
      return h("div", { class: "not-found" }, text("not found"));
  }
};

const viewDefaults = () => {
  return h(
    "div",
    { style: { cursor: "pointer" } },
    h("div", { class: "links" }, [
      Link({ to: "/tools/" }, "TOOLS"),
      Link({ to: "/tools/draw/" }, "DRAW"),
    ])
  );
};

const viewDraw = () => {
  return h("div", {}, text("draw"));
};

const back = (state) => {
  return { ...state, view: "default" };
};

app({
  init: initialState,
  view: ({ view }) =>
    h("div", { class: "container" }, [
      view == "default"
        ? Header()
        : h(
            "div",
            { style: { margin: "2rem", cursor: "pointer" } },
            h("h1", { onclick: back }, text("<"))
          ),
      h("main", { class: "main" }, [
        h("div", { class: "content" }, viewRoute(view)),
      ]),
    ]),
  subscriptions: () => [
    Hyperway({
      onNotFound: (state, props) => {
        return state;
      },
      onRoute: (state, props) => {
        return { ...state, url: props.path, params: props.params };
      },
      routes: [
        {
          path: "/tools/",
          onEnter: (state, _) => {
            return { ...state, view: "default" };
          },
          onLeave: (state, _) => {
            return state;
          },
        },
        {
          path: "tools/draw/",
          onEnter: (state, _) => {
            return { ...state, view: "draw" };
          },
        },
      ],
    }),
  ],
  node: document.getElementById("app"),
});
