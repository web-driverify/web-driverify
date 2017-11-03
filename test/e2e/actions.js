/* globals browser: true */

import env from '../../src/utils/env.js'
import chai from 'chai'

let expect = chai.expect

describe('actions', function () {
  let url = `${env.stubUrl}/interaction.html`

  before(function () {
    browser.url(url)
  })

  it('GET /session/:sessionId/touch/click', function () {
    let id = browser.element('#touch').value.ELEMENT
    browser.touchClick(id)
    expect(browser.getTitle()).to.match(/^touched,duration:\d+$/)
  })
})
