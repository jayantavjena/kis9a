import { app, h } from "hyperapp";
import "./index.css";

const image_format = "png";
const video_format = "mp4";
const getExtension = (file) => file.split(".").pop();
const isImageFormat = (name) => image_format == getExtension(name);
const isVideoFormat = (name) => video_format == getExtension(name);
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
    { images: [] },
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
  view: ({ images }) =>
    h("div", { class: "container" }, [
      h("main", {}, [
        h(
          "div",
          { class: "images", style: { minHeight: "500px" } },
          images &&
            images.map((s) =>
              ((name) => {
                switch (true) {
                  case isImageFormat(name):
                    return h("div", { class: "imgc" }, [
                      h("img", {
                        alt: name,
                        src: `/data/images/${name}`,
                        class: "fade-in-2",
                        loading: "lazy",
                        "data-src": `${name}`,
                      }),
                    ]);
                  case isVideoFormat(name):
                    return h("div", { class: "imgc" }, [
                      h("video", {
                        alt: name,
                        src: `/data/images/${name}`,
                        controls: true,
                      }),
                    ]);
                }
              })(s.name)
            )
        ),
      ]),
    ]),
  node: document.getElementById("app"),
});
