import { h, app, text } from "/modules/js/hyperapp.js";
import { Header } from "/components/header";
import { Top } from "/components/top";
import "./index.css";
import "/layouts/index.css";
import "/modules/css/fade.css";

app({
  init: {},
  view: ({}) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h("div", { class: "content indexes" }, [
          h("div", { class: "form-container" }, [
            h("h1", {}, text("Contact")),
            h("form", { method: "post", id: "form" }, [
              h(
                "input",
                {
                  type: "text",
                  id: "name-input",
                  placeholder: "name",
                  class: "form-item",
                },
                []
              ),
              h(
                "input",
                {
                  type: "email",
                  id: "email-input",
                  placeholder: "email",
                  class: "form-item",
                },
                []
              ),
              h(
                "textarea",
                {
                  id: "message-input",
                  placeholder: "message",
                  class: "form-item",
                },
                []
              ),
            ]),
          ]),
        ]),
      ]),
      Top(),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});
