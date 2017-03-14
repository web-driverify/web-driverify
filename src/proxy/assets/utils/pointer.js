// This is a pointer event emulator
// Thanks to @Nicolas Gryman
// https://ngryman.sh/articles/simulate-mouse--touch-events-with-jquery-in-phantomjs-and-the-browser/
import element from './element.js'
import {TouchEvent} from './events.js'
import Log from './log.js'

let logger = new Log('utils:pointer')
let hasTouch = 'ontouchstart' in window

class Pointer {
  constructor (x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  trigger (evtName) {
    let el = document.elementFromPoint(this.x, this.y)
    let id = element.getOrCreate(el)
    logger.log('triggering', evtName, 'for', element.toString(id))

    let evt = new TouchEvent(evtName, [{
      pageX: this.x,
      pageY: this.y
    }])
    el.dispatchEvent(evt)
  }

  click () {
    this.trigger('click')
  }

  tapStart () {
    this.trigger(Pointer.START_EVENT)
  }

  tapEnd () {
    this.trigger(Pointer.STOP_EVENT)
  }

  move (x, y, callback, duration) {
    let self = this
    let last = Date.now()
    let t = 0

    this.tapStart()

    let sx = this.x
    let sy = this.y;
    (function mv () {
      var now = Date.now()
      t += now - last
      if (t >= duration) {
        self.tapEnd()
        callback.call(self)
        return
      }
      last = now

      self.x = Math.ceil(t / duration * x) + sx
      self.y = Math.ceil(t / duration * y) + sy

      self.trigger(Pointer.MOVE_EVENT)
      setTimeout(mv, 0)
    })()
  }

  tap () {
    this.tapStart()
    this.tapEnd()
  }

  press (callback, duration) {
    var self = this
    duration = duration || Pointer.PRESS_DURATION * 1.5 /* security */
    this.tapStart()
    setTimeout(function () {
      self.tapEnd()
      if (callback) callback.call(self)
    }, duration)
  }

  doubleTap (callback, duration) {
    var self = this
    duration = duration || Pointer.DOUBLETAP_DURATION * 0.5 /* security */
    this.tap()
    setTimeout(function () {
      self.tap()
      callback.call(self)
    }, duration)
  }

  drag (x, y, callback, duration) {
    duration = duration || Pointer.FLICK_DURATION * 1.5 /* security */
    this.move(x, y, callback, duration)
  }

  flick (x, y, callback, duration) {
    duration = duration || Pointer.FLICK_DURATION * 0.5 /* security */
    this.move(x, y, callback, duration)
  }
}

Pointer.START_EVENT = hasTouch ? 'touchstart' : 'mousedown'
Pointer.STOP_EVENT = hasTouch ? 'touchend' : 'mouseup'
Pointer.MOVE_EVENT = hasTouch ? 'touchmove' : 'mousemove'
Pointer.PRESS_DURATION = 300
Pointer.DOUBLETAP_DURATION = 300
Pointer.FLICK_DURATION = 300

export default Pointer
