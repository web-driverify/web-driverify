class NoSuchDriver extends Error {
  constructor () {
    super()
    this.status = 6
    this.detail = 'A session is either terminated or not started'
  }
}
class NoSuchElement extends Error {
  constructor () {
    super()
    this.status = 7
    this.detail = 'An element could not be located on the page using the given search parameters.'
  }
}
class NoSuchFrame extends Error {
  constructor () {
    super()
    this.status = 8
    this.detail = 'A request to switch to a frame could not be satisfied because the frame could not be found.'
  }
}
class UnknownCommand extends Error {
  constructor () {
    super()
    this.status = 9
    this.detail = 'The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource.'
  }
}
class StaleElementReference extends Error {
  constructor () {
    super()
    this.status = 10
    this.detail = 'An element command failed because the referenced element is no longer attached to the DOM.'
  }
}
class ElementNotVisible extends Error {
  constructor () {
    super()
    this.status = 11
    this.detail = 'An element command could not be completed because the element is not visible on the page.'
  }
}
class InvalidElementState extends Error {
  constructor () {
    super()
    this.status = 12
    this.detail = 'An element command could not be completed because the element is in an invalid state (e.g. attempting to click a disabled element).'
  }
}
class UnknownError extends Error {
  constructor () {
    super()
    this.status = 13
    this.detail = 'An unknown server-side error occurred while processing the command.'
  }
}
class ElementIsNotSelectable extends Error {
  constructor () {
    super()
    this.status = 15
    this.detail = 'An attempt was made to select an element that cannot be selected.'
  }
}
class JavaScriptError extends Error {
  constructor () {
    super()
    this.status = 17
    this.detail = 'An error occurred while executing user supplied JavaScript.'
  }
}
class XPathLookupError extends Error {
  constructor () {
    super()
    this.status = 19
    this.detail = 'An error occurred while searching for an element by XPath.'
  }
}
class Timeout extends Error {
  constructor () {
    super()
    this.status = 21
    this.detail = 'An operation did not complete before its timeout expired.'
  }
}
class NoSuchWindow extends Error {
  constructor () {
    super()
    this.status = 23
    this.detail = 'A request to switch to a different window could not be satisfied because the window could not be found.'
  }
}
class InvalidCookieDomain extends Error {
  constructor () {
    super()
    this.status = 24
    this.detail = 'An illegal attempt was made to set a cookie under a different domain than the current page.'
  }
}
class UnableToSetCookie extends Error {
  constructor () {
    super()
    this.status = 25
    this.detail = "A request to set a cookie's value could not be satisfied."
  }
}
class UnexpectedAlertOpen extends Error {
  constructor () {
    super()
    this.status = 26
    this.detail = 'A modal dialog was open, blocking this operation'
  }
}
class NoAlertOpenError extends Error {
  constructor () {
    super()
    this.status = 27
    this.detail = 'An attempt was made to operate on a modal dialog when one was not open.'
  }
}
class ScriptTimeout extends Error {
  constructor () {
    super()
    this.status = 28
    this.detail = 'A script did not complete before its timeout expired.'
  }
}
class InvalidElementCoordinates extends Error {
  constructor () {
    super()
    this.status = 29
    this.detail = 'The coordinates provided to an interactions operation are invalid.'
  }
}
class IMENotAvailable extends Error {
  constructor () {
    super()
    this.status = 30
    this.detail = 'IME was not available.'
  }
}
class IMEEngineActivationFailed extends Error {
  constructor () {
    super()
    this.status = 31
    this.detail = 'An IME engine could not be started.'
  }
}
class InvalidSelector extends Error {
  constructor () {
    super()
    this.status = 32
    this.detail = 'Argument was an invalid selector (e.g. XPath/CSS).'
  }
}
class SessionNotCreatedException extends Error {
  constructor () {
    super()
    this.status = 33
    this.detail = 'A new session could not be created.'
  }
}
class MoveTargetOutOfBounds extends Error {
  constructor () {
    super()
    this.status = 34
    this.detail = 'Target provided for a move action is out of bounds.'
  }
}

export {
  NoSuchDriver,
  NoSuchElement,
  NoSuchFrame,
  UnknownCommand,
  StaleElementReference,
  ElementNotVisible,
  InvalidElementState,
  UnknownError,
  ElementIsNotSelectable,
  JavaScriptError,
  XPathLookupError,
  Timeout,
  NoSuchWindow,
  InvalidCookieDomain,
  UnableToSetCookie,
  UnexpectedAlertOpen,
  NoAlertOpenError,
  ScriptTimeout,
  InvalidElementCoordinates,
  IMENotAvailable,
  IMEEngineActivationFailed,
  InvalidSelector,
  SessionNotCreatedException,
  MoveTargetOutOfBounds
}
