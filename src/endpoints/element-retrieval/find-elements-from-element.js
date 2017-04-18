import Endpoint from '..'
import { MissingCommandParameters } from '../../utils/errors.js'

class FindElementsFromElement extends Endpoint {
  static create (req) {
    let {using, value} = req.body
    if (!using) {
      throw new MissingCommandParameters('strategy required for FindElements')
    }
    return new FindElementsFromElement([using, value, req.params.id])
  }
}
FindElementsFromElement.method = 'post'
FindElementsFromElement.url = '/session/:sessionId/element/:id/elements'

export default FindElementsFromElement
