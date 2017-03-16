import Endpoint from '..'

class GetElementRect extends Endpoint {
  static create (req) {
    return new GetElementRect([req.params.id])
  }
}

GetElementRect.method = 'get'
GetElementRect.url = '/session/:sid/element/:id/rect'
export default Endpoint.register(GetElementRect)
