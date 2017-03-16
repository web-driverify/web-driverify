import Endpoint from '..'
import env from '../../utils/env.js'
import pkg from '../../../package.json'
import qrcode from 'qrcode-terminal'

class NewSession extends Endpoint {
  static express (router) {
    router.post('/session', (req, res, next) => {
      req.endpoint = new NewSession(req.body)
      let url = `${env.proxyUrl}/web-driverify?cmd=${req.endpoint.id}`
      console.log(`newSession requested, open this URL: ${url}`)
      if (env.name !== 'test') {
        qrcode.generate(url)
      }
      next()
    })
  }
  transform () {
    return {
      browserName: pkg.name,
      browserVersion: pkg.version,
      platformName: 'any',
      acceptInsecureCerts: 'true',
      pageLoadStrategy: 'normal',
      proxy: {
        proxyType: 'system',
        proxyAutoconfigUrl: '',
        ftpProxy: '',
        ftpProxyPort: '',
        httpProxy: '',
        httpProxyPort: '',
        sslProxy: '',
        sslProxyPort: '',
        socksProxy: '',
        socksProxyPort: '',
        socksVersion: '',
        socksUsername: '',
        socksPassword: ''
      },
      timeouts: {
        implicit: 60,
        'page load': 60,
        script: 60
      },
      unhandledPromptBehavior: 'none'
    }
  }
}

export default Endpoint.register(NewSession)