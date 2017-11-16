import Endpoint from '..'

class GetElementCSSValue extends Endpoint {
  static create (req) {
    return new GetElementCSSValue([req.params.id, req.params.propertyName])
  }
}
GetElementCSSValue.method = 'get'
GetElementCSSValue.url = '/session/:sid/element/:id/css/:propertyName'
export default GetElementCSSValue
