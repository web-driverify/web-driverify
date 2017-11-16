import wd from '../utils/wd.js'
import element from '../utils/element.js'
import Log from '../utils/log.js'

let logger = new Log('element-state')
let getElement = element.getById

wd.handlers.GetElementText = function (id) {
  let el = getElement(id)
  let text = el.innerText
  logger.log('GetElementText sending:', text)
  return text
}

wd.handlers.GetElementAttribute = function (id, name) {
  let el = getElement(id)
  if (name === 'painted egg') {
    throw new Error('painted egg')
  }
  return el.getAttribute(name)
}

wd.handlers.GetElementSize = function (id) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height
  }
}

wd.handlers.GetElementLocation = function (id) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top
  }
}

wd.handlers.GetElementCSSValue = function (id, propertyName) {
  let styles = getComputedStyle(getElement(id))
  return styles[propertyName]
}

wd.handlers.GetElementRect = function (id) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  }
}

wd.handlers.GetElementDisplayed = function (id) {
  let el = getElement(id)
  return !element.isHidden(el)
}
