import Endpoint from '..'

class GetElementDisplayed extends Endpoint {
  static create (req) {
    return new GetElementDisplayed([req.params.id])
  }
}

GetElementDisplayed.method = 'get'
GetElementDisplayed.url = '/session/:sid/element/:id/displayed'

export default GetElementDisplayed
