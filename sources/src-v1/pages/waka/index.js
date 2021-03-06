import { h, text, app } from "/modules/js/hyperapp.js";
import { Top } from "/components/top";
import { Http } from "/modules/js/Http.js";
import { Header } from "/components/header";
import svg_calendar from "/assets/svgs/calendar.svg";
import "./index.css";
import "/layouts/index.css";
import "/modules/css/fade.css";

const initSvgs = Http({
  url: "/data/wakatime.json",
  response: "json",
  action: (state, json) => {
    console.log(
      json.svgs.map((v) => {
        // console.log(v.activity);
      })
    );
    return {
      ...state,
      svgs: json.svgs || [],
    };
  },
});

const defaultState = {
  svgs: [],
};

const initialState = [defaultState, initSvgs];

const yymmdd = (dt) => {
  var y = dt.getFullYear();
  var m = ("00" + (dt.getMonth() + 1)).slice(-2);
  var d = ("00" + dt.getDate()).slice(-2);
  return y + "-" + m + "-" + d;
};

const afterDay = (n) => {
  const newDate = new Date();
  newDate.getDate();
  newDate.setDate(date.getDate() + n);
  return yymmdd(newDate);
};

const date = new Date();
const today = yymmdd(date);

const dateRange = (name) => {
  if (name == "w") {
    return -7;
  }
  if (name == "m") {
    return -30;
  }
  if (name == "y") {
    return -365;
  }
};

app({
  init: initialState,
  view: ({ svgs }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h(
          "div",
          { class: "content svgs" },
          svgs &&
            svgs.map((s) =>
              h("div", {}, [
                s.name &&
                  h("div", { class: "date" }, [
                    h("div", { class: "date-svg", innerHTML: svg_calendar }),
                    h(
                      "h2",
                      { class: "date-text" },
                      text(afterDay(dateRange(s.name)) + " - " + today)
                    ),
                  ]),
                h("div", { class: "item", style: { minHeight: "250px" } }, [
                  h("img", {
                    class: "fade-in-2",
                    src: s.activity,
                    alt: s.name,
                  }),
                  h("img", { class: "fade-in-2", src: s.percent, alt: s.name }),
                  h("img", { class: "fade-in-2", src: s.bar, alt: s.name }),
                ]),
              ])
            )
        ),
      ]),
      Top(),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});
