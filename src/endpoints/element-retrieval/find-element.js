import Endpoint from '..'

class FindElement extends Endpoint {
  static express (router) {
    router.post('/session/:sid/element', function (req, res, next) {
      req.endpoint = new FindElement(req.body)
      next()
    })
  }
}

export default Endpoint.register(FindElement)
