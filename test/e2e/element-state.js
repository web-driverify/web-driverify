/* globals browser: true */

import env from '../../src/utils/env.js'
import chai from 'chai'

let expect = chai.expect

describe('element state', function () {
  let plain = `${env.stubUrl}/plain-html`
  let id

  before(function () {
    browser.url(plain)
    id = browser.element('.control-label').value.ELEMENT
  })

  it('GET /session/:sessionId/element/:id', function () {
    let result = browser.elementIdText(id)
    expect(result).to.have.property('value', 'Homepage')
  })

  it('GET /session/:sessionId/element/:id/attribute/:name', function () {
    let result = browser.elementIdAttribute(id, 'class')
    expect(result).to.have.property('value', 'control-label')
  })

  it('GET /session/:sessionId/element/:id/rect', function () {
    let result = browser.elementIdRect(id)
    expect(result).to.have.deep.property('value.x')
    expect(result).to.have.deep.property('value.y')
    expect(result).to.have.deep.property('value.width')
    expect(result).to.have.deep.property('value.height')
  })

  it('GET /session/:sessionId/element/:id/location', function () {
    let result = browser.elementIdRect(id)
    expect(result).to.have.deep.property('value.x')
    expect(result).to.have.deep.property('value.y')
  })

  it('GET /session/:sessionId/element/:id/size', function () {
    let result = browser.elementIdSize(id)
    expect(result).to.have.deep.property('value.width')
    expect(result).to.have.deep.property('value.height')
  })
})
