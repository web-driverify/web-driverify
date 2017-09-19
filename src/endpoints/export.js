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
config.plugins
.filter((plugin) => plugin.enable)
.forEach((plugin) => {
  try {
    let plugin = require(plugin.id)
    if (plugin.default) {
      plugin = plugin.default
    }
    plugin({Endpoint, env, config: conf})
  } catch (err) {
    console.error(`Failed to load plugin: ${plugin.id}`, err)
  }
})
