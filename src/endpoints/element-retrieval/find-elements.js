import Endpoint from '..'

class FindElements extends Endpoint {
  static express (router) {
    router.post('/session/:sid/elements', function (req, res, next) {
      req.endpoint = new FindElements([req.body])
      next()
    })
  }
}

export default Endpoint.register(FindElements)
