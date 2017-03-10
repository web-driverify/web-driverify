import os from 'os'

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
  name: process.env.NODE_ENV || 'production',
  ip: getIPAddr(),
  stubPort: process.env.STUB_PORT || 8087,
  proxyPort: process.env.PROXY_PORT || 8088,
  wdPort: process.env.WD_PORT || 8089
}

exports.host = process.env.HOST || exports.ip
exports.proxyUrl = 'http://' + exports.host + ':' + exports.proxyPort
exports.stubUrl = 'http://' + exports.host + ':' + exports.stubPort
exports.wdUrl = 'http://' + exports.host + ':' + exports.wdPort

export default exports
