import Endpoint from '..'
import env from '../../utils/env.js'
import pkg from '../../../package.json'
import qrcode from 'qrcode-terminal'
import Debug from 'debug'

let debug = Debug('wd:endpoints:NewSession')

let endpoints = new Map()

class NewSession extends Endpoint {
  static create (req) {
    let caps = req.body.desiredCapabilities
    let endpoint = new NewSession([caps])
    NewSession.recordToken(caps.token, endpoint)
    let url = `${env.proxyUrl}/web-driverify?token=${endpoint.token}`
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
NewSession.recordToken = function (token, endpoint) {
  token = token || Math.random().toString(36).substr(2)
  endpoint.token = token
  debug('recording token', token)
  return endpoints.set(token, endpoint)
}
NewSession.clearTokens = function () {
  debug('clearing token')
  return endpoints.clear()
}
NewSession.useToken = function (token) {
  debug('using token', token)
  let endpoint = endpoints.get(token)
  endpoints.delete(token)
  return endpoint
}
NewSession.method = 'post'
NewSession.url = '/session'
export default NewSession
