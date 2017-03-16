import Endpoint from '..'

class GetElementSize extends Endpoint {
  static express (router) {
    router.get('/session/:sid/element/:id/size', function (req, res, next) {
      req.endpoint = new GetElementSize([req.params.id])
      next()
    })
  }
}

export default Endpoint.register(GetElementSize)
