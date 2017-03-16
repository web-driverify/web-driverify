import Endpoint from '..'

class GetElementAttribute extends Endpoint {
  static create (req) {
    return new GetElementAttribute([req.params.id, req.params.name])
  }
}

GetElementAttribute.method = 'get'
GetElementAttribute.url = '/session/:sid/element/:id/attribute/:name'

export default Endpoint.register(GetElementAttribute)
