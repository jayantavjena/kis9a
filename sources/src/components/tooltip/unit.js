import { h, text } from "/modules/js/hyperapp.js";
import { Tooltip, RemoveTooltip } from "./index.js";

export const viewTooltip = () => {
  return h(
    "button",
    {
      onmouseover: () => [Tooltip, "messages tooltip default"],
      onmouseout: RemoveTooltip,
    },
    text("default")
  );
};
