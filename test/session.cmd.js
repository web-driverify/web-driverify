import chai from 'chai';
import wd from '../wd';
import request from 'supertest';
import fixtures from '../fixtures';
import Endpoint from '../endpoints';

let expect = chai.expect;

describe('POST /wd/hub/session', function() {
    this.timeout(5000);
    before(fixtures.setupProxy);
    after(fixtures.teardownProxy);
    it('should respond with created session', function(done) {
        request(wd).post(`/wd/hub/session`)
            .expect(res => {
                console.log(res.body);
                expect(res.body).to.have.property('sessionId');
                expect(res.body).to.have.deep.property('value.browserName');
            })
            .expect(200, done);

        Endpoint.once('created', fixtures.startBrowserClient);
        Endpoint.once('exited', fixtures.exitBrowserClient);
    });
});
