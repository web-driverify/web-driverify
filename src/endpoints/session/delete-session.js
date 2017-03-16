import Endpoint from '..'

class DeleteSession extends Endpoint {
  static express (router) {
    router.delete('/session/:sid', (req, res, next) => {
      req.endpoint = new DeleteSession([req.params.sid])
      next()
    })
  }
  transform (data, session) {
    console.log(`delete session requested: ${session}`)
    session.remove()
    return 'deleted'
  }
}

export default Endpoint.register(DeleteSession)
