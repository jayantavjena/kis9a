import { h, text } from "/modules/js/hyperapp.js";

const mapChildren = (child) =>
  typeof child === "string" || typeof child === "number"
    ? text(child)
    : Array.isArray(child)
    ? child.flatMap(mapChildren)
    : child;

export const element = new Proxy(
  {},
  {
    get:
      (_, tag) =>
      (...args) =>
        typeof args[0] === "object" &&
        !Array.isArray(args[0]) &&
        typeof args[0].props !== "object"
          ? h(tag, args[0], args.slice(1).flatMap(mapChildren))
          : h(tag, {}, args.flatMap(mapChildren)),
  }
);
