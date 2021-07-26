import { app, h, text } from "/modules/js/hyperapp.js";
import { Hyperway } from "/modules/js/hyperway.js";
import { Header } from "/components/header";
import "/layouts/index.css";

const defaultState = {
  view: "home",
};

const initialState = [defaultState];

const viewRoute = (view) => {
  switch (view) {
    case "home":
      return h("div", { class: "not-found" }, text("not found"));
    case "about":
      return h("div", { class: "not-found" }, text("not found"));
    default:
      return h("div", { class: "not-found" }, text("not found"));
  }
};

app({
  init: initialState,
  view: ({ view }) =>
    h("div", { class: "container" }, [Header(), viewRoute(view)]),
  subscriptions: () => [
    Hyperway({
      onNotFound: (state, props) => {
        console.log("NOT FOUND", props);
        return state;
      },
      onRoute: (state, props) => {
        console.log("ROUTE", props);
        return { ...state, url: props.path, params: props.params };
      },
      routes: [
        {
          path: "/",
          onEnter: (state, _) => {
            return { ...state, view: "home" };
          },
          onLeave: (state, _) => {
            return state;
          },
        },
        {
          path: "/#/about",
          onEnter: (state, _) => {
            return { ...state, view: "about" };
          },
        },
      ],
    }),
  ],
  node: document.getElementById("app"),
});
