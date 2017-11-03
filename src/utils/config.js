import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'
import { defaultsDeep } from 'lodash'

let defaultFile = path.resolve(__dirname, '../../config.example.yaml')
var defaultConfig = yaml.safeLoad(fs.readFileSync(defaultFile, 'utf8'))

let userFile = process.env.WD_CONFIG || path.resolve(__dirname, '../../config.yaml')
let userConfig = fs.existsSync(userFile) ? yaml.safeLoad(fs.readFileSync(userFile, 'utf8')) : {}

let envConfig = {
  env: process.env.NODE_ENV,
  stub: {
    port: process.env.WD_STUB_PORT || process.env.STUB_PORT
  },
  proxy: {
    port: process.env.WD_PROXY_PORT || process.env.PROXY_PORT
  },
  wd: {
    port: process.env.WD_PORT
  }
}

let config = defaultsDeep(envConfig, userConfig, defaultConfig)
console.log('config loaded:')
console.log(JSON.stringify(config, null, 4))

export default config
