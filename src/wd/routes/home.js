import env from '../../utils/env.js'
import pkg from '../../../package.json'

function homeMiddleware (req, res) {
  var str = [
    `Web Driverify Running, version ${pkg.version}`,
    `Web Driverify Port: ${env.wdPort}`,
    `Browser Proxy Port: ${env.proxyPort}`
  ].join('\n')
  res.set('content-type', 'text/plain').end(str)
}

export default homeMiddleware
