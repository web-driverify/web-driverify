import Endpoint from '..'

class GetElementSize extends Endpoint {
  static create (req) {
    return new GetElementSize([req.params.id])
  }
}

GetElementSize.method = 'get'
GetElementSize.url = '/session/:sid/element/:id/size'

export default GetElementSize
