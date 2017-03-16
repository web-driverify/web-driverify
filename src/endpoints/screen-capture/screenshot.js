import Endpoint from '..'
import Debug from 'debug'

let debug = Debug('wd:endpoints:Screenshot')

class Screenshot extends Endpoint {
  static create (req) {
    debug('taking screenshot')
    return new Screenshot()
  }
}

Screenshot.method = 'get'
Screenshot.url = '/session/:sid/screenshot'

export default Endpoint.register(Screenshot)
