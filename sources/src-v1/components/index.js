import { Header } from "/components/header";
import { h, text, app } from "/modules/js/hyperapp.js";
import {
  viewLink,
  viewLinkActive,
  viewLinkIcons,
} from "/components/link/unit.js";
import { viewTooltip } from "/components/tooltip/unit.js";
import {
  viewToast,
  viewToastError,
  viewToastSuccess,
} from "/components/toast/unit.js";
import { viewHeader } from "/components/header/unit.js";
import { viewTop } from "/components/top/unit.js";
import "/layouts/index.css";
import "./index.css";

const sides = [
  {
    name: "Header",
    views: [
      {
        name: "default",
        view: viewHeader,
      },
    ],
  },
  {
    name: "Link",
    views: [
      {
        name: "default",
        view: viewLink,
      },
      {
        name: "active",
        view: viewLinkActive,
      },
      {
        name: "icons",
        view: viewLinkIcons,
      },
    ],
  },
  {
    name: "Tooltip",
    views: [
      {
        name: "default",
        view: viewTooltip,
      },
    ],
  },
  {
    name: "Toast",
    views: [
      {
        name: "default",
        view: viewToast,
      },
      {
        name: "error",
        view: viewToastError,
      },
      {
        name: "success",
        view: viewToastSuccess,
      },
    ],
  },
  {
    name: "Top",
    views: [
      {
        name: "default",
        view: viewTop,
      },
    ],
  },
];

const view = (side) =>
  h(
    "div",
    {},
    side.views.map((v) =>
      h("div", {}, [
        h("h3", {}, text(v.name)),
        h("div", {}, h("div", {}, v.view())),
        h("hr", {}),
      ])
    )
  );

const setView = (state, side) => {
  const cview = view(side);
  return { ...state, cview: cview, cname: side.name };
};

const tick = (action) => [
  (dispatch) => {
    dispatch(action);
    return () => {};
  },
  { action },
];

const baseName = (str) => {
  return new String(str).substring(str.lastIndexOf("/") + 1);
};

const getUrl = () => window.location.href;
const initialUrl = getUrl();

const initializeCView = [
  (dispatch) => {
    const url = initialUrl;
    const name = baseName(url);
    const action = (state) => {
      const side = state.sides.find((side) => side.name === name);
      if (!side) {
        return { ...state };
      }
      return {
        ...state,
        cname: side.name,
        cview: view(side),
      };
    };
    dispatch(action);
  },
];

const initialState = [
  {
    cview: h("div", {}, text("")),
    cname: "",
    sides: sides,
  },
  initializeCView,
];

app({
  init: initialState,
  view: ({ cview, cname }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", { class: "main" }, [
        h(
          "div",
          { class: "sidebar" },
          sides &&
            sides.map((side) =>
              h(
                "div",
                {
                  class: `side ${cname === side.name ? "current" : ""} `,
                  onclick: [setView, side],
                },
                text(side.name)
              )
            )
        ),
        h("div", { class: "content" }, h("h1", {}, cview)),
      ]),
    ]),
  subscriptions: (state) => [
    state.cname &&
      tick((state) => {
        window.location.href = `#/${state.cname}`;
        return state;
      }),
  ],
  node: document.getElementById("app"),
});
