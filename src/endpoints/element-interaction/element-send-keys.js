import Endpoint from '..'
import { MissingCommandParameters } from '../../utils/errors.js'

class ElementSendKeys extends Endpoint {
  constructor (args) {
    let [elementId, arr] = args
    if (!(arr instanceof Array)) {
      throw MissingCommandParameters(`second argument expected to be Array, got ${arr}`)
    }
    let str = arr.join('')
    super([elementId, str])
  }
  static express (router) {
    router.post('/session/:sid/element/:id/value', function (req, res, next) {
      req.endpoint = new ElementSendKeys([req.params.id, req.body.value])
      next()
    })
  }
}

export default Endpoint.register(ElementSendKeys)
