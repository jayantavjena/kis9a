import { app, h, text } from "/modules/js/hyperapp.js";
import { Hyperway, routeTo } from "/modules/js/hyperway.js";
import { Header } from "/components/header";
import "/layouts/index.css";
import "./index.css";
import "https://unpkg.com/jsqr@1.4.0/dist/jsQR.js";

const Link = ({ to }, t) =>
  h("a", { class: `link`, onclick: routeTo(to) }, text(t));

const defaultState = {
  view: "default",
};

const initialState = [defaultState];

const viewRoute = (view) => {
  switch (view) {
    case "default":
      return viewDefaults();
    case "draw":
      return viewDraw();
    default:
      return h("div", { class: "not-found" }, text("not found"));
  }
};

const viewDefaults = () => {
  return h(
    "div",
    { style: { cursor: "pointer" } },
    h("div", { class: "links" }, [
      Link({ to: "/tools/" }, "TOOLS"),
      Link({ to: "/tools/draw/" }, "DRAW"),
    ])
  );
};

const viewDraw = () => {
  window.SQR = window.SQR || {};

  SQR.reader = (() => {
    /**
     * getUserMedia()に非対応の場合は非対応の表示をする
     */
    const showUnsuportedScreen = () => {
      document.querySelector("#js-unsupported").classList.add("is-show");
    };
    if (!navigator.mediaDevices) {
      showUnsuportedScreen();
      return;
    }

    const video = document.querySelector("#js-video");

    /**
     * videoの出力をCanvasに描画して画像化 jsQRを使用してQR解析
     */
    const checkQRUseLibrary = () => {
      const canvas = document.querySelector("#js-canvas");
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        SQR.modal.open(code.data);
      } else {
        setTimeout(checkQRUseLibrary, 200);
      }
    };

    /**
     * videoの出力をBarcodeDetectorを使用してQR解析
     */
    const checkQRUseBarcodeDetector = () => {
      const barcodeDetector = new BarcodeDetector();
      barcodeDetector
        .detect(video)
        .then((barcodes) => {
          if (barcodes.length > 0) {
            for (let barcode of barcodes) {
              SQR.modal.open(barcode.rawValue);
            }
          } else {
            setTimeout(checkQRUseBarcodeDetector, 200);
          }
        })
        .catch(() => {
          console.error("Barcode Detection failed, boo.");
        });
    };

    /**
     * BarcodeDetector APIを使えるかどうかで処理を分岐
     */
    const findQR = () => {
      window.BarcodeDetector
        ? checkQRUseBarcodeDetector()
        : checkQRUseLibrary();
    };

    /**
     * デバイスのカメラを起動
     */
    const initCamera = () => {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: {
              exact: "environment",
            },
          },
        })
        .then((stream) => {
          video.srcObject = stream;
          video.onloadedmetadata = () => {
            video.play();
            findQR();
          };
        })
        .catch(() => {
          showUnsuportedScreen();
        });
    };

    return {
      initCamera,
      findQR,
    };
  })();

  SQR.modal = (() => {
    const result = document.querySelector("#js-result");
    const link = document.querySelector("#js-link");
    const copyBtn = document.querySelector("#js-copy");
    const modal = document.querySelector("#js-modal");
    const modalClose = document.querySelector("#js-modal-close");

    /**
     * 取得した文字列を入れ込んでモーダルを開く
     */
    const open = (url) => {
      result.value = url;
      link.setAttribute("href", url);
      modal.classList.add("is-show");
    };

    /**
     * モーダルを閉じてQR読み込みを再開
     */
    const close = () => {
      modal.classList.remove("is-show");
      SQR.reader.findQR();
    };

    const copyResultText = () => {
      result.select();
      document.execCommand("copy");
    };

    copyBtn.addEventListener("click", copyResultText);

    modalClose.addEventListener("click", () => close());

    return {
      open,
    };
  })();

  if (SQR.reader) SQR.reader.initCamera();
  return h("h1", {}, text("draw"));
};

const back = (state) => {
  return { ...state, view: "default" };
};

app({
  init: initialState,
  view: ({ view }) =>
    h("div", { class: "container" }, [
      view == "default"
        ? Header()
        : h(
            "div",
            { style: { margin: "2rem", cursor: "pointer" } },
            h("h1", { onclick: back }, text("<"))
          ),
      h("main", { class: "main" }, [
        h("div", { class: "content" }, viewRoute(view)),
      ]),
    ]),
  subscriptions: () => [
    Hyperway({
      onNotFound: (state, props) => {
        return state;
      },
      onRoute: (state, props) => {
        return { ...state, url: props.path, params: props.params };
      },
      routes: [
        {
          path: "/tools/",
          onEnter: (state, _) => {
            return { ...state, view: "default" };
          },
          onLeave: (state, _) => {
            return state;
          },
        },
        {
          path: "tools/draw/",
          onEnter: (state, _) => {
            return { ...state, view: "draw" };
          },
        },
      ],
    }),
  ],
  node: document.getElementById("app"),
});
