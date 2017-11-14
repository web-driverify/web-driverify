import chai from 'chai'
import request from 'superagent'
import config from '../../src/utils/config'
import superagentProxy from 'superagent-proxy'
import superagentCharset from 'superagent-charset'
import fixtures from '../fixtures'

superagentProxy(request)
superagentCharset(request)

let expect = chai.expect

describe('proxy', function () {
  config.init()
  before(() => Promise.all([
    fixtures.setupProxy(),
    fixtures.setupStub()
  ]))
  after(() => Promise.all([
    fixtures.teardownProxy(),
    fixtures.teardownStub()
  ]))

  it('should proxy stylesheets', function (done) {
    request.get(`${config.stub.url}/css`)
      .proxy(config.proxy.url)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).to.equal('div{color: red}')
        done()
      })
  })
  it('should proxy binary', function (done) {
    request.get(`${config.stub.url}/binary`)
      .proxy(config.proxy.url)
      .charset('gbk')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).to.contain('你好世界')
        done()
      })
  })
  it('should proxy html', function (done) {
    request.get(`${config.stub.url}/emptyhtml`)
      .proxy(config.proxy.url)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text.slice(0, 30)).to.match(/^<html><script/)
        expect(res.text.slice(-40)).to.match(/<\/script><\/html>$/)
        done()
      })
  })
  it('should provide init page', function (done) {
    request.get(`${config.stub.url}/web-driverify`)
      .proxy(config.proxy.url)
      .end((err, res) => {
        if (err && err.status !== 404) {
          return done(err)
        }
        expect(res.statusCode).to.equal(404)
        expect(res.text).to.match(/.+/)
        expect(res.headers['content-type']).to.match(/text\/html/)
        done()
      })
  })
  it('should proxy headers', function (done) {
    request.get(`${config.stub.url}/reflect`)
      .proxy(config.proxy.url)
      .set('foo', 'bar')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.statusCode).to.equal(200)
        expect(res.text).to.equal('ok')
        expect(res.headers).to.have.property('foo', 'bar')
        done()
      })
  })
  it('should proxy POST', function (done) {
    request.post(`${config.stub.url}/reflect`)
      .proxy(config.proxy.url)
      .send('harttle')
      .set('content-type', 'text/plain')
      .set('foo', 'bar')
      .end((err, res) => {
        if (err) return done(err)
        expect(res.statusCode).to.equal(200)
        expect(res.text).to.equal('harttle')
        expect(res.headers).to.have.property('foo', 'bar')
        done()
      })
  })
  it('should proxy utf8 html', function (done) {
    request.get(`${config.stub.url}/utf8`)
      .proxy(config.proxy.url)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).to.contain('你好世界')
        done()
      })
  })
  it('should proxy gbk html', function (done) {
    request.get(`${config.stub.url}/gbk`)
      .proxy(config.proxy.url)
      .charset('gbk')
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).to.contain('你好世界')
        done()
      })
  })

  it('should proxy gzipped html', function (done) {
    request.get(`${config.stub.url}/gzip`)
      .proxy(config.proxy.url)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.text).to.contain('你好世界')
        done()
      })
  })
})
