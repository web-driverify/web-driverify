import Endpoint from '..'

class GetTitle extends Endpoint {
  static create (req) {
    return new GetTitle()
  }
}

GetTitle.method = 'get'
GetTitle.url = '/session/:sid/title'
export default Endpoint.register(GetTitle)
