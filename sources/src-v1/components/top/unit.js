import { h, text } from "/modules/js/hyperapp.js";
import { Top } from "./index.js";

export const viewTop = () => {
  return h("div", {}, [
    h("div", { style: { height: "1900px" } }, text("scroll down to show ⬇ ")),
    Top(),
  ]);
};
