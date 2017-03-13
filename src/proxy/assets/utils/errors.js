class WDError extends Error {
  constructor () {
    super()
    this.stack = (new Error()).stack
  }
}
class NoSuchDriver extends WDError {
  constructor () {
    super()
    this.status = 6
    this.message = 'NoSuchDriver: A session is either terminated or not started'
  }
}
class NoSuchElement extends WDError {
  constructor () {
    super()
    this.name = 'NoSuchElement'
    this.status = 7
    this.message = 'An element could not be located on the page using the given search parameters.'
  }
}
class NoSuchFrame extends WDError {
  constructor () {
    super()
    this.name = 'NoSuchFrame'
    this.status = 8
    this.message = 'A request to switch to a frame could not be satisfied because the frame could not be found.'
  }
}
class UnknownCommand extends WDError {
  constructor () {
    super()
    this.name = 'UnknownCommand'
    this.status = 9
    this.message = 'The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource.'
  }
}
class StaleElementReference extends WDError {
  constructor () {
    super()
    this.name = 'StaleElementReference'
    this.status = 10
    this.message = 'An element command failed because the referenced element is no longer attached to the DOM.'
  }
}
class ElementNotVisible extends WDError {
  constructor () {
    super()
    this.name = 'ElementNotVisible'
    this.status = 11
    this.message = 'An element command could not be completed because the element is not visible on the page.'
  }
}
class InvalidElementState extends WDError {
  constructor () {
    super()
    this.name = 'InvalidElementState'
    this.status = 12
    this.message = 'An element command could not be completed because the element is in an invalid state (e.g. attempting to click a disabled element).'
  }
}
class UnknownError extends WDError {
  constructor () {
    super()
    this.name = 'UnknownError'
    this.status = 13
    this.message = 'An unknown server-side error occurred while processing the command.'
  }
}
class ElementIsNotSelectable extends WDError {
  constructor () {
    super()
    this.name = 'ElementIsNotSelectable'
    this.status = 15
    this.message = 'An attempt was made to select an element that cannot be selected.'
  }
}
class JavaScriptError extends WDError {
  constructor () {
    super()
    this.name = 'JavaScriptError'
    this.status = 17
    this.message = 'An error occurred while executing user supplied JavaScript.'
  }
}
class XPathLookupError extends WDError {
  constructor () {
    super()
    this.name = 'XPathLookupError'
    this.status = 19
    this.message = 'An error occurred while searching for an element by XPath.'
  }
}
class Timeout extends WDError {
  constructor () {
    super()
    this.name = 'extends'
    this.status = 21
    this.message = 'An operation did not complete before its timeout expired.'
  }
}
class NoSuchWindow extends WDError {
  constructor () {
    super()
    this.name = 'NoSuchWindow'
    this.status = 23
    this.message = 'A request to switch to a different window could not be satisfied because the window could not be found.'
  }
}
class InvalidCookieDomain extends WDError {
  constructor () {
    super()
    this.name = 'InvalidCookieDomain'
    this.status = 24
    this.message = 'An illegal attempt was made to set a cookie under a different domain than the current page.'
  }
}
class UnableToSetCookie extends WDError {
  constructor () {
    super()
    this.name = 'UnableToSetCookie'
    this.status = 25
    this.message = "A request to set a cookie's value could not be satisfied."
  }
}
class UnexpectedAlertOpen extends WDError {
  constructor () {
    super()
    this.name = 'UnexpectedAlertOpen'
    this.status = 26
    this.message = 'A modal dialog was open, blocking this operation'
  }
}
class NoAlertOpenError extends WDError {
  constructor () {
    super()
    this.name = 'NoAlertOpenError'
    this.status = 27
    this.message = 'An attempt was made to operate on a modal dialog when one was not open.'
  }
}
class ScriptTimeout extends WDError {
  constructor () {
    super()
    this.name = 'ScriptTimeout'
    this.status = 28
    this.message = 'A script did not complete before its timeout expired.'
  }
}
class InvalidElementCoordinates extends WDError {
  constructor () {
    super()
    this.name = 'InvalidElementCoordinates'
    this.status = 29
    this.message = 'The coordinates provided to an interactions operation are invalid.'
  }
}
class IMENotAvailable extends WDError {
  constructor () {
    super()
    this.name = 'IMENotAvailable'
    this.status = 30
    this.message = 'IME was not available.'
  }
}
class IMEEngineActivationFailed extends WDError {
  constructor () {
    super()
    this.name = 'IMEEngineActivationFailed'
    this.status = 31
    this.message = 'An IME engine could not be started.'
  }
}
class InvalidSelector extends WDError {
  constructor () {
    super()
    this.name = 'InvalidSelector'
    this.status = 32
    this.message = 'Argument was an invalid selector (e.g. XPath/CSS).'
  }
}
class SessionNotCreatedException extends WDError {
  constructor () {
    super()
    this.name = 'SessionNotCreatedException'
    this.status = 33
    this.message = 'A new session could not be created.'
  }
}
class MoveTargetOutOfBounds extends WDError {
  constructor () {
    super()
    this.name = 'MoveTargetOutOfBounds'
    this.status = 34
    this.message = 'Target provided for a move action is out of bounds.'
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
