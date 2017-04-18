import Endpoint from '..'
import { MissingCommandParameters } from '../../utils/errors.js'

class FindElement extends Endpoint {
  static create (req) {
    let {using, value} = req.body
    if (!using) {
      throw new MissingCommandParameters('strategy required for FindElement')
    }
    return new FindElement([using, value])
  }
}
FindElement.method = 'post'
FindElement.url = '/session/:sid/element'

export default FindElement
