import { h } from "/modules/js/hyperapp.js";
import { fadeIn, fadeOut } from "/modules/js/fadeInOut.js";
import svg_top from "/assets/svgs/chevron-double-up.svg";
import "./index.css";

onscroll = () => {
  const top = document.getElementById("top");
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 600) {
    if (top.classList.contains("hide")) {
      fadeIn(top, 500);
    }
    top.classList.remove("hide");
  } else if (scrollTop < 500) {
    if (!top.classList.contains("hide")) {
      fadeOut(top, 200);
      setTimeout(() => {
        top.classList.add("hide");
      }, 200);
    }
  }
};

export const Top = () => {
  return h("div", {
    id: "top",
    class: "svg-top hide",
    innerHTML: svg_top,
    onclick: toTop,
  });
};

const toTop = (state) => {
  // document.body.scrollTop = 0;
  // document.documentElement.scrollTop = 0;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return state;
};
