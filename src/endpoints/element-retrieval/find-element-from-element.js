import Endpoint from '..'
import { MissingCommandParameters } from '../../utils/errors.js'

class FindElementFromElement extends Endpoint {
  static create (req) {
    let {using, value} = req.body
    if (!using) {
      throw new MissingCommandParameters('strategy required for FindElement')
    }
    return new FindElementFromElement([using, value, req.params.id])
  }
}
FindElementFromElement.method = 'post'
FindElementFromElement.url = '/session/:sessionId/element/:id/element'

export default FindElementFromElement
