import { h } from "/modules/js/hyperapp.js";
import { fadeIn, fadeOut } from "/modules/js/fadeInOut.js";
import svg_top from "/assets/svgs/chevron-double-up.svg";
import "./index.css";

const delimiter = 15;
let amount = document.body.scrollTop;

const isUpScroll = (() => {
  const el = "sel" in document ? document.sel : document.documentElement;
  let sp, preSp, is;
  return () => {
    sp = el.scrollTop;
    is = preSp > sp ? true : false;
    preSp = sp;
    return is;
  };
})();

onscroll = () => {
  amount = isUpScroll() ? ++amount : 0;
  const top = document.getElementById("top");
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  console.log(amount);
  if (scrollTop > 600 && amount > delimiter) {
    if (top.classList.contains("hide")) {
      fadeIn(top, 400);
    }
    top.classList.remove("hide");
  } else {
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
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  return state;
};
