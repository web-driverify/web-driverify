import Endpoint from '..'

class GetElementRect extends Endpoint {
  static express (router) {
    router.get('/session/:sid/element/:id/rect', function (req, res, next) {
      req.endpoint = new GetElementRect([req.params.id])
      next()
    })
  }
}

export default Endpoint.register(GetElementRect)
