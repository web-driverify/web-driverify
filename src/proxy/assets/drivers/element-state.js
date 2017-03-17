import { getWD } from '../utils/wd.js'
import element from '../utils/element.js'
import Log from '../utils/log.js'

let logger = new Log('element-state')
let getElement = element.getById
let wd = getWD()

/*
 * GetElementText
 */
wd.handlers.GetElementText = function (id) {
  let el = getElement(id)
  let text = el.innerText
  logger.log('GetElementText sending:', text)
  return text
}

/*
 * GetElementAttribute
 */
wd.handlers.GetElementAttribute = function (id, name) {
  let el = getElement(id)
  if (name === 'painted egg') {
    throw new Error('painted egg')
  }
  return el.getAttribute(name)
}

/*
 * GetElementSize
 */
wd.handlers.GetElementSize = function (id) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height
  }
}

/*
 * GetElementLocation
 */
wd.handlers.GetElementLocation = function (id) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top
  }
}

/*
 * GetElementRect
 */
wd.handlers.GetElementRect = function (id) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  }
}
