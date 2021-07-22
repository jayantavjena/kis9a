const getIsMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

const isMobile = getIsMobile();

export const Tooltip = (state, msg) => {
  if (isMobile) {
    return;
  }
  let tooltip = document.getElementById("tooltip");
  if (!tooltip && msg) {
    const tooltip = document.createElement("div");
    tooltip.id = "tooltip";
    tooltip.innerHTML = msg;
    tooltip.style.position = "fixed";
    tooltip.style.bottom = "0";
    tooltip.style.left = "0";
    tooltip.style.width = "auto";
    tooltip.style.fontSize = "12px";
    tooltip.style.padding = "2px 8px 2px 8px";
    tooltip.style.borderRadius = "2px 4px 2px 2px";
    tooltip.style.background = "black";
    tooltip.style.color = "white";
    tooltip.style.zIndex = "9999";
    document.body.appendChild(tooltip);
  } else {
    tooltip.style.display = "visible";
  }
  return { ...state };
};

export const RemoveTooltip = (state) => {
  let tooltip = document.getElementById("tooltip");
  if (tooltip) {
    document.body.removeChild(tooltip);
  }
  return { ...state };
};
