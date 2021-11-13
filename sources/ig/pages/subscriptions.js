import { Hyperway } from "hyperway";
import routes from "/router";

const subscriptions = (state) => [
  Hyperway({
    onNotFound: (state, _) => {
      window.location.href = "/";
      return { ...state };
    },
    onRoute: (state, _) => ({ ...state }),
    routes: routes,
  }),
  ...mergedSubs(state),
];

export default subscriptions;

const mergedSubs = (state) => {
  var res = [];
  for (var r of routes) {
    const subs = r.subs && r.subs(state);
    if (Array.isArray(subs)) {
      for (var s of subs) {
        res = [...res, s];
      }
    }
  }
  return res;
};
