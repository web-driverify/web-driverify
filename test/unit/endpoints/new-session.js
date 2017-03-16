import chai from 'chai'
import NewSession from '../../../src/endpoints/session/new-session.js'

let expect = chai.expect

describe('NewSession', function () {
  it('should generate random ID by default', function () {
    let req = {
      body: {desiredCapabilities: {}}
    }
    let endpoint = NewSession.create(req)
    console.log(endpoint.id)
    expect(String(endpoint.id)).to.match(/^\d+$/)
  })
  it('should respect to cmdId in desiredCapabilities', function () {
    let req = {
      body: { desiredCapabilities: { cmdId: 1234 } }
    }
    let endpoint = NewSession.create(req)
    expect(endpoint.id).to.equal(1234)
  })
  it('should respect to cmdId (String) in desiredCapabilities', function () {
    let req = {
      body: { desiredCapabilities: { cmdId: '1234' } }
    }
    let endpoint = NewSession.create(req)
    expect(endpoint.id).to.equal(1234)
  })
})
