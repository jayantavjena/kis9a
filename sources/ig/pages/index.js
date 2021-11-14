import { app, h, text } from "hyperapp";
import "./index.css";
import { register } from "register-service-worker";

register("/service-worker.js", {
  registrationOptions: { scope: "./" },
  updated() {
    window.location.reload(true);
  },
  error(error) {
    console.error(error);
  },
});

const svg_moon =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 19 19' fill='currentColor'><path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'/></svg>";

const svg_light =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'><path d='M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z'/></svg>";

const external_link =
  "<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 22 22' width='48px' height='48px'><path d='M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z'/></svg>";

const image_format = "png";
const video_format = "mp4";
const getExtension = (file) => file.split(".").pop();
const isImageFormat = (name) => image_format == getExtension(name);
const isVideoFormat = (name) => video_format == getExtension(name);
const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomAlign = () => {
  switch (getRandomInt(3)) {
    case 0:
      return "start";
    case 1:
      return "center";
    case 2:
      return "end";
  }
};
const http = (props) => [
  (dispatch, props) => {
    fetch(props.url, props.options)
      .then((response) =>
        !response.ok
          ? (() => {
              throw response;
            })()
          : response
      )
      .then((response) => response[props.response]())
      .then((result) => dispatch(props.action, result))
      .catch((error) => dispatch(props.error, error));
  },
  ((source, assign) => {
    var result = {},
      i;
    for (i in source) result[i] = source[i];
    for (i in assign) result[i] = assign[i];
    return result;
  },
  ({
    options: {},
    response: "json",
    error: props.action,
  },
  props)),
];

app({
  init: [
    { images: [], mode: true },
    http({
      url: "/data/images.json",
      response: "json",
      action: (state, indexes) => ({
        ...state,
        images: (([...array]) => {
          for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        })(indexes),
      }),
    }),
  ],
  view: ({ images, mode }) =>
    h("div", { class: "container" }, [
      h("main", {}, [
        h("div", { class: "header" }, [
          h("h1", {}, text("ig.kis9a".toUpperCase())),
          h("div", { class: "right" }, [
            h("div", {
              class: "svgc",
              innerHTML: mode ? svg_moon : svg_light,
              onclick: (state) => {
                if (mode) {
                  document.body.style.background = "black";
                  document.body.style.color = "#f8f8f8";
                } else {
                  document.body.style.background = "#f8f8f8";
                  document.body.style.color = "#444";
                }
                return { ...state, ...{ mode: !mode } };
              },
            }),
            h("div", {
              class: "svgc",
              innerHTML: external_link,
              onclick: (state) => {
                window.open("https://nav.kis9a.com", "_blank");
                return state;
              },
            }),
          ]),
        ]),
        h(
          "div",
          { class: "images", style: { minHeight: "500px" } },
          images &&
            images.map((s) =>
              ((name) => {
                switch (true) {
                  case isImageFormat(name):
                    return h(
                      "div",
                      {
                        class: "imgc",
                        style: {
                          alignItems: getRandomAlign(),
                          justifyContent: getRandomAlign(),
                        },
                      },
                      [
                        h("img", {
                          alt: name,
                          src: `/data/images/${name}`,
                          style: { width: `${75 + getRandomInt(25)}%` },
                          class: "fade-in-2",
                          loading: "lazy",
                          "data-src": `${name}`,
                        }),
                      ]
                    );
                  case isVideoFormat(name):
                    return h(
                      "div",
                      {
                        class: "imgc",
                        style: {
                          alignItems: getRandomAlign(),
                          justifyContent: getRandomAlign(),
                        },
                      },
                      [
                        h("video", {
                          alt: name,
                          src: `/data/images/${name}`,
                          controls: true,
                        }),
                      ]
                    );
                }
              })(s.name)
            )
        ),
      ]),
    ]),
  node: document.getElementById("app"),
});
