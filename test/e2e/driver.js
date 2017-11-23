/* globals browser: true */

import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('driver', function () {
  let url = `${config.stub.url}/plain.html`

  beforeEach(function () {
    browser.url(url)
  })
  it('should not leak jquery into outer scope', function () {
    let result = browser.execute(function () {
      return typeof $
    })
    expect(result.value).to.equal('undefined')
  })
})
