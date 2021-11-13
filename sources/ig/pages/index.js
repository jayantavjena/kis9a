import { app, h, text } from "hyperapp";

app({
  init: { images: [] },
  view: ({ images }) =>
    h("div", { class: "container" }, [
      h("h1", {}, text("Hello")),
      h("main", {}, [
        h("h1", {}, text("Image")),
        h(
          "div",
          { class: "content images", style: { minHeight: "500px" } },
          images && images.map((s) => viewImageItem(s.name))
        ),
      ]),
    ]),
  node: document.getElementById("app"),
});

const assign = (source, assignments) => {
  var result = {},
    i;
  for (i in source) result[i] = source[i];
  for (i in assignments) result[i] = assignments[i];
  return result;
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
  assign(
    {
      options: {},
      response: "json",
      error: props.action,
    },
    props
  ),
];

// const image_format = "webp";
// const video_format = "mp4";

// const getImages = http({
//   url: "/data/images.json",
//   response: "json",
//   action: (state, res) =>
//     dispatchAction(state, (s) => {
//       s.images = shuffleArray(res) || [];
//       return s;
//     }),
// });

// const shuffleArray = ([...array]) => {
//   for (let i = array.length - 1; i >= 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// const isImageFormat = (name) => {
//   return image_format == getExtension(name);
// };

// const isVideoFormat = (name) => {
//   return video_format == getExtension(name);
// };

// const getExtension = (file) => {
//   return file.split(".").pop();
// };

// const viewImageItem = (name) => {
//   switch (true) {
//     case isImageFormat(name):
//       return h("div", { class: "imgc" }, [
//         h("img", {
//           alt: name,
//           src: `/data/images/${name}`,
//           class: "fade-in-2",
//           loading: "lazy",
//           "data-src": `${name}`,
//         }),
//         h("div", { class: "imgc-label" }, text(name)),
//       ]);
//     case isVideoFormat(name):
//       return h("div", { class: "imgc" }, [
//         h("video", {
//           alt: name,
//           src: `/data/images/${name}`,
//           controls: true,
//         }),
//         h("div", { class: "imgc-label" }, text(name)),
//       ]);
//   }
// };
