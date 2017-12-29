import config from '../../src/utils/config.js'
import chai from 'chai'

let expect = chai.expect

describe('element interaction', function () {
  let url = `${config.stub.url}/interaction.html`

  before(function () {
    browser.url(url)
  })

  it('POST /session/:sessionId/element/:id/submit', function () {
    browser.setValue('#name', 'harttle')
    browser.submitForm('#form-login')
    browser.pause(500)
    expect(browser.getUrl()).to.contain('?name=harttle')
  })

  describe('GET /session/:sessionId/element/:id/click', function () {
    beforeEach(function () {
      browser.url(url)
      browser.execute(function () { document.title = '' })
    })
    it('should trigger mouse events for div element', function () {
      let id = browser.element('.click-area>div').value.ELEMENT
      browser.execute(function () {
        var div = document.querySelector('.click-area>div')
        div.addEventListener('mouseover', fn)
        div.addEventListener('mousemove', fn)
        div.addEventListener('mousedown', fn)
        div.addEventListener('focus', fn)
        div.addEventListener('mouseup', fn)
        div.addEventListener('click', fn)
        function fn (evt) { document.title += '|' + evt.type }
      })
      browser.elementIdClick(id)
      expect(browser.getTitle()).to.equal('|mouseover|mousemove|mousedown|focus|click|mouseup')
    })
    it('should trigger touch events for mobile devices', function () {
      let id = browser.element('.click-area>div').value.ELEMENT
      browser.execute(function () {
        var div = document.querySelector('.click-area>div')
        window.webDriverifySetDevice = 'Mobile'
        div.addEventListener('touchstart', fn)
        div.addEventListener('touchmove', fn)
        div.addEventListener('touchend', fn)
        div.addEventListener('focus', fn)
        div.addEventListener('click', fn)
        function fn (evt) { document.title += '|' + evt.type }
      })
      browser.elementIdClick(id)
      expect(browser.getTitle()).to.equal('|touchstart|touchmove|focus|click|touchend')
    })
  })

  it('POST /session/:sessionId/element/:id/value', function () {
    let id = browser.element('#name').value.ELEMENT
    browser.elementIdClear(id)
    browser.elementIdValue(id, 'harttle')
    expect(browser.execute(getName).value).to.have.equal('harttle')
  })

  it('POST /session/:sessionId/element/:id/clear', function () {
    let id = browser.element('#name').value.ELEMENT
    browser.elementIdValue(id, 'harttle')
    browser.elementIdClear(id)
    expect(browser.execute(getName).value).to.have.equal('')
  })

  function getName () {
    return $('#name').val()
  }
})
