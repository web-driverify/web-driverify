import Endpoint from '..'

class ElementClick extends Endpoint {
  static create (req) {
    return new ElementClick([req.params.id])
  }
}
ElementClick.method = 'post'
ElementClick.url = '/session/:sid/element/:id/click'

export default Endpoint.register(ElementClick)
