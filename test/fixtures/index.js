import Horseman from 'node-horseman'
import Debug from 'debug'
import Promise from 'bluebird'

import env from '../../src/utils/env.js'
import wd from '../../src/wd'
import proxy from '../../src/proxy'
import stub from './server.js'
import Endpoint from '../../src/endpoints'

let session = null
let proxyServer, browserClient, stubServer, wdServer
let debug = Debug('wd:fixtures')

function setupPhantom () {
  debug('setting up wd with phantomjs...')
  Endpoint.on('created', endpoint => {
    if (endpoint.constructor.name === 'NewSession') {
      debug('endpoint created, starting browser...')
      return startBrowserClient(endpoint)
    }
  })
}

function setupWD () {
  return Promise.fromCallback(cb => (wdServer = wd.listen(env.wdPort, cb)))
        .then(() => console.log('wd server listening to port', env.wdPort))
}

function teardownWD () {
  debug('tearing down wd...')
  return Promise.fromCallback(cb => wdServer.close(cb))
}

function setupProxy () {
  debug('setting up proxy...')
  return Promise.fromCallback(cb => (proxyServer = proxy.listen(env.proxyPort, cb)))
        .then(() => console.log('proxy server listening to port', env.proxyPort))
}

function setupStub () {
  return Promise.fromCallback(cb => (stubServer = stub.listen(env.stubPort, cb)))
        .then(() => console.log('stub server listening to port', env.stubPort))
}

function teardownStub () {
  debug('tearing down wd...')
  return Promise.fromCallback(cb => stubServer.close(cb))
}

function teardownProxy () {
  debug('tearing down proxy...')
  return Promise.fromCallback(cb => proxyServer.close(cb))
}

function startBrowserClient (cmd) {
  var initUrl = `${env.proxyUrl}/web-driverify?cmd=${cmd.id}`
  var options = {
    timeout: 10000,
    injectJquery: false
  }
  debug('starting browser client:', initUrl, 'with proxy:', env.proxyUrl)
  return new Promise((resolve) => {
    browserClient = new Horseman(options)
            .setProxy(env.proxyUrl)
            .viewport(375, 667)
            .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
            .on('consoleMessage', msg => {
              debug('[browser console]', msg)
            })
            .on('error', (msg, trace) => {
              var msgStack = ['ERROR: ' + msg]
              if (trace && trace.length) {
                msgStack.push('TRACE:')
                trace.forEach(function (t) {
                  msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''))
                })
              }
              debug('[browser error]', msgStack.join('\n'))
            })
            .then(() => {
              debug('browser started')
            })
            .open(initUrl)
            .waitForNextPage()
            .html()
            .then((text) => {
              debug('browser connected, html length:', text.length)
              resolve()
            })
  })
}

function exitBrowserClient () {
  return Promise.resolve().then(() => browserClient.close())
}

function getSessionId () {
  return session && session.id
}

export default {
  getSessionId,

  setupProxy,
  teardownProxy,

  setupStub,
  teardownStub,

  setupWD,
  setupPhantom,
  teardownWD,

  startBrowserClient,
  exitBrowserClient
}
