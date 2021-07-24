import { h, text, app, memo } from "/js/lib/hyperapp.js";

//////Declare the variables for home, about & contact html pages{{{
////let home = "";
////let about = "";
////let contact = "";

/////\*_
//// _
//// _ @param {String} page - Represents the page information that needs to be retrieved
//// _ @returns {String} resHtml - The Page's HTML is returned from the async invocation
//// \*/

////const loadPage = async (page) => {
//// const response = await fetch(page);
//// const resHtml = await response.text();
//// return resHtml;
////};

/////\*_
//// _ The Async function loads all HTML to the variables 'home', 'about' & 'contact'
//// \*/
////const loadAllPages = async () => {
//// // home = await loadPage("home.html");
//// home = "<div>Hello</div>"
//// // about = await loadPage("about.html");
//// // contact = await loadPage("contact.html");
////};

//////Get the Element with the Id 'root'
////const rootDiv = document.getElementById("root");

/////\*_
//// _ The Main Function is an async function that first loads All Page HTML to the variables
//// _ Once the variables are loaded with the contents, then they are assigned to the 'routes' variable
//// _/
////const main = async () => {
//// await loadAllPages();
//// rootDiv.innerHTML = home;
//// routes = {
//// "/": home,
//// "/contact": contact,
//// "/about": about,
//// };
////};

/////\*_
//// _
//// _ @param {String} pathname - Pass the 'pathname' passed from onClick function of the link (index.html)
//// _ The function is invoked when any link is clicked in the HTML.
//// _ The onClick event on the HTML invokes the onNavClick & passes the pathname as param
//// _/
////const onNavClick = (pathname) => {
//// window.history.pushState({}, pathname, window.location.origin + pathname);
//// rootDiv.innerHTML = routes[pathname];
////};

/////\*_
//// _ The Function is invoked when the window.history changes
//// \*/
////window.onpopstate = () => {
//// rootDiv.innerHTML = routes[window.location.pathname];
////};
////// Invoke the Main function
//// main();//}}}

//const push = () => {
// console.log("push");
//};

//const replace = () => {
// console.log("push");
// console.log("push");
// console.log("push");
// console.log("push");
//};

//const onLocationChanged = () => {
// console.log("on location changed");
//};
//
const onRoute = () => {
const pathname = window.location.pathname;
console.log("on route", pathname);
};

//window.addEventListener("popstate", onLocationChanged);
window.history.pushState = () => {
console.log("pushState");
onRoute();
};
// window.history.replaceState = () => {
// console.log("replaceState");
// onRoute();
// };

//history.replaceState(null, null, "/hoge3");
// function onLocationChanged() {
// const pathname = window.location.pathname;
// debug([pathname]);
// for (const route of props.routes) {
// route.\_pathSegs = route.\_pathSegs || splitPath(route.path);
// const params = matchPath(pathname, route.\_pathSegs);
// if (params) {
// props.matched({ route, params }, dispatch);
// return;
// }
// }
// props.matched(undefined, dispatch);
// }

const randomHex = () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)];
const randomColor = () => "#" + Array.from({ length: 6 }, randomHex).join("");

const listView = (list) =>
h(
"p",
{
style: {
backgroundColor: randomColor(),
color: randomColor(),
},
},
text(list)
);

const MoreItems = (state) => ({ ...state, list: [...state.list, randomHex()] });
const Increment = (state) => ({ ...state, counter: state.counter + 1 });

const nview = () => h("h1", {}, text("nview"));
const fview = () => h("h1", {}, text("fview"));

const ChangeUrl = (state) => {
window.history.replaceState("", "", "/about");
onRoute();
return { ...state };
};

const ToHome = (state) => {
window.history.replaceState("", "", "/");
onRoute();
return { ...state };
};

// const route = (state) => {
// console.log("just routel", state);
// state.
// };

app({
init: {
list: ["a", "b", "c"],
counter: 0,
route: "home",
},
view: (state) =>
h("main", {}, [
h("button", { onclick: MoreItems }, text("Grow list")),
h("button", { onclick: Increment }, text("+1 to counter")),
h("button", { onclick: ChangeUrl }, text("change")),
h("button", { onclick: ToHome }, text("change")),
h("p", {}, text(`Counter: ${state.counter}`)),
h("p", {}, text("Regular view showing list:")),
listView(state.list),
h("p", {}, text("Memoized view showing list:")),
memo(listView, state.list),
state.route == "home" && nview(),
state.route == "about" && fview(),
]),
subscriptions: (state) => {
const path = window.location.pathname;
if (path == "/about") {
state.route = "about";
} else if (path == "/") {
state.route = "home";
}
// console.log("path", path);
// state.route = "about";
console.log(state.route);
},
node: document.getElementById("app"),
});

// history.replaceState(null, null, "/hoge")

```
https://yourname.github.io/repo-name/book/123 といった URL でアクセスすると、カスタム 404.html ページが呼び出される。
404.html の中の JavaScript で、https://yourname.github.io/repo-name にリダイレクトする。このとき、URL から /book/123 というパラメータを抽出し、?q=book%2F123 のように URL エンコードしたクエリパラメータとして付加する。
Web サイトトップの index.html が呼び出されるので、JavaScript を使って URL 末尾のクエリ文字列 (?q=book%2F123を取り出し、もとのパラメータの形 (/book/123) に戻す。
window.history.replaceState() で Web ブラウザのアドレスを /book/123 にセットし、React Router を動作させる（このときサーバーアクセスは発生しません）。

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>My App</title>
  <script>
    // Web サイトをサブディレクトリに配置するなら、この値を 1 にする。
    const SEGMENT_COUNT = 0;

    // 例えば、SEGMENT_COUNT = 1 の場合、
    // https://yourname.github.io/repo-name/book/123 のような URL のうち、
    // repo-name までをベースアドレスとみなし、末尾のパス (books/123)
    // をエンコードして次のような URL へリダイレクトする。
    // https://yourname.github.io/repo-name?p=book%2F123
    const loc = window.location
    const origin = loc.origin;  //=> https://yourname.github.io
    const path = loc.href.substr(origin.length + 1);  //=> repo-name/book/123
    const segments = path.split('/');  //=> [repo-name, book, 123]
    const repo = segments.slice(0, SEGMENT_COUNT).join('/');  //=> repo-name
    const param = segments.slice(SEGMENT_COUNT).join('/');  //=> book/123
    const url = origin + '/' + repo + '?p=' + encodeURIComponent(param);
    loc.replace(url);
  </script>
</head>
<body></body>
</html>
```

```

import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Main } from './Main';
import { Top } from './Top';

const ROUTER_BASENAME =
  process.env.NODE_ENV === 'development' ? '/' : '/repo-name';

export const App: React.FC = () => {
  return (<div style={{margin: '1em'}}>
    <Router basename={ROUTER_BASENAME}>
      <Switch>
        <Route path="/" exact={true} component={Top} />
        <Route path="/main" component={Main} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </div>);
};
```
