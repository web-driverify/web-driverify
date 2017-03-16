import Endpoint from '..'
import Debug from 'debug'

let debug = Debug('wd:endpoints:Back')

class Back extends Endpoint {
  static create (req) {
    let endpoint = new Back()
    req.session.storage.confirm = {
      cmd: endpoint.dto(),
      data: 'navigation(Back) complete'
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

Back.method = 'post'
Back.url = '/session/:sid/back'
export default Endpoint.register(Back)
