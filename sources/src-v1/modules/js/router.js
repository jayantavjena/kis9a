import svg_home from "/assets/svgs/home.svg";
import svg_photograph from "/assets/svgs/photograph.svg";
import svg_chart_bar from "/assets/svgs/chart-bar.svg";
import svg_pencil_alt from "/assets/svgs/pencil-alt.svg";

export const headerRoutes = [
  {
    name: "home",
    href: "/",
    icon: svg_home,
  },
  {
    name: "memos",
    href: "/memos/",
    icon: svg_pencil_alt,
  },
  {
    name: "images",
    href: "/images/",
    icon: svg_photograph,
  },
  {
    name: "waka",
    href: "/waka/",
    icon: svg_chart_bar,
  },
];

export const routes = [
  ...headerRoutes,
  {
    name: "tools",
    href: "/tools/",
    icon: svg_home,
  },
  {
    name: "tools",
    href: "/tools/",
    icon: svg_home,
  },
  {
    name: "comps",
    href: "/components/",
    icon: svg_home,
  },
];

export const pushRoute = (name) => {
  const item = routes.find((v) => v.name == name);
  window.location.href = item.href;
};
