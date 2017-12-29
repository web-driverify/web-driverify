import os from 'os'
import process from 'process'
import _ from 'lodash'
import yaml from 'js-yaml'
import fs from 'fs'
import path from 'path'

let exports = {
  init: function (args, file) {
    loadFromFile(file || 'web-driverify.yaml')
    loadFromArgs(args || {})
    normalize()
    console.log('config loaded:\n', JSON.stringify(exports, null, 4))
  },
  ip: getIPAddr(),
  host: getIPAddr(),
  env: process.env.NODE_ENV,
  chrome: {
    exe: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary'
  },
  wd: {
    port: '8089'
  },
  proxy: {
    port: '8088'
  },
  stub: {
    port: '8087'
  },
  plugins: {}
}

normalize()

function loadFromFile (file) {
  let filepath = path.resolve(process.cwd(), file)
  if (!fs.existsSync(filepath)) {
    return
  }
  console.log('loading configuration from', filepath)
  let fileConf = yaml.safeLoad(fs.readFileSync(filepath, 'utf8'))
  _.merge(exports, fileConf)
}

function loadFromArgs (args) {
  exports.host = args.host || exports.host
  exports.wd.port = args.port || exports.wd.port
  exports.stub.port = args.stubPort || exports.stub.port
  exports.proxy.port = args.proxyPort || exports.proxy.port
}

function normalize () {
  let host = exports.host
  exports.stub.url = 'http://' + host + ':' + exports.stub.port
  exports.proxy.url = 'http://' + host + ':' + exports.proxy.port
  exports.wd.url = 'http://' + host + ':' + exports.wd.port
}

function getIPAddr () {
  var ifaces = os.networkInterfaces()
  var ip = null

  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        return
      }
      ip = iface.address
    })
  })
  if (ip === null) {
    var msg = 'non-localhost ip required to run phantomjs with proxy set'
    throw new Error(msg)
  }
  return ip
}

export default exports
