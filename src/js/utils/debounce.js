import { DEBOUNCE_DELAY } from '../constants/constants'

export const debounce = (callback) => {
  let timer

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      callback(...args)
    }, DEBOUNCE_DELAY)
  }
}
