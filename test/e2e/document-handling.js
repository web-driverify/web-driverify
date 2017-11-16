/* globals browser: true */

import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('document handling', function () {
  before(function () {
    let url = `${config.stub.url}/document-handling.html`
    browser.url(url)
  })

  it('POST /session/:sessionId/execute', function () {
    let result = browser.execute(function (prefix) {
      return prefix + document.title
    }, 'hello ')
    expect(result.value).to.equal('hello document handling')
  })

  it('POST /session/:sid/execute_async', function () {
    let result = browser.executeAsync(function (a, b, c, d, done) {
      setTimeout(function () {
        done(a + b + c + d)
      }, 1000)
    }, 1, 2, 3, 4)
    expect(result.value).to.equal(10)
  })
  it('GET /session/:sessionId/source', function () {
    let source = browser.getSource()
    expect(source).to.match(/^<html lang="en">[\s\S]*<title>document handling<\/title>[\s\S]*<\/html>$/)
  })
  it('GET /session/:sessionId/source', function () {
    let source = browser.getSource()
    expect(source).to.match(/^<html lang="en">[\s\S]*<title>document handling<\/title>[\s\S]*<\/html>$/)
  })
  describe('/session/:sessionId/execute', function () {
    it('should get html for certain elements', function () {
      var outerHTML = browser.getHTML('#test')
      expect(outerHTML).to.equal('<div id="test"><span>Lorem ipsum dolor amet</span></div>')
      var innerHTML = browser.getHTML('#test', false)
      expect(innerHTML).to.equal('<span>Lorem ipsum dolor amet</span>')
    })
    it('element serialization/deserialization', function () {
      let element = browser.element('#test')
      let result = browser.execute(function () {
        return document.querySelector('#test')
      })
      expect(result.value).to.have.property('ELEMENT')
      expect(result.value.ELEMENT).to.equal(element.value.ELEMENT)
    })
    it('element retriving and passing back', function () {
      let element = browser.element('#test')
      let result = browser.execute(function (el) {
        return el === document.querySelector('#test')
      }, element)
      expect(result.value).to.be.equal(true)
    })
  })

  describe('/session/:sessionId/execute_async', function () {
    it('element serialization/deserialization', function () {
      let element = browser.element('#test')
      let result = browser.executeAsync(function (done) {
        setTimeout(function () {
          done(document.querySelector('#test'))
        }, 1000)
      })
      expect(result.value).to.have.property('ELEMENT')
      expect(result.value.ELEMENT).to.equal(element.value.ELEMENT)
    })

    it('element retriving and passing back', function () {
      let element = browser.element('#test')
      let result = browser.executeAsync(function (el, done) {
        setTimeout(function () {
          done(el === document.querySelector('#test'))
        }, 1000)
      }, element)
      expect(result.value).to.be.equal(true)
    })
  })
})
