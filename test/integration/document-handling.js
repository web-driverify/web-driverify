/* globals browser: true */

import env from '../../src/utils/env.js'
import chai from 'chai'

let expect = chai.expect

describe('document handling', function () {
  before(function () {
    let url = `${env.stubUrl}/interaction.html`
    browser.url(url)
  })

  it('POST /session/:sessionId/execute', function () {
    let result = browser.execute(function (prefix) {
      return prefix + document.title
    }, 'hello ')
    expect(result.value).to.equal('hello interaction test')
  })
})
