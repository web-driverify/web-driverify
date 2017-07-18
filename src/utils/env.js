import os from 'os'
import config from './config'

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

let exports = {
  name: config.env,
  ip: config.ip || getIPAddr(),
  stubPort: config.stub.port,
  proxyPort: config.proxy.port,
  wdPort: config.wd.port
}

exports.host = config.host || exports.ip
exports.proxyUrl = 'http://' + (config.proxy.host || exports.host) + ':' + exports.proxyPort
exports.stubUrl = 'http://' + (config.stub.host || exports.host) + ':' + exports.stubPort
exports.wdUrl = 'http://' + (config.wd.host || exports.host) + ':' + exports.wdPort

export default exports
