export const fadeIn = (el, time) => {
  el.style.opacity = 0;
  let last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();
    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 10);
    }
  };
  tick();
};

export const fadeOut = (el, time) => {
  el.style.opacity = 1;
  let last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity - (new Date() - last) / time;
    last = +new Date();
    if (+el.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 10);
    }
  };
  tick();
};
