import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import { defaultsDeep, set } from 'lodash'

const baseDir = path.dirname(path.dirname(__dirname))
const configFile = process.env.WD_CONFIG || path.resolve(baseDir, 'config.yaml')
const baseConfigFile = path.resolve(baseDir, 'config.example.yaml')

// base config stub
let config = {
  stub: {},
  proxy: {},
  wd: {},
  plugin: {}
}
// load example config
let baseConfig = yaml.safeLoad(fs.readFileSync(baseConfigFile).toString())
config = defaultsDeep(baseConfig, config)

// load custom config
try {
  let userConfig = yaml.safeLoad(fs.readFileSync(configFile).toString())
  config = defaultsDeep(userConfig, config)
} catch (e) {}

// load config from old environment variables
let envConfig = {
  env: process.env.NODE_ENV,
  stub: {
    port: process.env.STUB_PORT
  },
  proxy: {
    port: process.env.PROXY_PORT
  },
  wd: {
    port: process.env.WD_PORT
  }
}
config = defaultsDeep(envConfig, config)

// load config from environment variables
Object.keys(process.env).filter((key) => key.startsWith('WD_')).forEach((key) => {
  let path = key.replace(/_/g, '.')
  set(config, path, process.env[key])
})

export default config
