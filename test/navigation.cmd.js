import wd from '../wd';
import request from 'supertest';
import fixtures from '../fixtures';
import env from '../utils/env.js';

describe('navigation', function() {
    this.timeout(10000);
    before(fixtures.setupSession);
    after(fixtures.teardownSession);

    describe('GET /wd/hub/session/{session id}/url', function() {
        it.only('should respond with current URL', function(done) {
            request(wd).get(`/wd/hub/session/${fixtures.session.sessionId}/url`)
                .expect(200)
                .expect(/https?:.*\/wd\?.*/)
                .end(done);
        });
    });
    describe('POST /wd/hub/session/{session id}/url', function() {
        it('should go to the given URL', function(done) {
            request(wd)
                .post(`/wd/hub/session/${fixtures.session.sessionId}/url`)
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
