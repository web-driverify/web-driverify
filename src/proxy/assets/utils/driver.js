import wd from './wd.js'
import Promise from 'es6-promise'
import string from '../../../utils/string.js'
import $ from 'jquery'
import { UnknownCommand } from '../../../utils/errors.js'
import Log from '../utils/log.js'
import pick from 'lodash/pick'

let logger = new Log('driver')
let STATES = wd.STATES

function stop () {
  wd.state = STATES.STOPPED
}

function start (event) {
  let eventType = (event && event.type) || 'manually'
  logger.log(`start called (${eventType}), current state:`, wd.state)
  if (wd.state === STATES.PREPARING || wd.state === STATES.RUNNING) {
    return
  }
  wd.state = STATES.PREPARING
  logger.log('fetching session...')
  $
    .ajax({
      url: '/web-driverify/session',
      cache: false
    })
    .done(session => {
      logger.log('session fetched', JSON.stringify(session))
      var confirm = session.confirm
      if (confirm) {
        send('result/', confirm.cmd, confirm.data, function () {
          wd.state = STATES.RUNNING
        })
      } else {
        wd.state = STATES.RUNNING
        poll()
      }
    })
    .fail((xhr, status) => {
      console.error('error fetch session, status', status)
      setTimeout(poll, 3000)
    })
}

function poll () {
  if (wd.state !== STATES.RUNNING) return
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
  if (wd.state !== STATES.RUNNING) return
  logger.log('command received', JSON.stringify(cmd))
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
      if (handler.halt) {
        logger.log('halt set, skip sending...')
        stop()
        return
      }
      send('result/', cmd, result, handler.done)
    })
    .catch(function (err) {
      logger.log(string.fromCmd(cmd), 'error occurred:', string.fromError(err).summary())
      let obj = pick(err, ['name', 'message', 'stack', 'status'])
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

export { start, stop }
