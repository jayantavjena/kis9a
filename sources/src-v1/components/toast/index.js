import svg_info from "/assets/svgs/info.svg";
import svg_warn from "/assets/svgs/exclamation.svg";
import svg_check from "/assets/svgs/check-circle.svg";
import { fadeIn, fadeOut } from "/modules/js/fadeInOut.js";

export const Toast = (
  msg,
  {
    time = 1600,
    minWidth = "300px",
    height = "auto",
    width = "auto",
    bottom = "10px",
    right = "10px",
    left = "auto",
    top = "auto",
    bg = "#ffffff",
    status = "info",
  } = {}
) => {
  const toast = document.createElement("div");
  let svg = svg_info;
  switch (status) {
    case "err":
      toast.style.background = "#f0450c";
      svg = svg_warn;
      break;
    case "suc":
      toast.style.background = "#34d058";
      svg = svg_check;
      break;
    default:
      toast.style.background = bg;
  }
  toast.innerHTML = svg;
  toast.style.bottom = bottom;
  toast.style.left = left;
  toast.style.right = right;
  toast.style.top = top;
  toast.style.width = width;
  toast.style.minWidth = minWidth;
  toast.style.height = height;
  toast.style.display = "flex";
  toast.style.alignItems = "center";
  toast.style.position = "fixed";
  toast.style.margin = "10px";
  toast.style.padding = "0.8rem 1.6rem";
  toast.style.fontWeight = "500";
  toast.style.fontSize = "1.8rem";
  toast.style.color = "inherit";
  toast.style.borderRadius = "0.5rem";
  toast.style.border = "1px solid #d0c9c3";
  toast.style.boxShadow = "0 0 2px 2px #f2f2f2";
  toast.style.cursor = "pointer";
  toast.onclick = () => {
    toast.style.display = "none";
  };

  const svgNode = toast.childNodes[0];
  svgNode.style.height = "2.4rem";
  svgNode.style.width = "auto";
  svgNode.style.color = "inherit";
  svgNode.style.marginRight = "8px";

  fadeIn(toast, 500);
  setTimeout(() => {
    fadeOut(toast, 500);
    setTimeout(() => {
      document.body.removeChild(toast);
      toast.style.display = "none";
    }, 500);
  }, time);
  toast.appendChild(document.createTextNode(msg));
  document.body.appendChild(toast);
};
