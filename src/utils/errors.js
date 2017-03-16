import http from 'http'

class WDError extends Error { }

class NotFound extends Error {
  constructor (msg) {
    super(msg || http.STATUS_CODES[404])
    this.httpStatus = 404
  }
}

class MissingCommandParameters extends WDError {
  constructor (msg) {
    super(msg || 'missing command parameters')
    this.name = 'MissingCommandParameters'
    this.httpStatus = 400
  }
}
class NoSuchDriver extends WDError {
  constructor (msg) {
    super(msg || 'A session is either terminated or not started')
    this.name = 'NoSuchDriver'
    this.status = 6
  }
}
class NoSuchElement extends WDError {
  constructor (msg) {
    super(msg || 'An element could not be located on the page using the given search parameters.')
    this.name = 'NoSuchElement'
    this.status = 7
  }
}
class NoSuchFrame extends WDError {
  constructor (msg) {
    super(msg || 'A request to switch to a frame could not be satisfied because the frame could not be found.')
    this.name = 'NoSuchFrame'
    this.status = 8
  }
}
class UnknownCommand extends WDError {
  constructor (msg) {
    super(msg || 'The requested resource could not be found, or a request was received using an HTTP method that is not supported by the mapped resource.')
    this.name = 'UnknownCommand'
    this.status = 9
  }
}
class StaleElementReference extends WDError {
  constructor (msg) {
    super(msg || 'An element command failed because the referenced element is no longer attached to the DOM.')
    this.name = 'StaleElementReference'
    this.status = 10
  }
}
class ElementNotVisible extends WDError {
  constructor (msg) {
    super(msg || 'An element command could not be completed because the element is not visible on the page.')
    this.name = 'ElementNotVisible'
    this.status = 11
  }
}
class InvalidElementState extends WDError {
  constructor (msg) {
    super(msg || 'An element command could not be completed because the element is in an invalid state (e.g. attempting to click a disabled element).')
    this.name = 'InvalidElementState'
    this.status = 12
  }
}
class UnknownError extends WDError {
  constructor (err = {}) {
    let msg = err.message || 'An unknown server-side error occurred while processing the command.'
    super(msg)
    this.name = 'UnknownError'
    this.status = 13
    if (err.stack) {
      try {
        this.stack = err.stack
      } catch (e) {}
    }
  }
}
class ElementIsNotSelectable extends WDError {
  constructor (msg) {
    super(msg || 'An attempt was made to select an element that cannot be selected.')
    this.name = 'ElementIsNotSelectable'
    this.status = 15
  }
}
class JavaScriptError extends WDError {
  constructor (msg) {
    super(msg || 'An error occurred while executing user supplied JavaScript.')
    this.name = 'JavaScriptError'
    this.status = 17
  }
}
class XPathLookupError extends WDError {
  constructor (msg) {
    super(msg || 'An error occurred while searching for an element by XPath.')
    this.name = 'XPathLookupError'
    this.status = 19
  }
}
class Timeout extends WDError {
  constructor (msg) {
    super(msg || 'An operation did not complete before its timeout expired.')
    this.name = 'extends'
    this.status = 21
  }
}
class NoSuchWindow extends WDError {
  constructor (msg) {
    super(msg || 'A request to switch to a different window could not be satisfied because the window could not be found.')
    this.name = 'NoSuchWindow'
    this.status = 23
  }
}
class InvalidCookieDomain extends WDError {
  constructor (msg) {
    super(msg || 'An illegal attempt was made to set a cookie under a different domain than the current page.')
    this.name = 'InvalidCookieDomain'
    this.status = 24
  }
}
class UnableToSetCookie extends WDError {
  constructor (msg) {
    super(msg || "A request to set a cookie's value could not be satisfied.")
    this.name = 'UnableToSetCookie'
    this.status = 25
  }
}
class UnexpectedAlertOpen extends WDError {
  constructor (msg) {
    super(msg || 'A modal dialog was open, blocking this operation')
    this.name = 'UnexpectedAlertOpen'
    this.status = 26
  }
}
class NoAlertOpenError extends WDError {
  constructor (msg) {
    super(msg || 'An attempt was made to operate on a modal dialog when one was not open.')
    this.name = 'NoAlertOpenError'
    this.status = 27
  }
}
class ScriptTimeout extends WDError {
  constructor (msg) {
    super(msg || 'A script did not complete before its timeout expired.')
    this.name = 'ScriptTimeout'
    this.status = 28
  }
}
class InvalidElementCoordinates extends WDError {
  constructor (msg) {
    super(msg || 'The coordinates provided to an interactions operation are invalid.')
    this.name = 'InvalidElementCoordinates'
    this.status = 29
  }
}
class IMENotAvailable extends WDError {
  constructor (msg) {
    super(msg || 'IME was not available.')
    this.name = 'IMENotAvailable'
    this.status = 30
  }
}
class IMEEngineActivationFailed extends WDError {
  constructor (msg) {
    super(msg || 'An IME engine could not be started.')
    this.name = 'IMEEngineActivationFailed'
    this.status = 31
  }
}
class InvalidSelector extends WDError {
  constructor (msg) {
    super(msg || 'Argument was an invalid selector (e.g. XPath/CSS).')
    this.name = 'InvalidSelector'
    this.status = 32
  }
}
class SessionNotCreatedException extends WDError {
  constructor (msg) {
    super(msg || 'A new session could not be created.')
    this.name = 'SessionNotCreatedException'
    this.status = 33
  }
}
class MoveTargetOutOfBounds extends WDError {
  constructor (msg) {
    super(msg || 'Target provided for a move action is out of bounds.')
    this.name = 'MoveTargetOutOfBounds'
    this.status = 34
  }
}

export {
  NotFound,
  MissingCommandParameters,
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
