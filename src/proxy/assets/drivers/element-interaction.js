import { getWD } from '../utils/wd.js'
import { ClickEvent } from '../utils/events.js'
import { StaleElementReference, ElementNotVisible } from '../utils/errors.js'

let wd = getWD()

wd.handlers.ElementClick = function (id) {
  var el = wd.elements[id]
  if (!el) {
    throw new StaleElementReference()
  }
  if (isHidden(el)) {
    throw new ElementNotVisible()
  }
  console.log('dispatching click event on', el)
  el.dispatchEvent(new ClickEvent())
  return 'element ' + id + ' clicked'
}

function isHidden (el) {
  var style = window.getComputedStyle(el)
  return (style.display === 'none')
}
