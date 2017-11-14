/* globals browser: true */

import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('screen capture', function () {
  var url = `${config.stub.url}/wellformed`

  it('GET /session/:sessionId/screenshot', function () {
    browser.url(url)
    let result = browser.screenshot()
    expect(result.value).to.match(/^[a-zA-Z0-9+/=]+$/)
  })
})
