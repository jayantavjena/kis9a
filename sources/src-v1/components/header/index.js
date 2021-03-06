import { h, text } from "/modules/js/hyperapp.js";
import { headerRoutes } from "/modules/js/router.js";
import { LinkIcon } from "/components/link";
import LogoImage from "/assets/logo.png";
import "./index.css";

var path = require("./path.js");

export const Header = () => {
  const uri = window.location.pathname + window.location.search;
  const ss = uri.split("/");
  let sn = "/";
  if (ss) {
    ss.forEach((v) => {
      if (v !== "") {
        sn = v;
        return;
      }
    });
  }
  const parse = (str) => {
    str = path.normalize(str);
    return str.replaceAll("/", "");
  };
  let c = headerRoutes.find((v) => {
    return parse(sn) === parse(v.href);
  });
  if (!c) {
    c = { name: "" };
  }
  return h("div", { class: "header-wrapper" }, [
    h("header", {}, [
      h("nav", {}, [
        h("h1", { class: "logo-text", onclick: toNavigation }, text("KIS9A")),
        h("div", { class: "logo-image" }, [
          h("img", {
            src: LogoImage,
            alt: "kis9a.png",
            onclick: toNavigation,
            width: "100px",
            height: "100px",
          }),
        ]),
        h(
          "div",
          { class: "links" },
          headerRoutes.map((r) =>
            LinkIcon(r.name, { active: r.name !== c.name })
          )
        ),
      ]),
    ]),
  ]);
};

const toNavigation = (state) => {
  window.open("https://nav.kis9a.com", "_blank");
  return { ...state };
};
