const debounceDelay = 1000

export function debounce(mainFunction) {
  let timer

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      mainFunction(...args)
    }, debounceDelay)
  }
}
