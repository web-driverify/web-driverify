import Endpoint from '..'
import Debug from 'debug'

let debug = Debug('wd:endpoints:Go')

class Go extends Endpoint {
  static create (req) {
    let endpoint = new Go([req.body.url])
    req.session.storage.confirm = {
      cmd: endpoint.dto(),
      data: 'navigation(Go) complete'
    }
    debug('setting storage', JSON.stringify(req.session.storage))
    return endpoint
  }
  transform (data, session) {
    debug('client refreshed, clearing session.confirm...')
    session.storage.confirm = null
    return data
  }
}

Go.method = 'post'
Go.url = '/session/:sid/url'

export default Endpoint.register(Go)
