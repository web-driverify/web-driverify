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

  it('execute with element result', function () {
    let element = browser.element('#touch')
    let result = browser.execute(function () {
      return document.querySelector('#touch')
    })
    expect(result.value).to.have.property('ELEMENT')
    expect(result.value).to.deep.equal(element.value)
  })

  it('execute with element argument', function () {
    let element = browser.element('#touch')
    let result = browser.execute(function (el) {
      return el === document.querySelector('#touch')
    }, element)
    expect(result.value).to.be.equal(true)
  })

  it('execute async with element result', function () {
    let element = browser.element('#touch')
    let result = browser.executeAsync(function (done) {
      setTimeout(function () {
        done(document.querySelector('#touch'))
      }, 1000)
    })
    expect(result.value).to.have.property('ELEMENT')
    expect(result.value).to.deep.equal(element.value)
  })

  it('execute async with element argument', function () {
    let element = browser.element('#touch')
    let result = browser.executeAsync(function (el, done) {
      setTimeout(function () {
        done(el === document.querySelector('#touch'))
      }, 1000)
    }, element)
    expect(result.value).to.be.equal(true)
  })
})
