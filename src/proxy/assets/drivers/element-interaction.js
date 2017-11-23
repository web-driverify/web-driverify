import wd from '../utils/wd.js'
import Log from '../utils/log.js'
import { KeyboardEvent, trigger } from '../utils/events.js'
import { isMobile } from '../utils/ua.js'
import element from '../utils/element.js'
import $ from 'jquery'

const log = new Log('drivers/element-interaction')

/*
 * ElementClick
 */
wd.handlers.ElementClick = function (id) {
  let el = element.getVisible(id)
  var mob = isMobile()

  trigger(el, 'mouseover', 'pointerover')
  mob && trigger(el, 'touchstart')

  trigger(el, 'mousemove', 'pointermove')
  mob && trigger(el, 'touchmove')

  trigger(el, 'mousedown', 'pointerdown')

  trigger(el, 'focus')
  el.focus && el.focus()

  // HTMLElement.click triggers click event while focus does not
  el.click && el.click()

  trigger(el, 'mouseup', 'pointerup')
  mob && trigger(el, 'touchend')

  return `element ${id} clicked`
}

/*
 * ElementSendKeys
 */
wd.handlers.ElementSendKeys = function (id, str) {
  let el = element.getVisible(id)
  let val = $(el).val()
  Array.prototype.forEach.call(str, function (c) {
    trigger(el, new KeyboardEvent('keydown', c))
    trigger(el, new KeyboardEvent('keypress', c))
    trigger(el, new KeyboardEvent('keyup', c))
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
