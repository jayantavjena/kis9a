import { app } from "/modules/js/hyperapp.js";
import { element } from "/modules/js/element.js";
const { main, h1, div, button } = element;

app({
  init: 0,
  view: (count) =>
    main(
      h1(count),
      div(
        { class: "control-bar" },
        button(
          {
            onclick: (count) => count - 1,
            disabled: count <= 0,
          },
          "ー"
        ),
        button({ onclick: (count) => count + 1 }, "＋")
      )
    ),
  node: document.getElementById("app"),
});
