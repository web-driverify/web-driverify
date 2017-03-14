import { getWD } from './wd.js'
import Promise from 'es6-promise'
import string from '../../../utils/string.js'
import $ from 'jquery'
import { UnknownCommand } from '../utils/errors.js'
import Log from '../utils/log.js'

let wd = getWD()
let logger = new Log('driver')

function init () {
  wd.state = 'init'
  logger.log('acquiring session...')
  $
    .ajax({
      url: '/web-driverify/session',
      cache: false
    })
    .done(session => {
      logger.log('session acquired', JSON.stringify(session))
      var confirm = session.confirm
      if (confirm) {
        send('result/', confirm.cmd, confirm.data, function () {
          wd.state = 'running'
        })
      } else {
        wd.state = 'running'
        poll()
      }
    })
    .fail(err => {
      throw err
    })
}

function poll () {
  if (wd.state !== 'running') return
  logger.log('polling')
  $
    .ajax({
      url: '/web-driverify/command',
      cache: false
    })
    .done(cmdArrived)
    .fail((jqXHR, textStatus) => {
      logger.log('error when polling, status:', textStatus)
      return setTimeout(poll, 1000)
    })
}

function cmdArrived (cmd) {
  logger.log('command received', JSON.stringify(cmd))
  if (wd.state !== 'running') return
  var handler = wd.handlers[cmd.name]
  Promise.resolve(handler)
    .then(function notFound (handler) {
      if (handler) return handler
      throw new UnknownCommand()
    })
    .then(function exec (handler) {
      logger.log('applying endpoint handler...')
      return handler.apply(cmd, cmd.args)
    })
    .then(function (result) {
      logger.log(string.fromCmd(cmd).summary(), 'handler returned:', string(result).summary())
      if (handler.silent) {
        logger.log('silent set, skip sending...')
        return
      }
      send('result/', cmd, result, handler.done)
    })
    .catch(function (err) {
      let obj = normalizeError(err)
      logger.log(string.fromCmd(cmd), 'error occurred:', string.fromError(err).summary())
      send('error/', cmd, obj, handler.fail)
    })
    .catch(function (err) {
      logger.log('cannot recover from error', err.message, '\n', err.stack)
    })
}

function send (path, cmd, data, cb) {
  cb = cb || function () {}
  $.ajax({
    type: 'POST',
    url: '/web-driverify/' + path + cmd.id,
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  })
   .done(data => cb(null, data))
   .fail(err => cb(err))
   .always(poll)
}

function normalizeError (err) {
  var message = err.message || 'unkown error'
  var stack = err.stack || (new Error(message)).stack
  return {
    value: {
      message: message,
      class: err.constructor && err.constructor.name,
      stack: stack,
      stackTrace: parseStack(stack)
    },
    status: err.status || 13
  }
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

export { init, parseStack }
