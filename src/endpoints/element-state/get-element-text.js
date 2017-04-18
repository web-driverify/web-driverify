import Endpoint from '..'

class GetElementText extends Endpoint {
  static create (req) {
    return new GetElementText([req.params.id])
  }
}
GetElementText.method = 'get'
GetElementText.url = '/session/:sid/element/:id/text'
export default GetElementText
