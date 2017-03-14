#!/usr/bin/env node

import env from '../src/utils/env.js'
import wd from '../src/wd'
import proxy from '../src/proxy'
import Promise from 'bluebird'

Promise
    .all([
      Promise.fromCallback(cb => wd.listen(env.wdPort, cb))
        .then(() => console.log('wd server listening to port', env.wdPort)),
      Promise.fromCallback(cb => proxy.listen(env.proxyPort, cb))
        .then(() => console.log('proxy server listening to port', env.proxyPort))
    ])
    .then(() => console.log('wd started'))
    .catch(err => console.error(err))
