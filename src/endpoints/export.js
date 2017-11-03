import path from 'path'
import _ from 'lodash'
import glob from 'glob'
import env from '../utils/env'
import config from '../utils/config'
import Endpoint from '.'

// require built-in endpoints
glob.sync(path.join(__dirname, '*/*.js'))
  .forEach((endpoint) => {
    // babel bulit es6 moduels
    Endpoint.register(require(endpoint).default)
  })
// require plugins
_.forEach(config.plugins, (config, name) => {
  try {
    // CMD modules
    let pluginInstance = require(name)
    pluginInstance({Endpoint, env, config})
  } catch (err) {
    console.error(`Failed to load plugin: ${name}`, err)
  }
})
