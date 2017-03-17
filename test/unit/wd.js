import chai from 'chai'
import request from 'superagent'
import env from '../../src/utils/env'
import fixtures from '../fixtures'

let expect = chai.expect

describe('wd', function () {
  before(() => fixtures.setupWD())
  after(() => fixtures.teardownWD())

  it('should provide init page', function (done) {
    request.get(env.wdUrl)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.headers).to.have.property('content-type', 'text/plain; charset=utf-8')
        expect(res.text).to.contain(env.wdPort)
        expect(res.text).to.contain(env.proxyPort)
        done()
      })
  })
})
