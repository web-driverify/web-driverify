import Endpoint from '..'

class ElementClear extends Endpoint {
  static create (req) {
    return new ElementClear([req.params.id])
  }
}
ElementClear.method = 'post'
ElementClear.url = '/session/:sid/element/:id/clear'

export default Endpoint.register(ElementClear)
