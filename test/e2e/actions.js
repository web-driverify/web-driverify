/* globals browser: true */

import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('actions', function () {
  let url = `${config.stub.url}/interaction.html`

  before(function () {
    browser.url(url)
  })

  it('GET /session/:sessionId/touch/click', function () {
    let id = browser.element('#touch').value.ELEMENT
    browser.touchClick(id)
    expect(browser.getTitle()).to.match(/^touched,duration:\d+$/)
  })

  it.only('GET /session/:sessionId/touch/scroll', function () {
    browser.touchPerform([{
      action: 'press',
      options: {
        x: 100,
        y: 250
      }
    }])
  })
})
