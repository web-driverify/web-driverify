import path from 'path'
import glob from 'glob'

import Endpoint from '.'

// require built-in endpoints
glob.sync(path.join(__dirname, '*/*.js'))
  .forEach((endpoint) => {
    Endpoint.register(require(endpoint).default)
  })

// require plugins
glob.sync(path.join(__dirname, '../../web-driverify-endpoint-*'))
  .forEach((plugin) => {
    if (plugin.default) {
      plugin = plugin.default
    }
    require(plugin)
  })
