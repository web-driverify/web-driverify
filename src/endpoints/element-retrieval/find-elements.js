import Endpoint from '..'

class FindElements extends Endpoint {
  static create (req) {
    return new FindElements([req.body])
  }
}
FindElements.method = 'post'
FindElements.url = '/session/:sid/elements'

export default Endpoint.register(FindElements)
