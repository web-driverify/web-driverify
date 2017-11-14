#!/usr/bin/env node

import './commander.js'
import config from '../src/utils/config.js'
import wd from '../src/wd'
import proxy from '../src/proxy'
import Promise from 'bluebird'

console.log('starting Proxy and WebDriver servers...')

Promise
  .all([
    Promise.fromCallback(cb => wd.listen(config.wd.port, cb))
      .then(() => console.log('WebDriver server listening to port', config.wd.port)),
    Promise.fromCallback(cb => proxy.listen(config.proxy.port, cb))
      .then(() => console.log('Proxy server listening to port', config.proxy.port))
  ])
  .then(() => {
    console.log('All servers started!',
      'Set the http proxy of your browser to', `${config.proxy.url}`)
  })
  .catch(err => console.error(err))
