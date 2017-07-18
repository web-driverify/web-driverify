import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import { defaultsDeep } from 'lodash'

const baseDir = path.dirname(path.dirname(__dirname))
const configFile = process.env.WD_CONFIG || path.resolve(baseDir, 'config.yaml')
const baseConfigFile = path.resolve(baseDir, 'config.example.yaml')

let config = {
  stub: {},
  proxy: {},
  wd: {},
  plugin: {}
}
let baseConfig = yaml.safeLoad(fs.readFileSync(baseConfigFile).toString())
config = defaultsDeep(baseConfig, config)
try {
  let userConfig = yaml.safeLoad(fs.readFileSync(configFile).toString())
  config = defaultsDeep(userConfig, config)
} catch (e) {}

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

export default config
