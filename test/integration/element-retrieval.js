/* globals browser: true */

import env from '../../src/utils/env.js'
import chai from 'chai'

let expect = chai.expect

describe('element retrieval', function () {
  var plain = `${env.stubUrl}/plain-html`

  before(function () {
    browser.url(plain)
  })

  it('POST /session/:sessionId/element', function () {
    var val = browser.element('.control-label')
    expect(val.value).to.have.property('ELEMENT')
  })
})
