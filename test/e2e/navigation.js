/* globals browser: true */

import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('navigation', function () {
  var url1 = `${config.stub.url}/wellformed`
  var url2 = `${config.stub.url}/emptyhtml`

  it('GET /session/:sessionId/url', function () {
    browser.url(url1)
    expect(browser.getUrl()).to.equal(url1)
  })
  it('POST /session/:sessionId/url', function () {
    browser.url(url1)
    browser.url(url2)
    expect(browser.getUrl()).to.equal(url2)
  })
  it('POST /session/:sessionId/refresh', function () {
    browser.url(url1)
    browser.refresh()
    expect(browser.getUrl()).to.equal(url1)
  })
  it('POST /session/:sessionId/back', function () {
    browser.url(url1)
    browser.url(url2)
    browser.back()
    expect(browser.getUrl()).to.equal(url1)
  })
  it('POST /session/:sessionId/forward', function () {
    browser.url(url1)
    browser.url(url2)
    browser.back()
    browser.forward()
    expect(browser.getUrl()).to.equal(url2)
  })
  it('GET /session/:sessionId/title', function () {
    browser.url(`${config.stub.url}/interaction.html`)
    expect(browser.getTitle()).to.equal('interaction test')
  })
})
