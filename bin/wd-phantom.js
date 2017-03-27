#!/usr/bin/env node

import env from '../src/utils/env.js'
import wd from '../src/wd'
import proxy from '../src/proxy'
import Promise from 'bluebird'
import fixtures from '../test/fixtures'

fixtures.setupPhantom()

console.log('starting Proxy and WebDriver servers...')

Promise
    .all([
      Promise.fromCallback(cb => wd.listen(env.wdPort, cb))
        .then(() => console.log('WebDriver server listening to port', env.wdPort)),
      Promise.fromCallback(cb => proxy.listen(env.proxyPort, cb))
        .then(() => console.log('Proxy server listening to port', env.proxyPort))
    ])
    .then(() => {
      console.log('All servers started!',
        'Set the http proxy of your browser to', `${env.proxyUrl}`)
    })
    .catch(err => console.error(err))
