const wd = require('../wd');
const request = require('supertest');
const fixtures = require('../fixtures');
const env = require('../utils/env.js');

describe('navigation', function() {
    this.timeout(10000);
    before(fixtures.setupSession);
    after(fixtures.teardownSession);

    describe('GET /session/{session id}/url', function() {
        it('should respond with current URL', function(done) {
            request(wd).get(`/session/${fixtures.session.sessionId}/url`)
                .expect(200)
                .expect(/https?:.*\/wd\?.*/)
                .end(done);
        });
    });
    describe('POST /session/{session id}/url', function() {
        it('should go to the given URL', function(done) {
            request(wd)
                .post(`/session/${fixtures.session.sessionId}/url`)
                .send({ url: env.stubUrl + '/wellformed' })
                .expect(200, null)
                .end((err) => {
                    if (err) return done(err);
                    setTimeout(function() {
                        request(wd)
                            .get(`/session/${fixtures.session.sessionId}/url`)
                            .expect(200)
                            .expect(`"${env.stubUrl}/wellformed"`)
                            .end(done);
                    }, 2000);
                });
        });
    });
});
