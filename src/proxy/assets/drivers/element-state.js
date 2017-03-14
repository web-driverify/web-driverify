import { getWD } from '../utils/wd.js'
import element from '../utils/element.js'
import Log from '../utils/log.js'

let logger = new Log('element-state')
let getElement = element.getById
let wd = getWD()

wd.handlers.GetElementText = function (id) {
  var el = getElement(id)
  var text = el.innerText
  logger.log('GetElementText sending:', text)
  return text
}

wd.handlers.GetElementAttribute = function (id, name) {
  var el = getElement(id)
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

wd.handlers.GetElementRect = function (id) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  }
}
