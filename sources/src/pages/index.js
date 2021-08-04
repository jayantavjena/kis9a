import { h, app } from "/modules/js/hyperapp.js";
import { Header } from "/components/header";
import "./index.css";
import "/layouts/index.css";
import { RSS } from "/modules/js/rss.js";
const doper = require("/modules/js/doper.js");

app({
  init: {},
  view: () =>
    h("div", { class: "container" }, [
      Header(),
      h("main", { id: "rss-feeds" }, []),
    ]),
  subscriptions: () => {},
  node: document.getElementById("app"),
});

window.onload = function () {
  const rss = new RSS(
    document.querySelector("#rss-feeds"),
    "https://zenn.dev/kis9a/feed",
    {
      limit: 20,
      entryTemplate:
        '<a class="feed" href="{url}" target="_blank"><img class="feed-thumbnail" src="{enclosureUrl}" alt="{author} {title}" /></a>',
    }
  );
  rss.render().then(() => {});
};

// (function () {
//   const el = document.createElement("div");
//   el.classList.add("box");
//   document.body.appendChild(el);
//   let node = doper("<div>RSS</div>", ".box");
//   node.parent.style.position = "fixed";
//   node.style.position = "absolute";
//   node.style.fontSize = "60px";
//   node.style.width = "50px";
//   node.style.height = "50px";
//   node.style.letterSpacing = "10px";
//   node.minAnchorX = 0.2;
//   node.maxAnchorX = 0.2;
//   node.minAnchorY = 0.2;
//   node.maxAnchorY = 0.2;
//   function update() {
//     node.rotation++;
//     node.y = Math.sin(node.rotation * 0.05) * 100;
//     requestAnimationFrame(update);
//   }
//   update();
// })();

// (function () {
//   const el = document.createElement("div");
//   el.classList.add("box1");
//   document.body.appendChild(el);
//   let node = doper("<div>Here</div>", ".box1");
//   node.parent.style.position = "fixed";
//   node.style.fontSize = "50px";
//   node.style.width = "50px";
//   node.style.height = "50px";
//   node.style.letterSpacing = "8px";
//   node.minAnchorX = 0.8;
//   node.maxAnchorX = 0.8;
//   node.minAnchorY = 0.2;
//   node.maxAnchorY = 0.6;
//   function update() {
//     node.rotation++;
//     node.y = Math.cos(node.rotation * 0.02) * 30;
//     requestAnimationFrame(update);
//   }
//   update();
// })();

// function randomMove() {
//   // var randomElm = document.getElementById(id);
//   const randomElm = document.createElement("div");
//   randomElm.parent.style.position = "fixed";
//   randomElm.style.fontSize = "50px";
//   document.body.appendChild(randomElm);
//   var randomTop = 50;
//   var randomLeft = 50;
//   randomElm.style.top = randomTop + "%";
//   randomElm.style.left = randomLeft + "%";
//   setInterval(function () {
//     if (Math.random() * 2 < 1) {
//       randomTop++;
//     } else {
//       randomTop--;
//     }
//     if (randomTop === 0) {
//       randomTop = 2;
//     }
//     if (randomTop === 100) {
//       randomTop = 98;
//     }
//     if (Math.random() * 2 < 1) {
//       randomLeft++;
//     } else {
//       randomLeft--;
//     }
//     if (randomLeft === 0) {
//       randomLeft = 2;
//     }
//     if (randomLeft === 100) {
//       randomLeft = 98;
//     }
//     randomElm.style.left = randomLeft + "%";
//     randomElm.style.top = randomTop + "%";
//   }, 100);
// }

// randomMove();
