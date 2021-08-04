import { app, h, text } from "/modules/js/hyperapp.js";
import snarkdown from "/modules/js/snarkdown.js";
import { Header } from "/components/header";
import { Http } from "/modules/js/Http.js";
import { Keyboard } from "/modules/js/subs/Keyboard.js";
import { Toast } from "/components/toast";
import { Top } from "/components/top";
import { Tooltip, RemoveTooltip } from "/components/Tooltip";
import "./index.css";
import "/layouts/index.css";
import svg_clear from "/assets/svgs/trash.svg";
import svg_close from "/assets/svgs/x.svg";
import svg_share from "/assets/svgs/external-link.svg";
import svg_raw from "/assets/svgs/view-list.svg";
import svg_tag from "/assets/svgs/tag.svg";
import svg_pencil_alt from "/assets/svgs/pencil-alt.svg";

const getIndexesJson = Http({
  url: "/data/memos-indexes.json",
  response: "json",
  action: (state, indexes) => {
    initialState[0].indexes = indexes;
    return {
      ...state,
      indexes: indexes || [],
    };
  },
});

const getCategories = Http({
  url: "/data/memos-categories.json",
  response: "json",
  action: (state, categories) => {
    initialState[0].categories = categories;
    return {
      ...state,
      categories: categories || [],
    };
  },
});

const getContent = (index) => {
  return Http({
    url: `/data/memos/${index}`,
    response: "text",
    action: (state, content) => {
      const exists = state.contents.find((v) => v.name === index);
      if (!exists) {
        return {
          ...state,
          content: { ...state.content, name: index, content: content },
          contents: [
            ...state.contents,
            {
              name: index,
              content: content,
            },
          ],
        };
      } else {
        return {
          ...state,
          content: { ...state.content, name: index, content: content },
        };
      }
    },
  });
};

const setContent = (state, event) => {
  const index = event.target.innerHTML;
  const exists = !state.contents.every((v) => {
    return v.name !== index;
  });
  if (exists) {
    const content = state.contents.find((v) => v.name === index);
    return {
      ...state,
      content: content,
    };
  }
  return [state, getContent(index)];
};

const setInputValue = (state, event) => {
  const str = event.target.value;
  const indexes = onSearchIndex(state, str);
  if (str === "") {
    return { ...state, inputValue: str, indexes: indexes, showIndexes: false };
  }
  return { ...state, inputValue: str, indexes: indexes, showIndexes: true };
};

const onInputFocus = (state) => {
  if (state.inputValue === "") {
    return { ...state, showIndexes: false };
  }
  return { ...state };
};

const setInputContent = (state, event) => {
  const value = event.target.value;
  const content = state.contents.map((v) => {
    if (v.name == "memo") {
      v.content = value;
    }
    return v;
  });
  return {
    ...state,
    content: { ...state.content, content: value },
    contents: content,
  };
};

const removeContent = (state, index) => {
  if (state.content.name == index && index !== "memo" && index !== "category") {
    let id = 0;
    state.contents.forEach((v, i) => {
      if (v.name == index) {
        id = i;
      }
    });
    state.content = state.contents[id - 1];
    state.contents = state.contents.filter((v) => v.name !== index);
  }
  return { ...state };
};

const getContentType = (content) => {
  switch (content.name) {
    case "memo":
      return "memo";
    case "category":
      return "category";
    default:
      return "default";
  }
};

const onClickCategory = (state, category) => {
  const indexes = [];
  category.files.forEach((v) => {
    const index = { name: v, upd_t: "" };
    indexes.push(index);
  });
  return { ...state, indexes: indexes, showIndexes: true };
};

const onSelect = (state, index) => {
  if (state.content.name == index) {
    return { ...state };
  }
  const content = state.contents.find((v) => {
    return v.name === index;
  });
  if (content) {
    return {
      ...state,
      content: content,
    };
  } else {
    return { ...state };
  }
};

const onSearchIndex = (state, str) => {
  if (!str) state.indexes = initialState[0].indexes;
  const indexes = initialState[0].indexes.filter((e) =>
    ~e.name.indexOf(str) ? true : false
  );
  return indexes;
};

const toggleShowIndex = (state) => {
  return { ...state, showIndexes: !state.showIndexes };
};

const clearTabs = (state) => {
  const content = state.contents.find((v) => v.name === "memo");
  content.content = "";
  const contents = [
    { name: "category", content: "" },
    { name: "memo", content: "" },
  ];
  return { ...state, content: content, contents: contents };
};

const copyUrl = (state) => {
  const element = document.createElement("input");
  element.value = location.href;
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
  Toast("Copied to clipboard share url");
  return { ...state };
};

const toggleRaw = (state) => {
  return { ...state, rawMode: !state.rawMode };
};

const defaultState = {
  indexes: "",
  content: { name: "memo", content: "" },
  contents: [
    { name: "category", content: "" },
    { name: "memo", content: "" },
  ],
  categories: [],
  inputValue: "",
  showIndexes: false,
  rawMode: false,
};

const baseName = (str) => {
  return new String(str).substring(str.lastIndexOf("/") + 1);
};

const initIndexes = getIndexesJson;

const initCategories = getCategories;

const initContent = [
  (dispatch) => {
    const url = initialUrl;
    const name = baseName(url);
    let content = defaultState.content;
    if (name && name !== "memo") {
      const action = (state) => {
        content = state.contents.find((v) => v.name === name);
        if (!content) {
          content = getContent(name);
          return [state, content];
        }
        return {
          ...state,
          content: content,
        };
      };
      dispatch(action);
    }
  },
];

const getUrl = () => window.location.href;
const initialUrl = getUrl();

// Local storage
// const storageState = JSON.parse(window.localStorage.getItem("app"));
// const state = storageState ? storageState : defaultState;

const initialState = [defaultState, initIndexes, initContent, initCategories];

const tick = (action) => [
  (dispatch) => {
    dispatch(action);
    return () => {};
  },
  { action },
];

const KeySub = Keyboard({
  downs: true,
  ups: false,
  action: (state, keyEvent) => {
    switch (true) {
      case (keyEvent.key == "p" && keyEvent.ctrlKey) ||
        (keyEvent.key == "f" && keyEvent.ctrlKey):
        focusIndexSearch();
        return state;
      case keyEvent.key == "m" && keyEvent.ctrlKey:
        return [onSelect, "memo"];
      case keyEvent.key == "y" && keyEvent.ctrlKey:
        return copyUrl;
      case keyEvent.key == "d" && keyEvent.ctrlKey:
        return [removeContent, state.content.name];
      case keyEvent.key == "i" && keyEvent.ctrlKey:
        return toggleShowIndex;
      case keyEvent.key == "r" && keyEvent.ctrlKey:
        return toggleRaw;
      case keyEvent.key == "x" && keyEvent.ctrlKey:
        return clearTabs;
      case keyEvent.key == "t" && keyEvent.ctrlKey:
        return [onSelect, "category"];
      case keyEvent.key == "ArrowRight" ||
        (keyEvent.key == "l" && keyEvent.ctrlKey):
        return [shiftTab, 1];
      case keyEvent.key == "ArrowLeft" ||
        (keyEvent.key == "h" && keyEvent.ctrlKey):
        return [shiftTab, -1];
      case keyEvent.key == "ArrowUp":
        return { ...state, showIndexes: false };
      case keyEvent.key == "ArrowDown":
        return { ...state, showIndexes: true };
      default:
        return state;
    }
  },
});

const focusIndexSearch = () => {
  const input = document.getElementById("index-search");
  input.focus();
};

const shiftTab = (state, count) => {
  let id = 0;
  state.contents.forEach((v, i) => {
    if (v.name == state.content.name) {
      id = i;
    }
  });
  const next = state.contents[id + count];
  if (next) {
    state.content = next;
  }
  return { ...state };
};

app({
  init: initialState,
  view: ({
    indexes,
    content,
    contents,
    categories,
    inputValue,
    showIndexes,
    rawMode,
  }) =>
    h("div", { class: "container" }, [
      Header(),
      h("main", {}, [
        h("div", { class: "content" }, [
          h("div", { class: "tabs" }, [
            h("div", {
              class: "tab",
              onclick: clearTabs,
              innerHTML: svg_clear,
              onmouseover: () => [Tooltip, "clear ( ctrl - x )"],
              onmouseout: RemoveTooltip,
            }),
            h("dv", {
              class: "tab",
              onclick: () => copyUrl,
              innerHTML: svg_share,
              onmouseover: () => [Tooltip, "copy url ( ctrl - y )"],
              onmouseout: RemoveTooltip,
            }),
            h("div", {
              class: "tab",
              onclick: () => toggleRaw,
              innerHTML: svg_raw,
              onmouseover: () => [Tooltip, "show raw ( ctrl - r )"],
              onmouseout: RemoveTooltip,
            }),
            h("div", {
              class: "tab index-toggle-button",
              onclick: toggleShowIndex,
              innerHTML: `${showIndexes ? "&#9660" : "&#9650"}`,
              onmouseover: () => [Tooltip, "toggle indexes ( ctrl - i )"],
              onmouseout: RemoveTooltip,
            }),
            h("input", {
              type: "text",
              value: inputValue,
              oninput: setInputValue,
              onfocus: onInputFocus,
              id: "index-search",
              class: "index-search",
              ariaLabel: "index-search-input",
              onmouseover: () => [Tooltip, "input ( ctrl - p )"],
              onmouseout: RemoveTooltip,
            }),
            ...(contents &&
              contents.map((c) =>
                h(
                  "div",
                  {
                    class: `tab${content.name === c.name ? " selected" : ""}`,
                    onclick: () => [onSelect, c.name],
                    innerHTML:
                      c.name === "memo"
                        ? svg_pencil_alt
                        : c.name == "category"
                        ? svg_tag
                        : "",
                    onmouseover: () => [
                      Tooltip,
                      `${
                        c.name == "memo"
                          ? "memo ( ctrl - m )"
                          : c.name == "category"
                          ? "tags ( ctrl - t )"
                          : ""
                      }`,
                    ],
                    onmouseout: RemoveTooltip,
                  },
                  [
                    c.name !== "memo" &&
                      c.name !== "category" &&
                      h("span", { class: "tab-label" }, text(c.name)),
                    c.name !== "memo" &&
                      c.name !== "category" &&
                      h("div", {
                        onclick: () => [removeContent, c.name],
                        innerHTML: svg_close,
                        class: "tab-close",
                      }),
                  ]
                )
              )),
          ]),
          h(
            "div",
            { class: `indexes  ${showIndexes ? "showIndexes" : "hide"}` },
            indexes &&
              indexes.map((index) =>
                h(
                  "span",
                  { class: "index", onclick: setContent },
                  text(index.name)
                )
              )
          ),
          getContentType(content) === "memo" &&
            h("div", { class: "tab-memo" }, [
              h("textarea", {
                rows: 15,
                value: content.content || "",
                oninput: setInputContent,
                class: "content tab-memo-input",
                ariaLabel: "tab-memo-input",
              }),
            ]),
          getContentType(content) === "category" &&
            h(
              "div",
              { class: "tab-content tab-category" },
              getCategories &&
                categories.map(
                  (c) =>
                    c.files &&
                    c.files.length > 1 &&
                    h(
                      "div",
                      {
                        class: "category",
                        onclick: [onClickCategory, c],
                        style: {
                          fontSize: `${8 + c.files.length * 4}px`,
                        },
                      },
                      text(c.name)
                    )
                )
            ),
          getContentType(content) === "default" &&
            h("div", {
              class: `tab-content ${content.content ? "" : "no-content"}`,
              innerHTML: rawMode ? content.content : snarkdown(content.content),
            }),
        ]),
      ]),
      Top(),
    ]),
  subscriptions: (state) => [
    state.content &&
      tick((state) => {
        const name = state.content && state.content.name;
        if (name && name !== "memo") {
          window.location.href = `#/${name}`;
        } else if (name == "memo") {
          window.location.href = "#/";
        }
        return state;
      }),
    KeySub,
  ],
  node: document.getElementById("app"),
});
