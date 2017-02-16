const chai = require('chai');
const expect = chai.expect;
const wd = require('../wd');
const request = require('supertest');
const fixtures = require('../fixtures');

describe('location', function() {
    this.timeout(10000);
    before(fixtures.setupSession);
    after(fixtures.teardownSession);

    describe('GET /session/{session id}/url', function() {
        it('should respond with current URL', function(done) {
            request(wd).get(`/session/${fixtures.session.sessionId}/url`)
                .expect(200)
                .expect(res => {
                    expect(res.body).to.match(/https?:.*\/wd\?.*/);
                })
                .end(done);
        });
    });
    //describe('POST /session/{session id}/url', function() {
    //it('should go to the given URL', function(done) {
    //request(wd)
    //.post(`/session/${session.sessionId}/url`, {
    //url: 'http://localhost:${Port}/wellformed'
    //})
    //.expect(200)
    //.expect(res => {
    //expect(res.body).to.match(/https?:.*\/wd\?.*/);
    //})
    //.end((err) => {
    //if (err) return done(err);
    //});
    //});
    //});
});
