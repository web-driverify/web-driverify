import Endpoint from '..'

class TouchClick extends Endpoint {
  static create (req) {
    return new TouchClick([req.body.element])
  }
}
TouchClick.method = 'post'
TouchClick.url = '/session/:sid/touch/click'

export default Endpoint.register(TouchClick)
