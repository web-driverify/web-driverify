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
