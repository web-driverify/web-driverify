/* globals browser: true */

import env from '../../src/utils/env.js'
import chai from 'chai'

let expect = chai.expect

describe('element interaction', function () {
  let url = `${env.stubUrl}/interaction.html`
  let id

  before(function () {
    browser.url(url)
    id = browser.element('body').value.ELEMENT
  })

  it.only('GET /session/:sessionId/element/:id/click', function () {
    browser.elementIdClick(id)
    let title = browser.getTitle()
    expect(title).to.equal('click')
  })
})
