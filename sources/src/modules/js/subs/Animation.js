function animationEffect(dispatch, action) {
  var cancelId;

  function frame(timestamp) {
    dispatch(action, timestamp);
    cancelId = requestAnimationFrame(frame);
  }

  cancelId = requestAnimationFrame(frame);
  return function () {
    cancelAnimationFrame(cancelId);
  };
}

export function Animation(action) {
  return [animationEffect, action];
}
