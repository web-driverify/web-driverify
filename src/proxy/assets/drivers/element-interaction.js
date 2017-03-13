import { getWD } from '../utils/wd.js'
import { ClickEvent, KeyboardEvent } from '../utils/events.js'
import element from '../utils/element.js'

let wd = getWD()

wd.handlers.ElementClick = function (id) {
  let el = element.getVisible(id)
  el.dispatchEvent(new ClickEvent())
  return element.toString(id) + ' clicked'
}

wd.handlers.ElementSendKeys = function (id, str) {
  let el = element.getVisible(id)
  Array.prototype.forEach.call(str, function (c) {
    el.dispatchEvent(new KeyboardEvent('keydown', c))
    el.dispatchEvent(new KeyboardEvent('keypress', c))
    el.dispatchEvent(new KeyboardEvent('keyup', c))
  })
  // Unicode Workaround
  if (/input|textarea/i.test(el.tagName)) {
    // phantomjs wont respect to el.value = xxx
    el.setAttribute('value', el.value + str)
  }
  return 'keys sent to ' + element.toString(id)
}

wd.handlers.ElementSubmit = function (id) {
  let el = element.getById(id)
  el.submit()
}
wd.handlers.ElementSubmit.silent = true

wd.handlers.ElementClear = function (id, str) {
  let el = element.getById(id)
  if (/input|textarea/i.test(el.tagName)) {
    el.setAttribute('value', '')
  }
  return element.toString(id) + ` cleared`
}
