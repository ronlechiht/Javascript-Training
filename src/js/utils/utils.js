const debounceDelay = 1000

export const debounce = (mainFunction) => {
  let timer

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      mainFunction(...args)
    }, debounceDelay)
  }
}
