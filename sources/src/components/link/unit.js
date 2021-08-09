import { h } from "/modules/js/hyperapp.js";
import { routes } from "/modules/js/router.js";
import { Link, LinkIcon } from "./index.js";

export const viewLink = () => {
  return Link("home");
};

export const viewLinkActive = () => {
  return Link("components", { active: false });
};

export const viewLinkIcons = () => {
  return h(
    "div",
    {},
    routes.map((r) => h("div", {}, LinkIcon(r.name)))
  );
};
