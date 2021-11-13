import Home from "/pages/home";
import Images from "/pages/images";

const routes = [Home, Images];

export default routes;

export const navRoutes = [
  { name: Home.name, path: "/" },
  { name: Images.name, path: "/images" },
];
