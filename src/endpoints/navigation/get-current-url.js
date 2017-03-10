import Endpoint from '..'

class GetCurrentUrl extends Endpoint {
  static express (router) {
    router.get('/session/:sid/url', (req, res, next) => {
      req.endpoint = new GetCurrentUrl()
      next()
    })
  }
}

export default Endpoint.register(GetCurrentUrl)
