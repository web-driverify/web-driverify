import Endpoint from '..'

class GetTitle extends Endpoint {
  static express (router) {
    router.get('/session/:sid/title', (req, res, next) => {
      req.endpoint = new GetTitle()
      next()
    })
  }
}

export default Endpoint.register(GetTitle)
