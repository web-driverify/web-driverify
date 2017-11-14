import path from 'path'
import _ from 'lodash'
import glob from 'glob'
import config from '../utils/config'
import Endpoint from '.'

// require built-in endpoints
glob.sync(path.join(__dirname, '*/*.js'))
  .forEach((endpoint) => {
    // babel bulit es6 moduels
    Endpoint.register(require(endpoint).default)
  })

function loadPlugins (plugins) {
  // require plugins
  _.forEach(plugins, (pluginConfig, name) => {
    try {
      let pluginInstance = require(name)
      pluginInstance({Endpoint, config, pluginConfig})
      console.error(`Plugin loaded: ${name}`)
    } catch (err) {
      console.error(`Failed to load plugin: ${name}`, err)
    }
  })
}

export default {loadPlugins}
