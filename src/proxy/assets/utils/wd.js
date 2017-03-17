let STATES = {
  INIT: 0,
  PREPARING: 1,
  RUNNING: 2,
  STOPED: 3
}

let wd = {
  pageId: Math.random().toString(36).substr(2, 4),
  handlers: {},
  elements: {},
  state: STATES.INIT,
  STATES
}

export default wd
