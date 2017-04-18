import Endpoint from '..'

class ElementSubmit extends Endpoint {
  static create (req) {
    let endpoint = new ElementSubmit([req.params.id])
    req.session.storage.confirm = {
      cmd: endpoint.dto(),
      data: 'navigation(Submit) complete'
    }
    return endpoint
  }
}
ElementSubmit.method = 'post'
ElementSubmit.url = '/session/:sid/element/:id/submit'
export default ElementSubmit
