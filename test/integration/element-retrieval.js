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

  it('POST /session/:sessionId/elements', function () {
    var val = browser.elements('.control-label')
    expect(val.value).to.have.lengthOf(1)
    expect(val.value[0]).to.have.property('ELEMENT')
  })
})
