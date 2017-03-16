import Endpoint from '..'
import Debug from 'debug'

let debug = Debug('wd:endpoints:Refresh')

class Refresh extends Endpoint {
  static create (req) {
    let endpoint = new Refresh()
    req.session.storage.confirm = {
      cmd: endpoint.dto(),
      data: 'navigation(Refresh) complete'
    }
    debug('setting confirm data into session', req.session.storage)
    return endpoint
  }
  transform (data, session) {
    debug('client refreshed, clearing session.confirm...')
    session.storage.confirm = null
    return data
  }
}

Refresh.url = '/session/:sid/refresh'
Refresh.method = 'post'

export default Endpoint.register(Refresh)
