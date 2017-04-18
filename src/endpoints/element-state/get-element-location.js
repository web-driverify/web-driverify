import Endpoint from '..'

class GetElementLocation extends Endpoint {
  static create (req) {
    return new GetElementLocation([req.params.id])
  }
}
GetElementLocation.method = 'get'
GetElementLocation.url = '/session/:sid/element/:id/location'
export default GetElementLocation
