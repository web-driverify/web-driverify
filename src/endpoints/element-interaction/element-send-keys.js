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
  static create (req) {
    return new ElementSendKeys([req.params.id, req.body.value])
  }
}
ElementSendKeys.method = 'post'
ElementSendKeys.url = '/session/:sid/element/:id/value'

export default Endpoint.register(ElementSendKeys)
