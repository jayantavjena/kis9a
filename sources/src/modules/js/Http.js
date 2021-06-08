import { assign } from "./utils.js";

function httpEffect(dispatch, props) {
  fetch(props.url, props.options)
    .then(function (response) {
      if (!response.ok) {
        throw response;
      }
      return response;
    })
    .then(function (response) {
      return response[props.response]();
    })
    .then(function (result) {
      dispatch(props.action, result);
    })
    .catch(function (error) {
      dispatch(props.error, error);
    });
}

export function Http(props) {
  return [
    httpEffect,
    assign(
      {
        options: {},
        response: "json",
        error: props.action,
      },
      props
    ),
  ];
}
