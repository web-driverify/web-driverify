import Endpoint from '..'

class TouchClick extends Endpoint {
  static express (router) {
    router.post('/session/:sid/touch/click', function (req, res, next) {
      req.endpoint = new TouchClick([req.body.element])
      next()
    })
  }
}

export default Endpoint.register(TouchClick)
