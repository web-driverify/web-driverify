import Endpoint from '..'
import Debug from 'debug'

let debug = Debug('wd:endpoints:element-send-keys')

class ElementClear extends Endpoint {
  static express (router) {
    router.post('/session/:sid/element/:id/clear', function (req, res, next) {
      req.endpoint = new ElementClear(req.params.id)
      next()
    })
  }
}

export default Endpoint.register(ElementClear)
