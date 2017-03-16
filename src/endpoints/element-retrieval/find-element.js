import Endpoint from '..'

class FindElement extends Endpoint {
  static create (req) {
    return new FindElement([req.body])
  }
}
FindElement.method = 'post'
FindElement.url = '/session/:sid/element'

export default Endpoint.register(FindElement)
