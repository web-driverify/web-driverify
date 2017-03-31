import wd from '../utils/wd.js'
import { KeyboardEvent } from '../utils/events.js'
import element from '../utils/element.js'
import $ from 'jquery'

/*
 * ElementClick
 */
wd.handlers.ElementClick = function (id) {
  let el = element.getVisible(id)
  let via = ''
  if (typeof el.click === 'function') {
    via = 'native'
    el.click()
  } else {
    via = 'jQuery'
    $(el).click()
  }
  return `${element.toString(id)} clicked via ${via}`
}

/*
 * ElementSendKeys
 */
wd.handlers.ElementSendKeys = function (id, str) {
  let el = element.getVisible(id)
  let val = $(el).val()
  Array.prototype.forEach.call(str, function (c) {
    el.dispatchEvent(new KeyboardEvent('keydown', c))
    el.dispatchEvent(new KeyboardEvent('keypress', c))
    el.dispatchEvent(new KeyboardEvent('keyup', c))
  })
  // based on security concerns, keyboard events wont change value
  $(el).val(val + str)
  return 'keys sent to ' + element.toString(id)
}

/*
 * ElementSubmit
 */
wd.handlers.ElementSubmit = function (id) {
  let el = element.getById(id)
  el.submit()
}
wd.handlers.ElementSubmit.silent = true

/*
 * ElementClear
 */
wd.handlers.ElementClear = function (id, str) {
  let el = element.getById(id)
  if (/input|textarea/i.test(el.tagName)) {
    $(el).val('')
  }
  return element.toString(id) + ` cleared`
}
