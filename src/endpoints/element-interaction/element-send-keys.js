import Endpoint from '..'
import Debug from 'debug'

let debug = Debug('wd:endpoints:element-send-keys')

class ElementSendKeys extends Endpoint {
  constructor (elementId, arr) {
    if (!(arr instanceof Array)) {
      debug('second argument expected to be Array, got', arr)
      let err = new Error('MissingCommandParameters')
      err.status = 400
      throw err
    }
    let str = arr.join('')
    super(elementId, str)
  }
  static express (router) {
    router.post('/session/:sid/element/:id/value', function (req, res, next) {
      req.endpoint = new ElementSendKeys(req.params.id, req.body.value)
      next()
    })
  }
}

export default Endpoint.register(ElementSendKeys)
