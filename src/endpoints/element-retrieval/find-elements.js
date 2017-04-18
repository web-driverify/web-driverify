import Endpoint from '..'
import { MissingCommandParameters } from '../../utils/errors.js'

class FindElements extends Endpoint {
  static create (req) {
    let {using, value} = req.body
    if (!using) {
      throw new MissingCommandParameters('strategy required for FindElements')
    }
    return new FindElements([using, value])
  }
}
FindElements.method = 'post'
FindElements.url = '/session/:sid/elements'

export default FindElements
