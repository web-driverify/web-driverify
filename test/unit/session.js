import chai from 'chai';
import wd from '../../src/wd';
import request from 'supertest';
import fixtures from '../fixtures';
import Endpoint from '../../src/endpoints';

let expect = chai.expect;

describe('POST /wd/hub/session', function() {
    this.timeout(5000);
    before(fixtures.setupProxy);
    after(fixtures.teardownProxy);
    it('should respond with created session', function() {
        Endpoint.once('created', fixtures.startBrowserClient);
        Endpoint.once('exit', fixtures.exitBrowserClient);
        return request(wd).post(`/wd/hub/session`)
            .expect(200)
            .then(res => {
                expect(res.body).to.have.property('sessionId');
                expect(res.body).to.have.deep.property('value.browserName');
            });
    });
});
