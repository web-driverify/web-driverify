/* globals browser: true */

import env from '../../src/utils/env.js'
import chai from 'chai'

let expect = chai.expect

describe('element interaction', function () {
  let url = `${env.stubUrl}/interaction.html`

  before(function () {
    browser.url(url)
  })

  it('GET /session/:sessionId/element/:id/click', function () {
    let id = browser.element('body').value.ELEMENT
    browser.elementIdClick(id)
    let title = browser.getTitle()
    expect(title).to.equal('click')
  })

  it('POST /session/:sessionId/element/:id/value', function () {
    let id = browser.element('#name').value.ELEMENT
    browser.elementIdValue(id, 'harttle')
    let result = browser.elementIdAttribute(id, 'value')
    expect(result).to.have.property('value', 'harttle')
  })
})
