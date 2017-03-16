import Endpoint from '..'
import Debug from 'debug'

let debug = Debug('wd:endpoints:Forward')

class Forward extends Endpoint {
  static create (req) {
    let endpoint = new Forward()
    req.session.storage.confirm = {
      cmd: endpoint.dto(),
      data: 'forward complete'
    }
    return endpoint
  }
  transform (data, session) {
    debug('client loaded, clearing session.confirm...')
    session.storage.confirm = null
    return data
  }
}
Forward.url = '/session/:sid/forward'
Forward.method = 'post'
export default Endpoint.register(Forward)
