import wd from '../utils/wd.js'

wd.handlers.DeleteSession = function () {
  wd.state = 'closing'
  return 'closing'
}
wd.handlers.DeleteSession.success = function () {
  // window.close doesn't help, mostly
  // window.close()
}
