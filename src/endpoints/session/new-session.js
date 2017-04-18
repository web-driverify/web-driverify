import Endpoint from '..'
import env from '../../utils/env.js'
import pkg from '../../../package.json'
import qrcode from 'qrcode-terminal'

class NewSession extends Endpoint {
  static create (req) {
    let caps = req.body.desiredCapabilities
    let endpoint = new NewSession(caps.cmdId, [caps])
    let url = `${env.proxyUrl}/web-driverify?cmd=${endpoint.id}`
    console.log(`newSession requested, open this URL: ${url}`)
    if (env.name !== 'test') {
      qrcode.generate(url)
    }
    return endpoint
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

NewSession.method = 'post'
NewSession.url = '/session'
export default NewSession
