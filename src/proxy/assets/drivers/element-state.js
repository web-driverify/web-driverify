import { getWD } from '../utils/wd.js'
import { getElement } from '../utils/element.js'

let wd = getWD()

wd.handlers.GetElementText = function (id) {
  var el = getElement(id)
  var text = el.innerText
  console.log('GetElementText sending:', text)
  return text
}

wd.handlers.GetElementAttribute = function (id, name) {
  var el = getElement(id)
  return el.getAttribute(name)
}

wd.handlers.GetElementSize = function (id, name) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    width: rect.width,
    height: rect.height
  }
}

wd.handlers.GetElementLocation = function (id, name) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top
  }
}

wd.handlers.GetElementRect = function (id, name) {
  let rect = getElement(id).getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height
  }
}
