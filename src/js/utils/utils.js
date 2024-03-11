import { debounceDelay } from "../constants/constants";

export const debounce = (callback) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, debounceDelay);
  };
};
