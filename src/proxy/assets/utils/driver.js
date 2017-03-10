import { getWD } from './wd.js'
import Promise from 'es6-promise'
import string from '../../../utils/string.js'

let wd = getWD()

function init () {
  wd.state = 'init'
  console.log('acquiring session')
  ajax({
    url: '/web-driverify/session?rand=' + Math.random(),
    cb: function sessionAcquired (err, session) {
      if (err) {
        throw err
      }
      console.log('session acquired', JSON.stringify(session))
      var confirm = session.confirm
      if (confirm) {
        send('result/', confirm.cmd, confirm.data, function () {
          wd.state = 'running'
        })
      } else {
        wd.state = 'running'
        poll()
      }
    }
  })
}

function poll () {
  if (wd.state !== 'running') return
  console.log('polling')
  ajax({
    url: '/web-driverify/command',
    cb: cmdArrived
  })
}

function cmdArrived (err, cmd) {
  console.log('command received', JSON.stringify(cmd))
  if (wd.state !== 'running') return
  if (err) {
    console.log('error when polling, status:', arguments[1])
    return setTimeout(poll, 1000)
  }
  var handler = wd.handlers[cmd.name]
  Promise.resolve(handler)
        .then(function notFound (handler) {
          if (handler) return handler
          var err = new Error('entrypoint ' + cmd.name + ' not found')
          err.status = 9
          throw err
        })
        .then(function exec (handler) {
          console.log('applying endpoint handler...')
          return handler.apply(cmd, cmd.args)
        })
        .then(function (result) {
          console.log(cmdToString(cmd), 'result retieved:', string(result))
          if (handler.silent) {
            console.log('silent set, skip sending...')
            return
          }
          send('result/', cmd, result, handler.done)
        })
        .catch(function (err) {
          err = normalizeError(err)
          console.log(cmdToString(cmd), 'error occurred:', string(err))
          send('error/', cmd, err, handler.fail)
        })
}

function send (path, cmd, data, cb) {
  ajax({
    url: '/web-driverify/' + path + cmd.id,
    data: data,
    method: 'POST',
    cb: function () {
      cb && cb.apply(null, arguments)
      poll()
    }
  })
}

function ajax (settings) {
  settings.cb = settings.cb || noop

  var xhr = createXHR()

  xhr.open(settings.method || 'GET', settings.url, true)
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    if (xhr.status >= 200 && xhr.status < 300) {
      var data = xhr.responseText
      var contentType = xhr.getResponseHeader('Content-Type')
      if (/application\/json/.exec(contentType)) {
        data = JSON.parse(data)
      }
      settings.cb(null, data, xhr)
    } else {
      settings.cb(xhr, xhr.statusText)
    }
  }
  xhr.send(JSON.stringify(settings.data))
}

function createXHR () {
  var xhr = false
  if (window.XMLHttpRequest) { // Mozilla, Safari,...
    xhr = new XMLHttpRequest()
  } else if (window.ActiveXObject) { // IE
    xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
  }
  if (!xhr) {
    throw new Error('Cannot create an XHR instance')
  }
  return xhr
}

function cmdToString (cmd) {
  return cmd.name + '(' + cmd.id + ')'
}

function normalizeError (err) {
  var message = err.message || 'unkown error'
  var stack = err.stack || (new Error(message)).stack
  return {
    value: {
      message: message,
      class: err.constructor && err.constructor.name,
      stackTrace: parseStack(stack)
    },
    status: err.status || 13
  }
}

function parseStack (stack) {
  return stack.split('\n')
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

function noop () {}

export { init, parseStack }
