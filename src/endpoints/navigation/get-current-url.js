import Endpoint from '..'

class GetCurrentUrl extends Endpoint {
  static create (req) {
    return new GetCurrentUrl()
  }
}

GetCurrentUrl.url = '/session/:sid/url'
GetCurrentUrl.method = 'get'

export default GetCurrentUrl
