import puppeteer from 'puppeteer'
import Debug from 'debug'
import Promise from 'bluebird'

import config from '../../src/utils/config.js'
import wd from '../../src/wd'
import proxy from '../../src/proxy'
import stub from './server.js'
import Endpoint from '../../src/endpoints'
import NewSession from '../../src/endpoints/session/new-session.js'
import DeleteSession from '../../src/endpoints/session/delete-session.js'

let session = null
let proxyServer, browserClient, stubServer, wdServer
let debug = Debug('wd:fixtures')

function setupPhantom () {
  console.log('setting up wd with phantomjs...')
  Endpoint.on('created', endpoint => {
    if (endpoint instanceof NewSession) {
      debug('NewSession endpoint created, starting browser...')
      return startBrowserClient(endpoint)
    }
  })
  Endpoint.on('exited', endpoint => {
    if (endpoint instanceof DeleteSession) {
      debug('DeleteSession endpoint exited, closing browser...')
      exitBrowserClient()
    }
  })
}

function setupWD () {
  return Promise.fromCallback(cb => (wdServer = wd.listen(config.wd.port, cb)))
        .then(() => console.log('wd server listening to port', config.wd.port))
}

function teardownWD () {
  debug('tearing down wd...')
  return Promise.fromCallback(cb => wdServer.close(cb))
}

function setupProxy () {
  debug('setting up proxy...')
  return Promise.fromCallback(cb => (proxyServer = proxy.listen(config.proxy.port, cb)))
        .then(() => console.log('proxy server listening to port', config.proxy.port))
}

function setupStub () {
  return Promise.fromCallback(cb => (stubServer = stub.listen(config.stub.port, cb)))
        .then(() => console.log('stub server listening to port', config.stub.port))
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
  var initUrl = `${config.proxy.url}/web-driverify?token=${cmd.token}`
  debug('starting browser client:', initUrl, 'with proxy:', config.proxy.url)

  return puppeteer
  .launch({
    executablePath: config.chrome.exe,
    args: [
      '--proxy-server=' + config.proxy.url,
      '--user-agent="Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0"'
    ]
  })
  .then(browser => browser.newPage())
  .then(page => page.goto(initUrl))
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
