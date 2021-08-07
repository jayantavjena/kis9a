import { h, app, text } from "/modules/js/hyperapp.js";
import { Top } from "/components/top";
import { Http } from "../../modules/js/http.js";
import { Header } from "/components/header";
import "/layouts/index.css";
import "./index.css";
// import lazyLoadInit from "./lazyload-init";

// make browser compatibility branch ? check work in modern browsers.
const image_format = "webp";
const video_format = "mp4";

const getIndexes = Http({
  url: "/data/images-indexes.json",
  response: "json",
  action: (state, res) => {
    pureState.indexes = res;
    return {
      ...state,
      indexes: shuffle(res) || [],
    };
  },
});

const initContent = [
  (dispatch) => {
    const action = (state) => {
      console.log(state);
      return {
        ...state,
      };
    };
    dispatch(action);
  },
];

const isImageFormat = (name) => {
  return image_format == getExtension(name);
};

const isVideoFormat = (name) => {
  return video_format == getExtension(name);
};

const getExtension = (file) => {
  return file.split(".").pop();
};

const pureState = {
  indexes: [],
};

const initIndexes = getIndexes;
const initialState = [pureState, initIndexes, initContent];

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const viewImageItem = (name) => {
  switch (true) {
    case isImageFormat(name):
      return h(
        "div",
        {
          class: "imgc",
          oncreate: (el) => {
            console.log(el);
          },
        },
        [
          h("img", {
            alt: name,
            src: `/data/images/${name}`,
            loading: "lazy",
            "data-src": `${name}`,
          }),
          h("div", { class: "imgc-label" }, text(name)),
        ]
      );
    case isVideoFormat(name):
      return h("div", { class: "imgc" }, [
        h("video", {
          alt: name,
          src: `/data/images/${name}`,
          controls: true,
        }),
        h("div", { class: "imgc-label" }, text(name)),
      ]);
  }
};
// oncreate: fadeIn,
// onremove: fadeOut,
app({
  init: initialState,
  view: ({ indexes }) =>
    h(
      "div",
      {
        class: "container",
        oncreate: (state) => {
          console.log("hello");
          return { ...state };
        },
      },
      [
        Header(),
        h("main", {}, [
          h(
            "div",
            { class: "content indexes", style: { minHeight: "500px" } },
            indexes && indexes.map((s) => viewImageItem(s.name))
          ),
        ]),
        Top(),
      ]
    ),
  subscriptions: () => {},
  node: document.getElementById("app"),
});

// lazyLoadInit();
