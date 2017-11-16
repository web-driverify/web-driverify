import Endpoint from '..'

class Source extends Endpoint {
  static create (req) {
    return new Source()
  }
}
Source.url = '/session/:id/source'
Source.method = 'get'
export default Source
