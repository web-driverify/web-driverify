/* globals browser: true */

import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('element retrieval', function () {
  before(function () {
    browser.url(`${config.stub.url}/element-retrieval.html`)
  })

  it('POST /session/:sessionId/element', function () {
    var val = browser.element('p.lead')
    expect(val.value).to.have.property('ELEMENT')
  })

  it('POST /session/:sessionId/element NoSuchElement', function () {
    var val = browser.element('.not-exist')
    expect(val).to.have.property('type', 'NoSuchElement')
    expect(val).to.have.property('sessionId')
    expect(val).to.have.property('message')
  })

  describe('POST /session/:sessionId/elements', function () {
    it('should get elements', function () {
      var val = browser.elements('.lead')
      expect(val.value).to.have.lengthOf(2)
      expect(val.value[0]).to.have.property('ELEMENT')
    })
    it('should support $ and $$', function () {
      var menu = $('#menu')
      let text = menu.$$('li')[2].getText('a')
      expect(text).to.equal('API')
      menu.$$('li')[2].$('a').getText()
      expect(text).to.equal('API')
    })
  })
})
