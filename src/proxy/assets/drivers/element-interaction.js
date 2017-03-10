import { getWD } from '../utils/wd.js'
import { ClickEvent, KeyboardEvent } from '../utils/events.js'
import {getVisibleElement} from '../utils/element.js'

let wd = getWD()

wd.handlers.ElementClick = function (id) {
  let el = getVisibleElement(id)
  el.dispatchEvent(new ClickEvent())
  return 'element ' + id + ' clicked'
}

wd.handlers.ElementSendKeys = function (id, str) {
  let el = getVisibleElement(id)
  Array.prototype.forEach.call(str, function (c) {
    el.dispatchEvent(new KeyboardEvent('keydown', c))
    el.dispatchEvent(new KeyboardEvent('keypress', c))
    el.dispatchEvent(new KeyboardEvent('keyup', c))
  })
  // Unicode Workaround
  if (el.tagName.toLowerCase() === 'input') {
    el.value += str
    console.log(el.setAttribute('value', el.value))
  }
  return 'keys sent to element' + id
}
