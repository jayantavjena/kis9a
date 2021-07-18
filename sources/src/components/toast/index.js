import "./index.css";

export const Toast = (
  msg,
  opts = {
    time: 1600,
    width: "300px",
    bottom: "10px",
    right: "10px",
    left: "auto",
    top: "auto",
    bg: "#e6e6e6",
  }
) => {
  const toast = document.createElement("div");
  toast.style.background = opts.bg;
  toast.style.bottom = opts.bottom;
  toast.style.left = opts.left;
  toast.style.right = opts.right;
  toast.style.top = opts.top;
  toast.style.width = opts.width;
  toast.style.position = "fixed";
  toast.style.padding = "1.2rem";
  toast.style.fontSize = "1.6rem";
  toast.style.borderRadius = "1rem 0.5rem 0rem 0.5rem";
  toast.appendChild(document.createTextNode(msg));
  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.display = "none";
    document.body.removeChild(toast);
  }, opts.time);
};
