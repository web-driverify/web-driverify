import path from 'path'
import glob from 'glob'
import env from '../utils/env'
import config from '../utils/config'

import Endpoint from '.'

// require built-in endpoints
glob.sync(path.join(__dirname, '*/*.js'))
  .forEach((endpoint) => {
    Endpoint.register(require(endpoint).default)
  })
// require plugins
glob.sync(path.join(__dirname, '../../node_modules/web-driverify-endpoint-*'))
  .forEach((pluginPath) => {
    let pluginName = path.basename(pluginPath)
    let conf = config.plugin[pluginName]
    if (conf.disable) {
      return
    }
    let plugin = require(pluginPath)
    if (plugin.default) {
      plugin = plugin.default
    }
    plugin({Endpoint, env, config: conf})
  })
