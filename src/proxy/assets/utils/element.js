import wd from '../utils/wd.js'
import { StaleElementReference, ElementNotVisible } from '../../../utils/errors.js'
import some from 'lodash/some'
import $ from 'jquery'

let elementId = 0

function getById (id) {
  let el = wd.elements[id]
  if (!el) {
    throw new StaleElementReference()
  }
  return el
}

function getByLocation (x, y) {
  let el = window.elementFromPoint(x, y)
  if (!el) {
    throw new StaleElementReference()
  }
  return el
}

function getVisible (id) {
  let el = getById(id)
  if (isHidden(el)) {
    throw new ElementNotVisible()
  }
  return el
}

function getOrCreate (el) {
  let ret = -1
  some(wd.elements, (v, k) => {
    if (v === el) {
      ret = k
      return true
    }
  })
  return (ret === -1) ? create(el) : ret
}

function isHidden (el) {
  let $el = $(el)
  return ($el.width() + $el.height() < 1)
}

function toString (id) {
  let el = getById(id)
  let classList = el.className
    .split(/\s+/)
    .filter(cls => !!cls)
    .map(cls => '.' + cls)
    .join('')
  let idStr = el.getAttribute('id')
  idStr = idStr ? '#' + idStr : ''
  return el.tagName + classList + idStr + ` (${id})`
}

function create (el) {
  wd.elements[elementId] = el
  return elementId++
}

export default {getVisible, getById, getByLocation, toString, getOrCreate, create, isHidden}
