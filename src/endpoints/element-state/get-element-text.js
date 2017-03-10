import Endpoint from '..'

class GetElementText extends Endpoint {
  static express (router) {
    router.get('/session/:sid/element/:id/text', function (req, res, next) {
      req.endpoint = new GetElementText(req.params.id)
      next()
    })
  }
}

export default Endpoint.register(GetElementText)
