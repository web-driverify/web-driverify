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
    expect(title).to.equal('clicked')
  })

  it('POST /session/:sessionId/element/:id/value', function () {
    let id = browser.element('#name').value.ELEMENT
    browser.elementIdValue(id, 'harttle')
    expect(browser.getValue('#name', 'value')).to.have.equal('harttle')
  })

  it('POST /session/:sessionId/element/:id/clear', function () {
    let id = browser.element('#name').value.ELEMENT
    browser.elementIdValue(id, 'harttle')
    browser.elementIdClear(id)
    expect(browser.getValue('#name', 'value')).to.have.equal('')
  })

  it('POST /session/:sessionId/element/:id/submit', function () {
    browser.setValue('#name', 'harttle')
    browser.submitForm('#form-login')
    expect(browser.getUrl()).to.contain('?name=harttle')
  })
})
