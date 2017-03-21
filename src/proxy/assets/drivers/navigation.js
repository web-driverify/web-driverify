import wd from '../utils/wd.js'

wd.handlers.GetCurrentUrl = function () {
  return window.location.href
}

wd.handlers.Go = function (url) {
  wd.state = wd.STATES.NAVIGATING
  location.href = url
}
wd.handlers.Go.silent = true

wd.handlers.Back = function () {
  wd.state = wd.STATES.NAVIGATING
  history.back()
}
wd.handlers.Back.silent = true

wd.handlers.Forward = function () {
  wd.state = wd.STATES.NAVIGATING
  history.forward()
}
wd.handlers.Forward.silent = true

wd.handlers.Refresh = function () {
  wd.state = wd.STATES.NAVIGATING
  location.reload()
}
wd.handlers.Refresh.silent = true

wd.handlers.GetTitle = function () {
  return document.title
}
