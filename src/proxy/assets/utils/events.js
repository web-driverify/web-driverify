import Log from './log.js'

const log = new Log('utils/events')
const eventTypes = {
  'click': MouseEvent,
  'touchstart': TouchEvent,
  'touchmove': TouchEvent,
  'touchend': TouchEvent
}

function trigger (el) {
  Array.prototype.forEach.call(arguments, function (event, idx) {
    if (idx === 0) {
      return
    }
    if (!(event instanceof Event)) {
      let type = event
      event = createEvent(type)
    }
    el.dispatchEvent(event)
  })
}

function createEvent (type, props) {
  const Evt = eventTypes[type] || Event
  var event = new Evt(type, {
    'bubbles': true
  })
  Object.assign(event, props)
  return event
}

function createClickEvent () {
  let evt = createEvent('click')
  return evt
}

function createTouchEvent (evtName) {
  let evt = createEvent(evtName)
  if (undefined === evt.touches) {
    evt.touches = []
  }
  return evt
}

function KeyboardEvent (type, code) {
  var event = createEvent(type)
  event.keyCodeVal = code
  event.keyCode = code
  event.which = code
  event.key = code
  return event
}

export { KeyboardEvent, createTouchEvent, createEvent, trigger, createClickEvent }
