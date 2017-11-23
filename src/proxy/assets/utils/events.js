import Log from './log.js'

const log = new Log('utils/events')

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
  var event = new Event(type, {
    'bubbles': true
  })
  for (var key in props) {
    if (!props.hasOwnProperty(key)) {
      return
    }
    event[key] = props[key]
  }
  return event
}

function TouchEvent (evtName, touches) {
  let evt = createEvent(evtName)
  evt.touches = touches || []
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

export { KeyboardEvent, TouchEvent, createEvent, trigger }
