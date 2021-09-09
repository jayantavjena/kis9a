import { makeRemoveListener } from "../utils.js";

function keyboardEffect(dispatch, props) {
  var removeListenerForEvent = makeRemoveListener.bind(
    null,
    document,
    dispatch,
    props.action
  );
  var removeDown = props.downs ? removeListenerForEvent("keydown") : null;
  var removeUp = props.ups ? removeListenerForEvent("keyup") : null;
  var removePress = props.presses ? removeListenerForEvent("keypress") : null;
  return function () {
    removeDown && removeDown();
    removeUp && removeUp();
    removePress && removePress();
  };
}

export function Keyboard(props) {
  return [keyboardEffect, props];
}
