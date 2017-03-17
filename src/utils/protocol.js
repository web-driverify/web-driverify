import {UnknownError} from './errors.js'

function parseError (err) {
  if (!err.status) {
    err = new UnknownError(err)
  }
  var message = err.message || 'unkown error'
  var stack = err.stack || (new Error(message)).stack
  var httpStatus = err.httpStatus || 500
  return {
    status: err.status,
    httpStatus: httpStatus,
    message: message,
    class: parseClassName(stack),
    stack: stack,
    stackTrace: parseStack(stack)
  }
}

function parseClassName (stack) {
  let match = /^\s*(\w+)/.exec(stack)
  return match ? match[1] : 'UnkownClass'
}

function parseStack (stack) {
  return String(stack).split('\n')
  .map(function (line) {
    return line.replace(/^\s*at\s+/, '')
  })
  .map(function (line) {
    let match = /^(.*)[(@](.*?)\)?$/.exec(line)
    if (!match) {
      return null
    }
    let text = match[1]
    let location = match[2].split(':')
    let lastDot = text.lastIndexOf('.')
    let colNumber, lineNumber
    if (location.length >= 3) {
      colNumber = location.pop()
      lineNumber = location.pop()
    }
    return {
      className: text.substr(0, lastDot),
      methodName: text.substr(lastDot + 1),
      fileName: location.join(':'),
      lineNumber: Number(lineNumber),
      colNumber: Number(colNumber)
    }
  })
  .filter(function (obj) {
    return !!obj
  })
}

export {
  parseError,
  parseStack
}
