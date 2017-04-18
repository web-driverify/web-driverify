import Endpoint from '..'

class DeleteSession extends Endpoint {
  static create (req) {
    return new DeleteSession([req.params.sid])
  }
  transform (data, session) {
    console.log(`delete session requested: ${session}`)
    session.remove()
    return 'deleted'
  }
}

DeleteSession.method = 'delete'
DeleteSession.url = '/session/:sid'
export default DeleteSession
