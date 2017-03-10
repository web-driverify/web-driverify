import { getWD } from '../utils/wd.js'
import { StaleElementReference, ElementNotVisible } from '../utils/errors.js'

let wd = getWD()

function getElement (id) {
  let el = wd.elements[id]
  if (!el) {
    throw new StaleElementReference()
  }
  return el
}

function getVisibleElement (id) {
  let el = getElement(id)
  if (isHidden(el)) {
    throw new ElementNotVisible()
  }
  return el
}

function isHidden (el) {
  var style = window.getComputedStyle(el)
  return (style.display === 'none')
}

export {getVisibleElement, getElement}
