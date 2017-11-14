import chai from 'chai'
import request from 'superagent'
import config from '../../src/utils/config'
import fixtures from '../fixtures'

let expect = chai.expect

describe('wd', function () {
  config.init()
  before(() => fixtures.setupWD())
  after(() => fixtures.teardownWD())

  it('should provide init page', function (done) {
    request.get(config.wd.url)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.headers).to.have.property('content-type', 'text/plain; charset=utf-8')
        expect(res.text).to.contain(config.wd.port)
        expect(res.text).to.contain(config.proxy.port)
        done()
      })
  })
})
