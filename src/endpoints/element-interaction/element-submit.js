import Endpoint from '..'

class ElementSubmit extends Endpoint {
  static express (router) {
    router.post('/session/:sid/element/:id/submit', function (req, res, next) {
      req.endpoint = new ElementSubmit([req.params.id])
      req.session.storage.confirm = {
        cmd: req.endpoint.dto(),
        data: 'navigation(Submit) complete'
      }
      next()
    })
  }
}

export default Endpoint.register(ElementSubmit)
