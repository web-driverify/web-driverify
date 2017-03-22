import Log from './log.js'

let logger = new Log('driver')

let STATES = {
  INIT: 'WebDriverify.STATES.INIT',
  PREPARING: 'WebDriverify.STATES.PREPARING',
  RUNNING: 'WebDriverify.STATES.RUNNING',
  STOPED: 'WebDriverify.STATES.RUNNING',
  NAVIGATING: 'WebDriverify.STATES.NAVIGATING'
}

let wd = {
  handlers: {},
  elements: {},
  _state: STATES.INIT,
  STATES,
  logger: new Log('client')
}

Object.defineProperty(wd, 'state', {
  configurable: false,
  get: () => wd._state,
  set: (val) => {
    logger.log(`state changed from ${wd._state} to ${val}`)
    wd._state = val
  }
})

if (typeof window !== 'undefined') {
  window.webDriverify = wd
}

export default wd
