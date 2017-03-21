let STATES = {
  INIT: 'WebDriverify.STATES.INIT',
  PREPARING: 'WebDriverify.STATES.PREPARING',
  RUNNING: 'WebDriverify.STATES.RUNNING',
  STOPED: 'WebDriverify.STATES.RUNNING',
  NAVIGATING: 'WebDriverify.STATES.NAVIGATING'
}

let wd = {
  pageId: Math.random().toString(36).substr(2, 4),
  handlers: {},
  elements: {},
  state: STATES.INIT,
  STATES
}

export default wd
