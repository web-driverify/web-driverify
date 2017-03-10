import Endpoint from '.'

class ElementClick extends Endpoint {
  static express (router) {
    router.post('/session/:sid/element/:id/click', function (req, res, next) {
      req.endpoint = new ElementClick(req.params.id)
      next()
    })
  }
}

export default Endpoint.register(ElementClick)
