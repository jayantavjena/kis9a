import { h, text } from "hyperapp";
import { dispatchAction } from "/modules/hyperapp-utils.js";
import { Http } from "hyperapp-fx";

const image_format = "webp";
const video_format = "mp4";

const getImages = Http({
  url: "/data/images.json",
  response: "json",
  action: (state, res) =>
    dispatchAction(state, (s) => {
      s.images = shuffleArray(res) || [];
      return s;
    }),
});

const shuffleArray = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isImageFormat = (name) => {
  return image_format == getExtension(name);
};

const isVideoFormat = (name) => {
  return video_format == getExtension(name);
};

const getExtension = (file) => {
  return file.split(".").pop();
};

const viewImageItem = (name) => {
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
        h("div", { class: "imgc-label" }, text(name)),
      ]);
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

const viewImages = ({ images }) => {
  return h("main", {}, [
    h(
      "div",
      { class: "content images", style: { minHeight: "500px" } },
      images && images.map((s) => viewImageItem(s.name))
    ),
  ]);
};

const Images = {
  name: "images",
  path: "/images",
  view: viewImages,
  state: { images: [], loading: true },
  onEnter: (state, _) => {
    const next = {
      ...state,
      ...{ route: Images },
    };
    return [next, getImages];
  },
  onLeave: (state, _) => state,
  subs: () => [],
};

export default Images;
