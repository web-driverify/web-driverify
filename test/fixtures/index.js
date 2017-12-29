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
let proxyServer, browser, stubServer, wdServer
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

async function startBrowserClient (cmd) {
  const url = `${config.proxy.url}/web-driverify?token=${cmd.token}`
  debug('starting browser client:', url, 'with proxy:', config.proxy.url)

  browser = await puppeteer.launch({
    executablePath: config.chrome.exe,
    args: [
      '--proxy-server=' + config.proxy.url,
      '--user-agent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Mobile Safari/537.36"'
    ]
  })
  const page = await browser.newPage()
	await page.setViewport({
		width: 375,
		height: 667,
		isMobile: true,
		hasTouch: true
	})
	await page.goto(url)
}

function exitBrowserClient () {
  return browser.close()
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
