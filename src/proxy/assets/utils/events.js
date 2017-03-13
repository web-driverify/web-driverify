function ClickEvent () {
  if (typeof window.MouseEvent === 'function') {
    return new window.MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    })
  } else {
    let clickEvent = document.createEvent('MouseEvent')
    clickEvent.initEvent('click', true, false)
    return clickEvent
  }
}

function TouchEvent (evtName, touches) {
  let evt = document.createEvent('Event')
  evt.initEvent(evtName, true, true)
  evt.touches = touches || []
  return evt
}

function KeyboardEvent (type, code) {
  var oEvent = document.createEvent('KeyboardEvent')

  // http://stackoverflow.com/questions/22574431/testing-keydown-events-in-jasmine-with-specific-keycode
  // Chromium Hack: filter this otherwise Safari will complain
  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    Object.defineProperty(oEvent, 'keyCode', {
      get: function () {
        return this.keyCodeVal
      }
    })
    Object.defineProperty(oEvent, 'which', {
      get: function () {
        return this.keyCodeVal
      }
    })
  }

  if (oEvent.initKeyboardEvent) {
    oEvent.initKeyboardEvent(type, true, true, document.defaultView, false, false, false, false, code, code)
  } else {
    oEvent.initKeyEvent(type, true, true, document.defaultView, false, false, false, false, code, 0)
  }

  oEvent.keyCodeVal = code
  return oEvent
}

export { ClickEvent, KeyboardEvent, TouchEvent }
