const chai = require('chai');
const expect = chai.expect;
const wd = require('../wd');
const request = require('supertest');
const env = require('../fixtures/env.js');

describe('GET /session/{session id}/url', function() {
    this.timeout(10000);
    var session;
    before(function(done) {
        env.setup(ss => {
            session = ss;
            done();
        });
    });
    after(function(done) {
        env.teardown(done);
    });
    it('should respond with current URL', function(done) {
        request(wd).get(`/session/${session.sessionId}/url`)
            .expect(200)
            .expect(res => {
                expect(res.body).to.match(/https?:.*\/wd\?.*/);
            })
            .end(done);
    });
});
