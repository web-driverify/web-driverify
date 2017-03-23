import wd from '../utils/wd.js'
import Log from '../utils/log.js'
import $ from 'jquery'

let logger = new Log('drivers:navigation')

wd.handlers.GetCurrentUrl = function () {
  return window.location.href
}

wd.handlers.Go = function (url) {
  wd.state = wd.STATES.NAVIGATING
  location.href = url
}
wd.handlers.Go.halt = true

wd.handlers.Back = function () {
  wd.state = wd.STATES.NAVIGATING
  let before = location.href
  history.back()
  let after = location.href
  logger.log('backing from', before, 'to', after)

  let waiting = true
  $(window).one('popstate', () => (waiting = false))
  let timer = setInterval(() => {
    if (!waiting) {
      return clearInterval(timer)
    }
    if (location.href !== before) {
      logger.log('popstate not fired after Back, triggering manually...')
      $(window).trigger('webDriverify.start')
      waiting = false
    }
  }, 100)
}
wd.handlers.Back.halt = true

wd.handlers.Forward = function () {
  wd.state = wd.STATES.NAVIGATING
  history.forward()
}
wd.handlers.Forward.halt = true

wd.handlers.Refresh = function () {
  wd.state = wd.STATES.NAVIGATING
  location.reload()
}
wd.handlers.Refresh.halt = true

wd.handlers.GetTitle = function () {
  return document.title
}
