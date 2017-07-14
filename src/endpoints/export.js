import path from 'path'
import glob from 'glob'
import env from '../utils/env'

import Endpoint from '.'

// require built-in endpoints
glob.sync(path.join(__dirname, '*/*.js'))
  .forEach((endpoint) => {
    Endpoint.register(require(endpoint).default)
  })
// require plugins
glob.sync(path.join(__dirname, '../../node_modules/web-driverify-endpoint-*'))
  .map(require)
  .forEach((plugin) => {
    if (plugin.default) {
      plugin = plugin.default
    }
    plugin({Endpoint, env})
  })
