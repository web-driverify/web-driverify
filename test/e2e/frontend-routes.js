/* globals browser: true */

import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('frontend routes', function () {
  var url = `${config.stub.url}/frontend-routes.html`

  beforeEach(function () {
    browser.url(url)
  })
  it('pushState', function () {
    browser.click('.page-1')
    expect(browser.getUrl()).to.contain('/page/1')
  })
  it('script back', function () {
    browser.click('.page-1')
    browser.click('.back')
    expect(browser.getUrl()).to.equal(url)
  })
  it('browser back', function () {
    browser.click('.page-1')
    browser.back()
    expect(browser.getUrl()).to.equal(url)
  })
})
