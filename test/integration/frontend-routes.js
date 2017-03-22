/* globals browser: true */

import env from '../../src/utils/env.js'
import chai from 'chai'

let expect = chai.expect

describe.only('frontend routes', function () {
  var url = `${env.stubUrl}/frontend-routes.html`

  before(function () {
    browser.url(url)
  })
  it('pushState', function () {
    browser.click('.page-1')
    expect(browser.getUrl()).to.contain('/page/1')
  })
  it('script back', function () {
    browser.click('.page-1')
    browser.pause(2000)
    browser.click('.back')
    browser.pause(2000)
    expect(browser.getUrl()).to.equal(url)
  })
  it('browser back', function () {
    browser.click('.page-1')
    browser.back()
    expect(browser.getUrl()).to.equal(url)
  })
})
