/* globals browser: true */

import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('element retrieval', function () {
  var plain = `${config.stub.url}/plain.html`

  before(function () {
    browser.url(plain)
  })

  it('POST /session/:sessionId/element', function () {
    var val = browser.element('.control-label')
    expect(val.value).to.have.property('ELEMENT')
  })

  it('POST /session/:sessionId/element NoSuchElement', function () {
    var val = browser.element('.foo')
    expect(val).to.have.property('type', 'NoSuchElement')
    expect(val).to.have.property('sessionId')
    expect(val).to.have.property('message')
  })

  it('POST /session/:sessionId/elements', function () {
    var val = browser.elements('.control-label')
    expect(val.value).to.have.lengthOf(1)
    expect(val.value[0]).to.have.property('ELEMENT')
  })
})
