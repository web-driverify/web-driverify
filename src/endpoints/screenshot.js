import Endpoint from '.'
import Debug from 'debug'

let debug = Debug('wd:endpoints:Screenshot')

class Screenshot extends Endpoint {
  static express (router) {
    router.get('/session/:sid/screenshot', (req, res, next) => {
      debug('taking screenshot')
      req.endpoint = new Screenshot()
      next()
    })
  }
}

export default Endpoint.register(Screenshot)
