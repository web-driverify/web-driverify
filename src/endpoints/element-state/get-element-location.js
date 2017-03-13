import Endpoint from '..'

class GetElementLocation extends Endpoint {
  static express (router) {
    router.get('/session/:sid/element/:id/location', function (req, res, next) {
      req.endpoint = new GetElementLocation(req.params.id)
      next()
    })
  }
}

export default Endpoint.register(GetElementLocation)
