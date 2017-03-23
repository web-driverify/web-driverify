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

  it('POST /session/:sid/execute_async', function () {
    let result = browser.executeAsync(function (a, b, c, d, done) {
      setTimeout(function () {
        done(a + b + c + d)
      }, 1000)
    }, 1, 2, 3, 4)
    expect(result.value).to.equal(10)
  })
})
