import config from '../../utils/config.js'
import pkg from '../../../package.json'

function homeMiddleware (req, res) {
  var str = [
    `Web Driverify Running, version ${pkg.version}`,
    `Web Driverify Port: ${config.wd.port}`,
    `Browser Proxy Port: ${config.proxy.port}`
  ].join('\n')
  res.set('content-type', 'text/plain').end(str)
}

export default homeMiddleware
