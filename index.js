(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // node_modules/hyperapp/index.js
  var SSR_NODE = 1;
  var TEXT_NODE = 3;
  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  var SVG_NS = "http://www.w3.org/2000/svg";
  var id = (a) => a;
  var map = EMPTY_ARR.map;
  var isArray = Array.isArray;
  var enqueue = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : setTimeout;
  var createClass = (obj) => {
    var out = "";
    if (typeof obj === "string")
      return obj;
    if (isArray(obj)) {
      for (var k = 0, tmp; k < obj.length; k++) {
        if (tmp = createClass(obj[k])) {
          out += (out && " ") + tmp;
        }
      }
    } else {
      for (var k in obj) {
        if (obj[k])
          out += (out && " ") + k;
      }
    }
    return out;
  };
  var shouldRestart = (a, b) => {
    for (var k in { ...a, ...b }) {
      if (typeof (isArray(a[k]) ? a[k][0] : a[k]) === "function") {
        b[k] = a[k];
      } else if (a[k] !== b[k])
        return true;
    }
  };
  var patchSubs = (oldSubs, newSubs = EMPTY_ARR, dispatch) => {
    for (var subs = [], i = 0, oldSub, newSub; i < oldSubs.length || i < newSubs.length; i++) {
      oldSub = oldSubs[i];
      newSub = newSubs[i];
      subs.push(newSub && newSub !== true ? !oldSub || newSub[0] !== oldSub[0] || shouldRestart(newSub[1], oldSub[1]) ? [
        newSub[0],
        newSub[1],
        (oldSub && oldSub[2](), newSub[0](dispatch, newSub[1]))
      ] : oldSub : oldSub && oldSub[2]());
    }
    return subs;
  };
  var getKey = (vdom) => vdom == null ? vdom : vdom.key;
  var patchProperty = (node, key, oldValue, newValue, listener, isSvg) => {
    if (key === "key") {
    } else if (key === "style") {
      for (var k in { ...oldValue, ...newValue }) {
        oldValue = newValue == null || newValue[k] == null ? "" : newValue[k];
        if (k[0] === "-") {
          node[key].setProperty(k, oldValue);
        } else {
          node[key][k] = oldValue;
        }
      }
    } else if (key[0] === "o" && key[1] === "n") {
      if (!((node.events || (node.events = {}))[key = key.slice(2)] = newValue)) {
        node.removeEventListener(key, listener);
      } else if (!oldValue) {
        node.addEventListener(key, listener);
      }
    } else if (!isSvg && key !== "list" && key !== "form" && key in node) {
      node[key] = newValue == null ? "" : newValue;
    } else if (newValue == null || newValue === false || key === "class" && !(newValue = createClass(newValue))) {
      node.removeAttribute(key);
    } else {
      node.setAttribute(key, newValue);
    }
  };
  var createNode = (vdom, listener, isSvg) => {
    var props = vdom.props;
    var node = vdom.type === TEXT_NODE ? document.createTextNode(vdom.tag) : (isSvg = isSvg || vdom.tag === "svg") ? document.createElementNS(SVG_NS, vdom.tag, { is: props.is }) : document.createElement(vdom.tag, { is: props.is });
    for (var k in props) {
      patchProperty(node, k, null, props[k], listener, isSvg);
    }
    for (var i = 0; i < vdom.children.length; i++) {
      node.appendChild(createNode(vdom.children[i] = maybeVNode(vdom.children[i]), listener, isSvg));
    }
    return vdom.node = node;
  };
  var patch = (parent, node, oldVNode, newVNode, listener, isSvg) => {
    if (oldVNode === newVNode) {
    } else if (oldVNode != null && oldVNode.type === TEXT_NODE && newVNode.type === TEXT_NODE) {
      if (oldVNode.tag !== newVNode.tag)
        node.nodeValue = newVNode.tag;
    } else if (oldVNode == null || oldVNode.tag !== newVNode.tag) {
      node = parent.insertBefore(createNode(newVNode = maybeVNode(newVNode), listener, isSvg), node);
      if (oldVNode != null) {
        parent.removeChild(oldVNode.node);
      }
    } else {
      var tmpVKid;
      var oldVKid;
      var oldKey;
      var newKey;
      var oldProps = oldVNode.props;
      var newProps = newVNode.props;
      var oldVKids = oldVNode.children;
      var newVKids = newVNode.children;
      var oldHead = 0;
      var newHead = 0;
      var oldTail = oldVKids.length - 1;
      var newTail = newVKids.length - 1;
      isSvg = isSvg || newVNode.tag === "svg";
      for (var i in { ...oldProps, ...newProps }) {
        if ((i === "value" || i === "selected" || i === "checked" ? node[i] : oldProps[i]) !== newProps[i]) {
          patchProperty(node, i, oldProps[i], newProps[i], listener, isSvg);
        }
      }
      while (newHead <= newTail && oldHead <= oldTail) {
        if ((oldKey = getKey(oldVKids[oldHead])) == null || oldKey !== getKey(newVKids[newHead])) {
          break;
        }
        patch(node, oldVKids[oldHead].node, oldVKids[oldHead], newVKids[newHead] = maybeVNode(newVKids[newHead++], oldVKids[oldHead++]), listener, isSvg);
      }
      while (newHead <= newTail && oldHead <= oldTail) {
        if ((oldKey = getKey(oldVKids[oldTail])) == null || oldKey !== getKey(newVKids[newTail])) {
          break;
        }
        patch(node, oldVKids[oldTail].node, oldVKids[oldTail], newVKids[newTail] = maybeVNode(newVKids[newTail--], oldVKids[oldTail--]), listener, isSvg);
      }
      if (oldHead > oldTail) {
        while (newHead <= newTail) {
          node.insertBefore(createNode(newVKids[newHead] = maybeVNode(newVKids[newHead++]), listener, isSvg), (oldVKid = oldVKids[oldHead]) && oldVKid.node);
        }
      } else if (newHead > newTail) {
        while (oldHead <= oldTail) {
          node.removeChild(oldVKids[oldHead++].node);
        }
      } else {
        for (var keyed = {}, newKeyed = {}, i = oldHead; i <= oldTail; i++) {
          if ((oldKey = oldVKids[i].key) != null) {
            keyed[oldKey] = oldVKids[i];
          }
        }
        while (newHead <= newTail) {
          oldKey = getKey(oldVKid = oldVKids[oldHead]);
          newKey = getKey(newVKids[newHead] = maybeVNode(newVKids[newHead], oldVKid));
          if (newKeyed[oldKey] || newKey != null && newKey === getKey(oldVKids[oldHead + 1])) {
            if (oldKey == null) {
              node.removeChild(oldVKid.node);
            }
            oldHead++;
            continue;
          }
          if (newKey == null || oldVNode.type === SSR_NODE) {
            if (oldKey == null) {
              patch(node, oldVKid && oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
              newHead++;
            }
            oldHead++;
          } else {
            if (oldKey === newKey) {
              patch(node, oldVKid.node, oldVKid, newVKids[newHead], listener, isSvg);
              newKeyed[newKey] = true;
              oldHead++;
            } else {
              if ((tmpVKid = keyed[newKey]) != null) {
                patch(node, node.insertBefore(tmpVKid.node, oldVKid && oldVKid.node), tmpVKid, newVKids[newHead], listener, isSvg);
                newKeyed[newKey] = true;
              } else {
                patch(node, oldVKid && oldVKid.node, null, newVKids[newHead], listener, isSvg);
              }
            }
            newHead++;
          }
        }
        while (oldHead <= oldTail) {
          if (getKey(oldVKid = oldVKids[oldHead++]) == null) {
            node.removeChild(oldVKid.node);
          }
        }
        for (var i in keyed) {
          if (newKeyed[i] == null) {
            node.removeChild(keyed[i].node);
          }
        }
      }
    }
    return newVNode.node = node;
  };
  var propsChanged = (a, b) => {
    for (var k in a)
      if (a[k] !== b[k])
        return true;
    for (var k in b)
      if (a[k] !== b[k])
        return true;
  };
  var maybeVNode = (newVNode, oldVNode) => newVNode !== true && newVNode !== false && newVNode ? typeof newVNode.tag === "function" ? ((!oldVNode || oldVNode.memo == null || propsChanged(oldVNode.memo, newVNode.memo)) && ((oldVNode = newVNode.tag(newVNode.memo)).memo = newVNode.memo), oldVNode) : newVNode : text("");
  var recycleNode = (node) => node.nodeType === TEXT_NODE ? text(node.nodeValue, node) : createVNode(node.nodeName.toLowerCase(), EMPTY_OBJ, map.call(node.childNodes, recycleNode), SSR_NODE, node);
  var createVNode = (tag, props, children, type, node) => ({
    tag,
    props,
    key: props.key,
    children,
    type,
    node
  });
  var text = (value, node) => createVNode(value, EMPTY_OBJ, EMPTY_ARR, TEXT_NODE, node);
  var h = (tag, props, children = EMPTY_ARR) => createVNode(tag, props, isArray(children) ? children : [children]);
  var app = ({
    node,
    view,
    subscriptions,
    dispatch = id,
    init = EMPTY_OBJ
  }) => {
    var vdom = node && recycleNode(node);
    var subs = [];
    var state;
    var busy;
    var update = (newState) => {
      if (state !== newState) {
        if ((state = newState) == null)
          dispatch = subscriptions = render = id;
        if (subscriptions)
          subs = patchSubs(subs, subscriptions(state), dispatch);
        if (view && !busy)
          enqueue(render, busy = true);
      }
    };
    var render = () => node = patch(node.parentNode, node, vdom, vdom = view(state), listener, busy = false);
    var listener = function(event) {
      dispatch(this.events[event.type], event);
    };
    return (dispatch = dispatch((action, props) => typeof action === "function" ? dispatch(action(state, props)) : isArray(action) ? typeof action[0] === "function" ? dispatch(action[0], action[1]) : action.slice(1).map((fx) => fx && fx !== true && fx[0](dispatch, fx[1]), update(action[0])) : update(action)))(init), dispatch;
  };

  // node_modules/register-service-worker/index.js
  var isLocalhost = function() {
    return Boolean(window.location.hostname === "localhost" || window.location.hostname === "[::1]" || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
  };
  var waitWindowLoad;
  if (typeof window !== "undefined") {
    if (typeof Promise !== "undefined") {
      waitWindowLoad = new Promise(function(resolve) {
        return window.addEventListener("load", resolve);
      });
    } else {
      waitWindowLoad = { then: function(cb) {
        return window.addEventListener("load", cb);
      } };
    }
  }
  function register(swUrl, hooks) {
    if (hooks === void 0)
      hooks = {};
    var registrationOptions = hooks.registrationOptions;
    if (registrationOptions === void 0)
      registrationOptions = {};
    delete hooks.registrationOptions;
    var emit2 = function(hook) {
      var args = [], len = arguments.length - 1;
      while (len-- > 0)
        args[len] = arguments[len + 1];
      if (hooks && hooks[hook]) {
        hooks[hook].apply(hooks, args);
      }
    };
    if ("serviceWorker" in navigator) {
      waitWindowLoad.then(function() {
        if (isLocalhost()) {
          checkValidServiceWorker(swUrl, emit2, registrationOptions);
          navigator.serviceWorker.ready.then(function(registration) {
            emit2("ready", registration);
          }).catch(function(error) {
            return handleError(emit2, error);
          });
        } else {
          registerValidSW(swUrl, emit2, registrationOptions);
          navigator.serviceWorker.ready.then(function(registration) {
            emit2("ready", registration);
          }).catch(function(error) {
            return handleError(emit2, error);
          });
        }
      });
    }
  }
  function handleError(emit2, error) {
    if (!navigator.onLine) {
      emit2("offline");
    }
    emit2("error", error);
  }
  function registerValidSW(swUrl, emit2, registrationOptions) {
    navigator.serviceWorker.register(swUrl, registrationOptions).then(function(registration) {
      emit2("registered", registration);
      if (registration.waiting) {
        emit2("updated", registration);
        return;
      }
      registration.onupdatefound = function() {
        emit2("updatefound", registration);
        var installingWorker = registration.installing;
        installingWorker.onstatechange = function() {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              emit2("updated", registration);
            } else {
              emit2("cached", registration);
            }
          }
        };
      };
    }).catch(function(error) {
      return handleError(emit2, error);
    });
  }
  function checkValidServiceWorker(swUrl, emit2, registrationOptions) {
    fetch(swUrl).then(function(response) {
      if (response.status === 404) {
        emit2("error", new Error("Service worker not found at " + swUrl));
        unregister();
      } else if (response.headers.get("content-type").indexOf("javascript") === -1) {
        emit2("error", new Error("Expected " + swUrl + " to have javascript content-type, but received " + response.headers.get("content-type")));
        unregister();
      } else {
        registerValidSW(swUrl, emit2, registrationOptions);
      }
    }).catch(function(error) {
      return handleError(emit2, error);
    });
  }
  function unregister() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.unregister();
      }).catch(function(error) {
        return handleError(emit, error);
      });
    }
  }

  // pages/index.js
  register("/service-worker.js", {
    registrationOptions: { scope: "./" },
    updated() {
      window.location.reload(true);
    },
    error(error) {
      console.error(error);
    }
  });
  var svg_moon = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'><path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'/></svg>";
  var svg_light = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'><path d='M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z'/></svg>";
  var external_link = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'><path d='M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z'/><path d='M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z'/></svg>";
  var image_format = "png";
  var video_format = "mp4";
  var getExtension = (file) => file.split(".").pop();
  var isImageFormat = (name) => image_format == getExtension(name);
  var isVideoFormat = (name) => video_format == getExtension(name);
  var getRandomInt = (max) => Math.floor(Math.random() * max);
  var getRandomAlign = () => {
    switch (getRandomInt(3)) {
      case 0:
        return "start";
      case 1:
        return "center";
      case 2:
        return "end";
    }
  };
  var http = (props) => [
    (dispatch, props2) => {
      fetch(props2.url, props2.options).then((response) => !response.ok ? (() => {
        throw response;
      })() : response).then((response) => response[props2.response]()).then((result) => dispatch(props2.action, result)).catch((error) => dispatch(props2.error, error));
    },
    ((source, assign) => {
      var result = {}, i;
      for (i in source)
        result[i] = source[i];
      for (i in assign)
        result[i] = assign[i];
      return result;
    }, {
      options: {},
      response: "json",
      error: props.action
    }, props)
  ];
  app({
    init: [
      { images: [], mode: true },
      http({
        url: "/data/images.json",
        response: "json",
        action: (state, indexes) => __spreadProps(__spreadValues({}, state), {
          images: (([...array]) => {
            for (let i = array.length - 1; i >= 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          })(indexes)
        })
      })
    ],
    view: ({ images, mode }) => h("div", { class: "container" }, [
      h("main", {}, [
        h("div", { class: "header" }, [
          h("h1", {}, text("ig.kis9a".toUpperCase())),
          h("div", { class: "right" }, [
            h("div", {
              innerHTML: mode ? svg_moon : svg_light,
              onclick: (state) => {
                if (mode) {
                  document.body.style.background = "black";
                  document.body.style.color = "white";
                } else {
                  document.body.style.background = "white";
                  document.body.style.color = "black";
                }
                return __spreadValues(__spreadValues({}, state), { mode: !mode });
              }
            }),
            h("div", {
              innerHTML: external_link,
              onclick: (state) => {
                window.open("https://nav.kis9a.com", "_blank");
                return state;
              }
            })
          ])
        ]),
        h("div", { class: "images", style: { minHeight: "500px" } }, images && images.map((s) => ((name) => {
          switch (true) {
            case isImageFormat(name):
              return h("div", {
                class: "imgc",
                style: {
                  alignItems: getRandomAlign(),
                  justifyContent: getRandomAlign()
                }
              }, [
                h("img", {
                  alt: name,
                  src: `/data/images/${name}`,
                  style: { width: `${78 + getRandomInt(22)}%` },
                  class: "fade-in-2",
                  loading: "lazy",
                  "data-src": `${name}`
                })
              ]);
            case isVideoFormat(name):
              return h("div", {
                class: "imgc",
                style: {
                  alignItems: getRandomAlign(),
                  justifyContent: getRandomAlign()
                }
              }, [
                h("video", {
                  alt: name,
                  src: `/data/images/${name}`,
                  controls: true
                })
              ]);
          }
        })(s.name)))
      ])
    ]),
    node: document.getElementById("app")
  });
})();
