import Endpoint from '..'
import Debug from 'debug'

let debug = Debug('wd:endpoints:Click')

class ElementClick extends Endpoint {
  static create (req) {
    let endpoint = new ElementClick([req.params.id])
    req.session.storage.confirm = {
      cmd: endpoint.dto(),
      data: 'click complete after load'
    }
    return endpoint
  }
  transform (data, session) {
    debug('click arrived, clearing session.confirm...')
    session.storage.confirm = null
    return data
  }
}
ElementClick.method = 'post'
ElementClick.url = '/session/:sid/element/:id/click'

export default Endpoint.register(ElementClick)
