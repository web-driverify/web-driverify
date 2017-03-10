import { getWD } from '../utils/wd.js'

let wd = getWD()

wd.handlers.DeleteSession = function () {
  wd.state = 'closing'
  return 'closing'
}
wd.handlers.DeleteSession.success = function () {
  // window.close doesn't help, mostly
  // window.close()
}
