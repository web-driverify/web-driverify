import Endpoint from '..'

class GetElementAttribute extends Endpoint {
  static express (router) {
    router.get('/session/:sid/element/:id/attribute/:name', (req, res, next) => {
      req.endpoint = new GetElementAttribute([req.params.id, req.params.name])
      next()
    })
  }
}

export default Endpoint.register(GetElementAttribute)
