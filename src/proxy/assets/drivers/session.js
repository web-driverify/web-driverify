import wd from '../utils/wd.js'
import Log from '../utils/log.js'

let logger = new Log('drivers:session')

wd.handlers.DeleteSession = function () {
  logger.log('closing session')
  wd.state = 'closing'
  return 'closing'
}
wd.handlers.DeleteSession.success = function () {
  // window.close doesn't help, mostly
  // window.close()
}
