import chai from 'chai'
import NewSession from '../../../src/endpoints/session/new-session.js'

let expect = chai.expect

describe('NewSession', function () {
  beforeEach(() => NewSession.clearTokens())
  it('should generate random token by default', function () {
    let req = {
      body: {desiredCapabilities: {}}
    }
    let endpoint = NewSession.create(req)
    expect(NewSession.useToken(endpoint.token)).to.equal(endpoint)
    expect(NewSession.useToken(endpoint.token)).to.equal(undefined)
  })
  it('should respect to token in desiredCapabilities', function () {
    let req = {
      body: { desiredCapabilities: { token: 'my perfect token' } }
    }
    let endpoint = NewSession.create(req)
    let retrieved = NewSession.useToken('my perfect token')
    expect(endpoint).to.equal(retrieved)
  })
})
