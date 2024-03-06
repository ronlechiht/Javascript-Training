export function createElement(tag, className) {
  const element = document.createElement(tag)
  if (className) element.classList.add(className)
  return element
}

export function createThreeDotsBtn(className) {
  let threeDotsBtn = createElement('div', className)
  let dot1 = createElement('div', 'dot')
  let dot2 = createElement('div', 'dot')
  let dot3 = createElement('div', 'dot')
  threeDotsBtn.append(dot1, dot2, dot3)
  return threeDotsBtn
}
